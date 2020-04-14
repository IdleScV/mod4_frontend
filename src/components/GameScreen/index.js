import React, { useState, useEffect } from 'react';
import Canvas from '../Canvas';
import ReviewPhase from './reviewphase';
import JudgingPhase from './judgingphase.js';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';

import './index.css';
const LEAVEURL = 'https://draw-off-app-api.herokuapp.com/leavecurrentroom/';
const HOSTNEW = 'https://draw-off-app-api.herokuapp.com/hoststartnewround/';
const GUESTNEW = 'https://draw-off-app-api.herokuapp.com/gueststartnewround/';
const RANDOMPROMPT = 'https://draw-off-app-api.herokuapp.com/random_prompt/';

function GameScreen({ gameProgress, gameProgressSet, roomNumber, isHost, firebase, roomNumberSet }) {
	const [ canvas, canvasSet ] = useState('');
	const [ counter, setCounter ] = useState(90);
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
		fetch(RANDOMPROMPT).then((response) => response.json()).then((json) => promptDataSet(json));
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
				<div className="judginover">
					{isHost ? (
						<Button className="EndOfGameBtn" variant="contained" color="primary" onClick={hostAnotherGame}>
							Start Another Round?
						</Button>
					) : (
						<Button className="EndOfGameBtn" variant="contained" color="primary" onClick={joinOriginalLobby}>
							Play Again?{err ? err : null}
						</Button>
					)}
					<Button className="EndOfGameBtn" variant="contained" color="primary" onClick={leaveLobby}>
						Leave Game
					</Button>
					<ReviewPhase numPeople={allPlayerDrawings.length} roomNumber={roomNumber} isHost={isHost} />
				</div>
			) : allPlayerDrawings ? (
				<JudgingPhase allPlayerDrawings={allPlayerDrawings} judgingOverSet={judgingOverSet} />
			) : (
				<div className="drawingphase">
					<div className="header">
						<h3 className="timer">
							{' '}
							Time Left: {Math.floor(counter / 60)} Mins {counter % 60} Seconds
						</h3>

						<h3 className="prompt">Draw a. . . . {promptData.prompt}</h3>
					</div>
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
