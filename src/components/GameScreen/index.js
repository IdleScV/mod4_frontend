import React, { useState, useEffect } from 'react';
import Canvas from '../Canvas';
import ReviewPhase from './reviewphase';
import JudgingPhase from './judgingphase.js';
import CanvasDraw from 'react-canvas-draw';

function GameScreen({ gameProgress, gameProgressSet, roomNumber }) {
	const [ canvas, canvasSet ] = useState('');
	const [ counter, setCounter ] = useState(10);
	const [ promptData, promptDataSet ] = useState({});
	const [ allPlayerDrawings, allPlayerDrawingsSet ] = useState(null);
	const [ judgingOver, judgingOverSet ] = useState(false);

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

	return (
		<div>
			{judgingOver ? (
				<ReviewPhase numPeople={allPlayerDrawings.length} roomNumber={roomNumber} />
			) : allPlayerDrawings ? (
				<JudgingPhase allPlayerDrawings={allPlayerDrawings} judgingOverSet={judgingOverSet} />
			) : (
				<div>
					<h3> Time Left: {counter}</h3>
					<br />
					<h3>{promptData.prompt}</h3>
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
