import React, { useState, useEffect } from 'react';
// import CanvasDraw from 'react-canvas-draw';

import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color';

import { withAuthorization } from '../Session';

import './canvas.css';
let URL = 'http://localhost:3000/drawings';
function Canvas(props) {
	// eslint-disable-next-line
	const [ backgroundColor, backgroundColorSet ] = useState('#000000');
	const [ color, colorSet ] = useState('#f44336');
	const [ brushRadius, brushRadiusSet ] = useState(5);
	const [ lazyRadius, lazyRadiusSet ] = useState(10);

	const [ CanvasDraw, canvasSet, canvas, counter, roomNumber, promptId, allPlayerDrawingsSet ] = props;
	// let CanvasDraw = props.CanvasDraw;
	// let canvasSet = props.canvasSet;
	// let canvas = props.canvas;
	// let counter = props.counter;
	// let roomNumber = props.roomNumber;
	// let promptId = props.promptId;
	// let allPlayerDrawingsSet = props.allPlayerDrawingsSet;

	useEffect(
		() => {
			function checkTime() {
				if (counter === 0) {
					PostImage();
				}
			}
			checkTime();
		},
		// eslint-disable-next-line
		[ counter ]
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
		if (data.message) {
			refreshImageGetter();
		} else {
			allPlayerDrawingsSet(data);
		}
	}

	function refreshImageGetter() {
		fetch(`http://localhost:3000/refresh_images/${roomNumber}`)
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
