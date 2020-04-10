import React, { useState, useEffect } from 'react';
import Canvas from '../Canvas';

function GameScreen(props) {
	const [ canvasString, canvasStringSet ] = useState(null);
	const [ prompt, promptSet ] = useState(null);
	const [ timeLeft, timeLeftSet ] = useState(120);

	const [ canvas, canvasSet ] = useState('');

	const tickTime = () =>
		setInterval(() => {
			timeLeftSet(timeLeft - 1);
		}, 1000);

	console.log(timeLeft);

	function onSubmit() {
		console.log(canvasString);
	}

	return (
		<div>
			<h3>Time Left: {timeLeft}</h3>
			<Canvas canvasStringSet={canvasStringSet} canvasString={canvasString} canvasSet={canvasSet} canvas={canvas} />
			<button onClick={onSubmit} />
		</div>
	);
}

export default GameScreen;
