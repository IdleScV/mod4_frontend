import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Slider from '@material-ui/core/Slider';
import { CirclePicker } from 'react-color';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function Canvas(props) {
	const [ canvas, canvasSet ] = useState('');
	const [ color, colorSet ] = useState('#f44336');
	const [ brushRadius, brushRadiusSet ] = useState(5);
	const [ backgroundColor, backgroundColorSet ] = useState('#000000');
	const [ lazyRadius, lazyRadiusSet ] = useState(10);
	const [ savedDrawing, savedDrawingSet ] = useState('');

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
						console.log(savedDrawing);
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

			<CanvasDraw
				ref={(canvasDraw) => canvasSet(canvasDraw)}
				canvasWidth={600}
				canvasHeight={400}
				brushColor={color}
				lazyRadius={lazyRadius}
				backgroundColor={backgroundColor}
				brushRadius={brushRadius}
			/>
		</div>
	);
}
