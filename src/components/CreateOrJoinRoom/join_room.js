import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

const URL = 'https://draw-off-app-api.herokuapp.com/user_rooms';

export default function JoinRoom({ userData, firebaseId, roomNumberSet }) {
	const [foundRoom, foundRoomSet] = useState(false);
	const [errMessage, errMessageSet] = useState(null);
	const [number, numberSet] = useState(null);
	const [inputNum, inputNumSet] = useState(null);

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
		// console.log('Hit goToLobby_ roomData=>', roomData);
		// console.log('join_room.js', roomData);
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
			{errMessage ? <div className="error">{errMessage}</div> : null}
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
					<div>
						<Button variant="contained" color="secondary" onClick={joinRoomHandler}>
							Try Again
						</Button>
					</div>
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
