import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Slider from '@material-ui/core/Slider';

export default function Canvas(props) {
	const [ canvas, canvasSet ] = useState('');
	const [ color, colorSet ] = useState('#000000');
	const [ brushRadius, brushRadiusSet ] = useState(10);

	return (
		<div>
			<h1>Canvas</h1>
			<button
				onClick={() => {
					canvas.clear();
				}}
			>
				Clear
			</button>
			<button
				onClick={() => {
					canvas.undo();
				}}
			>
				Undo
			</button>
			<input
				type="color"
				onChange={(e) => {
					colorSet(e.target.value);
				}}
			/>
			<Slider
				min={1}
				value={brushRadius}
				max={20}
				step={0.1}
				aria-labelledby="continuous-slider"
				onChange={(e, newValue) => {
					brushRadiusSet(newValue);
				}}
			/>

			<CanvasDraw ref={(canvasDraw) => canvasSet(canvasDraw)} brushColor={color} brushRadius={brushRadius} />
		</div>
	);
}
