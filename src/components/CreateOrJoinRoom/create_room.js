import React, { useState } from 'react';
import Lobby from '../Lobby';
import { Link, Redirect } from 'react-router-dom';

const URL = 'http://localhost:3000/rooms/';

export default function CreateRoom({ userData, firebaseId, roomNumberSet }) {
	const [ roomExist, roomExistSet ] = useState(false);
	const [ roomNum, roomNumSet ] = useState(null);

	function handleHost(e) {
		e.preventDefault();
		let numPeople = e.target.number.value;
		let username = userData.username;
		let randomRoomNum = Math.floor(Math.random() * Math.floor(9999));
		console.log(firebaseId, numPeople, username, randomRoomNum);
		fetch(URL, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firebase_id: firebaseId,
				username: username,
				maxPeople: numPeople,
				randomRoomNumber: randomRoomNum
			})
		})
			.then((response) => response.json())
			.then((json) => goToLobby(json));
	}

	//* NEED TO REDIRECT USER TO A LOBBY ONCE A ROOM IS CREATED
	function goToLobby(roomData) {
		console.log('reached', roomData.room.room_number);
		roomNumberSet(roomData.room.room_number);
		roomExistSet(true);
		roomNumSet(roomData.room.room_number);
		// return <Redirect to="/room" />;
	}

	return (
		<div>
			<form onSubmit={handleHost}>
				<input type="number" name="number" />
				<input type="submit" value="Host" />
			</form>
			{roomExist ? (
				<Link to={`/room/${roomNum}`}>
					<button>Go To Room</button>
				</Link>
			) : null}
		</div>
	);
}
