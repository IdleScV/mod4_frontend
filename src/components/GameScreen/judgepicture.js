import React, { useState } from 'react';

import CanvasDraw from 'react-canvas-draw';
import Review from './review.js';
import { withAuthorization } from '../Session';

const REVIEWS = 'https://draw-off-app-api.herokuapp.com/reviews';

function JudgePicture(props) {
	const [ currentImage, currentImageSet ] = useState('');

	function loadPicture() {
		if (props.drawingData && currentImage) {
			currentImage.loadSaveData(props.drawingData.drawing, false);
		}
	}
	loadPicture();

	function postReview(like, comment) {
		console.log('submit data', like, comment);

		let firebaseId = props.firebase.auth.W;

		let payload = {
			firebaseId: firebaseId,
			drawingId: props.drawingData.id,
			comment: comment,
			like: like
		};

		fetch(REVIEWS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => processedReview());
	}

	function processedReview() {
		props.nextImage();
	}

	return (
		<div>
			{props.drawingData ? (
				<div className="judginpicture">
					<CanvasDraw
						ref={(canvas) => currentImageSet(canvas)}
						canvasWidth={600}
						canvasHeight={400}
						hideGrid={true}
						disabled
						className="judgincanvas"
						backgroundColor="black"
					/>
					<Review postReview={postReview} currentImage={currentImage} />
				</div>
			) : (
				'Loading'
			)}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(JudgePicture);
