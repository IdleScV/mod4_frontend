import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color';

import './canvas.css';

export default function Canvas(props) {
	const [ color, colorSet ] = useState('#f44336');
	const [ brushRadius, brushRadiusSet ] = useState(5);
	const [ backgroundColor, backgroundColorSet ] = useState('#000000');
	const [ lazyRadius, lazyRadiusSet ] = useState(10);
	// These two need to be callback functions
	// const [ savedDrawing, savedDrawingSet ] = useState('');
	// const [ canvas, canvasSet ] = useState('');

	let savedDrawingSet = props.canvasStringSet;
	let savedDrawing = props.canvasString;
	let canvasSet = props.canvasSet;
	let canvas = props.canvas;

	return (
		<div className="canvas">
			<ButtonGroup color="primary" aria-label="outlined primary button group">
				<Button
					onClick={() => {
						canvas.clear();
					}}
				>
					Clear
				</Button>
				<Button
					onClick={() => {
						canvas.undo();
					}}
				>
					Undo
				</Button>
				<Button
					onClick={() => {
						savedDrawingSet(canvas.getSaveData());
					}}
				>
					Save Image
				</Button>
				<Button
					onClick={() => {
						console.log((savedDrawing.split(/%..|./).length - 1) / 1000.0, 'kb');
					}}
				>
					Print Saved IMG String to Console
				</Button>
				<Button
					onClick={() => {
						canvas.loadSaveData(savedDrawing, false);
					}}
				>
					Load Saved Image
				</Button>
			</ButtonGroup>
			<CirclePicker
				circleSize={25}
				onChange={(color) => {
					colorSet(color.hex);
					console.log(color.hex);
				}}
			/>
			<div className="canvasSliders">
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
				<Slider
					min={1}
					value={lazyRadius}
					max={50}
					step={1}
					aria-labelledby="continuous-slider"
					onChange={(e, newValue) => {
						lazyRadiusSet(newValue);
					}}
				/>
			</div>
			<CanvasDraw
				ref={(canvasDraw) => canvasSet(canvasDraw)}
				canvasWidth={600}
				canvasHeight={400}
				brushColor={color}
				lazyRadius={lazyRadius}
				backgroundColor={backgroundColor}
				brushRadius={brushRadius}
				hideGrid={true}
			/>
		</div>
	);
}
