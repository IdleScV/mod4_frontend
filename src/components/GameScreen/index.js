import React, { useState, useEffect } from 'react';
import Canvas from '../Canvas';
import JudgingPhase from './judgingphase.js';
import CanvasDraw from 'react-canvas-draw';

function GameScreen({ gameProgress, gameProgressSet, roomNumber }) {
	const [ canvas, canvasSet ] = useState('');
	const [ counter, setCounter ] = useState(10);
	const [ promptData, promptDataSet ] = useState({});
	const [ allPlayerDrawings, allPlayerDrawingsSet ] = useState(null);

	useEffect(
		() => {
			const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
			return () => clearInterval(timer);
		},
		[ counter ]
	);
	// 1. we need a method that makes a fetch call for a prompt on component mount
	useEffect(() => {
		fetchPrompt();
	}, []);

	function fetchPrompt() {
		fetch('http://localhost:3000/random_prompt')
			.then((response) => response.json())
			.then((json) => promptDataSet(json));
	}

	// useEffect(
	// 	() => {
	// 		timerCheck();
	// 	},
	// 	[ counter ]
	// );

	// function timerCheck() {
	// 	if (counter === 5) {
	// 		console.log('this is canvas', canvas);
	// 		canvasStringSet(canvas.getSavedData());
	// 	}
	// 	if (counter === 0) {
	// 		console.log(canvasString);
	// 	}
	// }

	// 2. we need a method that checks when count becomes 0

	/* Timer works: need to implement following:

	1). WHEN TIMER HITS ZERO

			... NEED ALL USER DRAWINGS TO MAKE "POST" REQUEST ...

			let canvas = document.getElementById('theFreakinCanvas')  --> acquiring canvas object
			let imgData = canvas.toDataURL(); 				          --> long ass string
			fetch('http://localhost:3000/drawings', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(
					{round_id: 1,
					 user_id: 83,
					 prompt: "Draw a Dolphin",    //==> how do we get prompt in first place?
					 drawing: imgData,
					 status: "completed"}
				)
			})

	2). AFTER POST REQUEST
			... (a new component?) will render all submitted drawings
			... In this component we should be able to upvote/downvote it ...
			**  THEY SHOULD NOT BE ABLE TO SEE THEIR OWN DRAWING?? ** 

	3). AFTER RATING PICTURES: 
			... we should be taken to a results Component, which pictures are displayed by order of likes

	4). Begin another Round? 
			change gameProgress state, incrase by 1. 

	*/
	return (
		<div>
			{/* Before (allPlayerDrawings ? )this was (count === 0 ?)  */}
			{allPlayerDrawings ? (
				<JudgingPhase allPlayerDrawings={allPlayerDrawings} />
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
