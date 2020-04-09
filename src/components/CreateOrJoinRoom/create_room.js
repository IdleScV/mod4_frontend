import React from 'react';
import Lobby from '../Lobby';
import { Redirect } from 'react-router-dom';

const URL = 'http://localhost:3000/rooms/';

export default function CreateRoom({ userData, firebaseId }) {
	function handleHost(e) {
		e.preventDefault();
		let numPeople = e.target.number.value;
		let username = userData.username;
		let randomRoomNum = Math.floor(Math.random() * Math.floor(9999));

		fetch(URL, {
			method: 'post',
			header: {
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
		console.log('redirecting');
		return <Redirect to="/room" />;
	}

	return (
		<div>
			<form onSubmit={handleHost}>
				<input type="number" name="number" />
				<input type="submit" value="Host" />
			</form>
		</div>
	);
}
