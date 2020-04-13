import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

import './drawingcard.css';

function DrawingCard(props) {
	const [ currentImage, currentImageSet ] = useState(null);
	useEffect(
		() => {
			function loadPicture() {
				if (currentImage) {
					currentImage.loadSaveData(props.drawing.drawing, false);
				}
			}

			loadPicture();
		},
		[ currentImage ]
	);

	return (
		<div>
			{props.drawing.drawing ? (
				<div className="reviewCard">
					<div className="title">A Drawing of {props.prompt.prompt}</div>
					<div className="author">By: {props.creator.username}</div>
					<CanvasDraw
						ref={(canvas) => currentImageSet(canvas)}
						canvasWidth={600}
						canvasHeight={400}
						hideGrid={true}
						disabled
					/>
					<div className="likes">{props.reviews.map((review) => (review.like ? '👍' : '👎')).flat()}</div>
					<div className="comments">
						<h3>User Reviews:</h3>
						<ul>{props.reviews.map((review) => <li>{review.comment}</li>)}</ul>
					</div>
				</div>
			) : (
				'Loading'
			)}
		</div>
	);
}

export default DrawingCard;
