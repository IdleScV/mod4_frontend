import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
const URL = 'http://localhost:3000/rooms/';
const LEAVEURL = 'http://localhost:3000/user_rooms/';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: '5px 10px'
	}
}));

function WaitingRoom({ roomNumber, gameProgressSet, firebase, roomNumberSet, isHost, isHostSet }) {
	const [ users, usersSet ] = useState([]);
	const [ roomStatus, roomStatusSet ] = useState('Loading...');
	const [ host, hostSet ] = useState(null);
	const [ maxNum, maxNumSet ] = useState(null);

	const classes = useStyles(); //used for css
	useEffect(() => {
		// runs IntervalId once component mounts
		const intervalId = setInterval(() => {
			console.log('refreshing');
			fetchUsers();
		}, 1000);

		// runs return function when component unmounts
		return () => {
			clearInterval(intervalId);
			console.log('no refresh');
		};
	}, []);

	function fetchUsers() {
		console.log('fetching user');
		fetch(`${URL}${roomNumber}`).then((response) => response.json()).then((json) => showData(json));
	}

	function showData(data) {
		// Checks if room exist
		if (data['room_status']) {
			// room exist
			roomStatusSet(data['room_status']);
			hostSet(data['host'].username);
			usersSet(data['user_list'].map((user) => user['username']));
			maxNumSet(data.maxNum);
			// If room is open, continues to set room to open
			if (data['room_status'] === 'open') {
				gameProgressSet('open');
				// room closed, send user to Game room
			} else if (data['room_status'] === 'closed') {
				gameProgressSet(1);
			}
			// Checks if user is host
			if (data['host'].firebase_id === firebase.auth.W) {
				isHostSet(true);
			} else {
				isHostSet(false);
			}
		} else {
			// room does not exist. redirects to createorJoinRoom component

			roomNumberSet(null);
		}
	}

	function leavePagePost() {
		let firebase_id = firebase.auth.W;

		fetch(LEAVEURL + roomNumber, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firebase_id: firebase_id })
		});
	}

	// Goal: set room status to closed... and link_to round component
	function startGame() {
		fetch(URL + roomNumber, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: 'starting game' })
		})
			.then((response) => response.json())
			.then((json) => processStartData(json));
	}

	function processStartData(data) {
		if (data.error) {
			console.log(data.error);
		} else {
			// Implement link_to round component here?
			console.log(data.message);

			// Game progress Set (1) indicates the beginning of round 1, and we'll pass it in as a prop
			gameProgressSet(1);
		}
	}

	return (
		<div className="lobby">
			<div className="roominfo">
				<div>Room Number is: {roomNumber}</div>
				<div>Hosted By: {host}</div>
				<div>Room Status: {roomStatus}</div>
			</div>
			{users && maxNum ? (
				<div className={classes.root}>
					<Grid container item xs={5} direction="row" justify="center" alignItems="center" className="UserGrid">
						{/* USERS THAT EXIST */}
						{users.map((user) => (
							<Grid item xs={3} sm={6}>
								<Paper className={classes.paper}>{user}</Paper>
							</Grid>
						))}
						{/* USERS THAT DON"T EXIST */}
						{new Array(maxNum - users.length).fill('').map((empty_user) => (
							<Grid item xs={3} sm={6}>
								<Paper className={classes.paper}>empty</Paper>
							</Grid>
						))}
					</Grid>
				</div>
			) : null}
			{/* Still inside if gameProgress === 'open' */}
			<div className="roomcontrols">
				{isHost ? <Button onClick={startGame}>Start Game</Button> : null}

				<Link to={ROUTES.CREATEORJOINROOM}>
					<Button onClick={leavePagePost}>Leave Room</Button>
				</Link>
			</div>
		</div>
	);
}

export default WaitingRoom;
