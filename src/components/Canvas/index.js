import React, { useState, useEffect } from 'react';
// import CanvasDraw from 'react-canvas-draw';

import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color';

import { withAuthorization } from '../Session';

import './canvas.css';

function Canvas(props) {
	const [color, colorSet] = useState('#f44336');
	const [brushRadius, brushRadiusSet] = useState(5);
	const [backgroundColor, backgroundColorSet] = useState('#000000');
	const [lazyRadius, lazyRadiusSet] = useState(10);

	let CanvasDraw = props.CanvasDraw;
	let canvasSet = props.canvasSet;
	let canvas = props.canvas;
	let counter = props.counter;
	let roomNumber = props.roomNumber;
	let promptId = props.promptId;
	let allPlayerDrawingsSet = props.allPlayerDrawingsSet;

	let URL = 'https://draw-off-app-api.herokuapp.com/drawings';

	useEffect(
		() => {
			function checkTime() {
				if (counter === 0) {
					PostImage();
				}
			}

			checkTime();
		},
		[counter]
	);

	function PostImage() {
		let canvasData = canvas.getSaveData();
		let firebaseId = props.firebase.auth.W;
		let payload = {
			drawingData: canvasData,
			firebaseId: firebaseId,
			room_number: roomNumber,
			promptId: promptId
		};

		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => processReturn(json));
	}

	function processReturn(data) {
		// if (data.message) {
		// 	console.log(data.message);
		// } else {
		// 	console.log(data);
		// }
		if (data.message) {
			// console.log('No images', data);
			refreshImageGetter();
		} else {
			// console.log('set images');
			allPlayerDrawingsSet(data);
		}
	}

	function refreshImageGetter() {
		fetch(`https://draw-off-app-api.herokuapp.com/${roomNumber}`)
			.then((response) => response.json())
			.then((json) => processReturn(json));
	}

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
				{/* Using this to judge images later */}
				{/* <Button
					onClick={() => {
						canvas.loadSaveData(savedDrawing, false);
					}}
				>
					Load Saved Image
				</Button> */}
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Canvas);
