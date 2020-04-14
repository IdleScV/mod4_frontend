import React, { useState, useEffect } from 'react';
import Canvas from '../Canvas';
import ReviewPhase from './reviewphase';
import JudgingPhase from './judgingphase.js';
import CanvasDraw from 'react-canvas-draw';

const LEAVEURL = 'http://localhost:3000/leavecurrentroom/';
const HOSTNEW = 'http://localhost:3000/hoststartnewround/';
const GUESTNEW = 'http://localhost:3000/gueststartnewround/';

function GameScreen({ gameProgress, gameProgressSet, roomNumber, isHost, firebase, roomNumberSet }) {
	const [ canvas, canvasSet ] = useState('');
	const [ counter, setCounter ] = useState(10);
	const [ promptData, promptDataSet ] = useState({});
	const [ allPlayerDrawings, allPlayerDrawingsSet ] = useState(null);
	const [ judgingOver, judgingOverSet ] = useState(false);
	const [ err, errSet ] = useState(false);

	useEffect(
		() => {
			const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
			return () => clearInterval(timer);
		},
		[ counter ]
	);

	useEffect(() => {
		fetchPrompt();
	}, []);

	function fetchPrompt() {
		fetch('http://localhost:3000/random_prompt')
			.then((response) => response.json())
			.then((json) => promptDataSet(json));
	}

	function leaveLobby() {
		let firebase_id = firebase.auth.W;
		let num = roomNumber;
		roomNumberSet(null);
		fetch(LEAVEURL + num, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firebase_id: firebase_id })
		});
	}

	function hostAnotherGame() {
		let firebase_id = firebase.auth.W;
		let num = roomNumber;

		fetch(HOSTNEW + num, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firebase_id: firebase_id })
		})
			.then((resp) => resp.json())
			.then((data) => gameProgressSet('open'));
	}

	function joinOriginalLobby() {
		let firebase_id = firebase.auth.W;
		let num = roomNumber;

		fetch(GUESTNEW + num, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firebase_id: firebase_id })
		})
			.then((resp) => resp.json())
			.then((data) => processJoin(data));
	}

	function processJoin(data) {
		if (data.message === 'success') {
			gameProgressSet('open');
		} else {
			errSet(data.message);
		}
	}
	return (
		<div>
			{judgingOver ? (
				<div>
					<ReviewPhase numPeople={allPlayerDrawings.length} roomNumber={roomNumber} isHost={isHost} />
					{isHost ? (
						<button onClick={hostAnotherGame}>Start Another Round?</button>
					) : (
						<button onClick={joinOriginalLobby}>Play Again?{err ? err : null}</button>
					)}
					<button onClick={leaveLobby}>Leave Game</button>
				</div>
			) : allPlayerDrawings ? (
				<JudgingPhase allPlayerDrawings={allPlayerDrawings} judgingOverSet={judgingOverSet} />
			) : (
				<div>
					<h3> Time Left: {counter}</h3>
					<br />
					<h3>Draw a. . . . {promptData.prompt}</h3>
					<Canvas
						CanvasDraw={CanvasDraw}
						canvasSet={canvasSet}
						canvas={canvas}
						counter={counter}
						roomNumber={roomNumber}
						promptId={promptData.id}
						allPlayerDrawingsSet={allPlayerDrawingsSet}
					/>
				</div>
			)}
		</div>
	);
}

export default GameScreen;
