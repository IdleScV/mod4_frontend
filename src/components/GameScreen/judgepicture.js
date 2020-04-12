import React, { useState } from 'react';

import CanvasDraw from 'react-canvas-draw';
import Review from './review.js';
import { withAuthorization } from '../Session';
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

		fetch('http://localhost:3000/reviews', {
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
				<div>
					<CanvasDraw
						ref={(canvas) => currentImageSet(canvas)}
						canvasWidth={600}
						canvasHeight={400}
						hideGrid={true}
						disabled
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