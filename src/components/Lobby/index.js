import React, { useState } from 'react';
import { withAuthorization } from '../Session';

import WaitingRoom from './waitingroom';
import GameScreen from '../GameScreen';

import './lobby.css';

const URL = 'https://draw-off-app-api.herokuapp.com/rooms/';

function Lobby({ roomNumber, firebase, roomNumberSet }) {
	const [ gameProgress, gameProgressSet ] = useState(null);
	const [ isHost, isHostSet ] = useState(null);

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
			console.log(data.message);
			roomNumberSet(null);
		}
	}

	fetchUsers();

	return (
		<div>
			{gameProgress === 'open' ? (
				<WaitingRoom
					roomNumber={roomNumber}
					firebase={firebase}
					roomNumberSet={roomNumberSet}
					gameProgressSet={gameProgressSet}
					isHost={isHost}
					isHostSet={isHostSet}
				/>
			) : gameProgress === 1 ? (
				<GameScreen
					isHost={isHost}
					firebase={firebase}
					gameProgress={gameProgress}
					gameProgressSet={gameProgressSet}
					roomNumber={roomNumber}
					roomNumberSet={roomNumberSet}
				/>
			) : (
				'Loading...'
			)}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Lobby);
