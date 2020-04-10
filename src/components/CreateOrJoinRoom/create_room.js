import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

const URL = 'http://localhost:3000/rooms/';

export default function CreateRoom({ userData, firebaseId, roomNumberSet }) {
	const [ roomExist, roomExistSet ] = useState(false);
	const [ roomNum, roomNumSet ] = useState(null);
	const [ maxPeople, maxPeopleSet ] = useState(2);

	function handleSubmit() {
		let numPeople = maxPeople;
		let username = userData.username;
		let randomRoomNum = Math.floor(Math.random() * Math.floor(9999));

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
		roomNumberSet(roomData.room.room_number);
		roomExistSet(true);
		roomNumSet(roomData.room.room_number);
	}

	return (
		<div className="joinorcreatebox">
			<h4>Host a Room</h4>
			<InputLabel>Max Players</InputLabel>

			<Select
				id="select"
				onChange={(e) => {
					maxPeopleSet(e.target.value);
				}}
				value={maxPeople}
			>
				<MenuItem value={2}>Two</MenuItem>
				<MenuItem value={3}>Three</MenuItem>
				<MenuItem value={4}>Four</MenuItem>
				<MenuItem value={5}>Five</MenuItem>
				<MenuItem value={6}>Six</MenuItem>
				<MenuItem value={7}>Seven</MenuItem>
				<MenuItem value={8}>Eight</MenuItem>
			</Select>

			<div>
				{!roomExist ? (
					<Button onClick={handleSubmit} variant="contained" color="primary">
						Create Room
					</Button>
				) : (
					<Button variant="outlined" color="primary">
						<Link to={`/room/${roomNum}`} style={{ textDecoration: 'none', color: 'black' }}>
							Enter Room
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
