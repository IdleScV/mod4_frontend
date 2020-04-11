import React, { useState } from 'react';
import { withAuthorization } from '../Session';

import WaitingRoom from './waitingroom';
import GameScreen from '../GameScreen';

import './lobby.css';

const URL = 'http://localhost:3000/rooms/';

function Lobby({ roomNumber, firebase, roomNumberSet }) {
	const [ gameProgress, gameProgressSet ] = useState(null);

	function fetchUsers() {
		console.log('fetching user');
		fetch(`${URL}${roomNumber}`).then((response) => response.json()).then((json) => showData(json));
	}

	function showData(data) {
		// Checks if room exist
		if (data['room_status']) {
			if (data['room_status'] === 'open') {
				gameProgressSet('open');
				// room closed, send user to Game room
			} else if (data['room_status'] === 'closed') {
				gameProgressSet(1);
			}
		} else {
			// room does not exist. redirects to createorJoinRoom component
			roomNumberSet(null);
		}
	}

	fetchUsers();

	return (
		<div>
			{gameProgress ? gameProgress === 'open' ? (
				// if Room is open, sends user to waiting room
				<WaitingRoom
					roomNumber={roomNumber}
					firebase={firebase}
					roomNumberSet={roomNumberSet}
					gameProgressSet={gameProgressSet}
				/>
			) : (
				// If Gameprogress does not equal 'open' but is true
				<GameScreen gameProgress={gameProgress} gameProgressSet={gameProgressSet} roomNumber={roomNumber} />
			) : (
				// If Gameprogress is null
				<div>Loading...</div>
			)}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Lobby);
