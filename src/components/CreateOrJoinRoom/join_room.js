import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:3000/user_rooms';

export default function JoinRoom({ userData, firebaseId, roomNumberSet }) {
	const [ foundRoom, foundRoomSet ] = useState(false);
	const [ errMessage, errMessageSet ] = useState(null);
	const [ number, numberSet ] = useState(null);

	function joinRoomHandler(e) {
		e.preventDefault();

		numberSet(e.target.roomNum.value);
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
				roomNum: e.target.roomNum.value
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

	return (
		<div>
			<form onSubmit={joinRoomHandler}>
				<input type="number" name="roomNum" placeholder="Enter Room Number" />
				<input type="submit" value="Join Room" />
			</form>
			{foundRoom ? <Link to={`/room/${number}`}>Join Room</Link> : <div>{errMessage}</div>}
		</div>
	);
}
