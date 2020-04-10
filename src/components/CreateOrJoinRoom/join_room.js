import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

const URL = 'http://localhost:3000/user_rooms';

export default function JoinRoom({ userData, firebaseId, roomNumberSet }) {
	const [ foundRoom, foundRoomSet ] = useState(false);
	const [ errMessage, errMessageSet ] = useState(null);
	const [ number, numberSet ] = useState(null);
	const [ inputNum, inputNumSet ] = useState(null);

	function joinRoomHandler() {
		numberSet(inputNum);
		let username = userData.username;

		fetch(URL, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firebase_id: firebaseId,
				username: username,
				roomNum: inputNum
			})
		})
			.then((response) => response.json())
			.then((json) => {
				goToLobby(json);
			});
	}

	function goToLobby(roomData) {
		console.log(roomData);
		if (roomData.message) {
			errMessageSet(roomData.message);
		} else {
			roomNumberSet(roomData.roomnum);
			foundRoomSet(true);
		}
	}
	// console.log(inputNum);

	return (
		<div className="joinorcreatebox">
			<h4>Find a Room</h4>
			<InputLabel>Room Number</InputLabel>
			<Input
				type="number"
				name="roomNum"
				placeholder="Enter Room Number"
				onChange={(e) => {
					inputNumSet(e.target.value);
				}}
			/>
			<div>
				{!foundRoom ? errMessage ? (
					<Button variant="contained" color="secondary" onClick={joinRoomHandler}>
						Try Again
					</Button>
				) : (
					<Button variant="contained" color="primary" onClick={joinRoomHandler}>
						Find Room
					</Button>
				) : (
					<Button variant="outlined" color="primary">
						<Link to={`/room/${number}`} style={{ textDecoration: 'none', color: 'black' }}>
							Join Room
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
