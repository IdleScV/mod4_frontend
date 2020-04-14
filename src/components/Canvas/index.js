import React, { useState, useEffect } from 'react';
// import CanvasDraw from 'react-canvas-draw';

import Slider from '@material-ui/core/Slider';
import UndoIcon from '@material-ui/icons/Undo';

import ClearIcon from '@material-ui/icons/Clear';

import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color';

import { withAuthorization } from '../Session';

import './canvas.css';

function Canvas(props) {
	const [ color, colorSet ] = useState('#f44336');
	const [ brushRadius, brushRadiusSet ] = useState(5);
	// eslint-disable-next-line
	const [ backgroundColor, backgroundColorSet ] = useState('#000000');

	let CanvasDraw = props.CanvasDraw;
	let canvasSet = props.canvasSet;
	let canvas = props.canvas;
	let counter = props.counter;
	let roomNumber = props.roomNumber;
	let promptId = props.promptId;
	let allPlayerDrawingsSet = props.allPlayerDrawingsSet;

	let URL = 'https://draw-off-app-api.herokuapp.com/drawings';
	let REFRESHURL = 'https://draw-off-app-api.herokuapp.com/refresh_images/';

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
			setTimeout(function() {
				refreshImageGetter();
			}, 500);
		} else {
			allPlayerDrawingsSet(data);
		}
	}

	function refreshImageGetter() {
		fetch(REFRESHURL + roomNumber).then((response) => response.json()).then((json) => processReturn(json));
	}

	return (
		<div className="canvas">
			<div className="controls">
				<div className="buttons">
					<Button
						color="primary"
						startIcon={<UndoIcon />}
						onClick={() => {
							canvas.undo();
						}}
					>
						Undo
					</Button>
					<Button
						color="secondary"
						startIcon={<ClearIcon />}
						onClick={() => {
							canvas.clear();
						}}
					>
						Clear
					</Button>
				</div>
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
				</div>
			</div>
			<CanvasDraw
				ref={(canvasDraw) => canvasSet(canvasDraw)}
				canvasWidth={600}
				canvasHeight={400}
				brushColor={color}
				lazyRadius={10}
				backgroundColor={backgroundColor}
				brushRadius={brushRadius}
				hideGrid={true}
				className="drawingcanvas"
			/>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Canvas);
