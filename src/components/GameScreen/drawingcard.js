import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

import './drawingcard.css';

function DrawingCard(props) {
	const [ currentImage, currentImageSet ] = useState(null);
	useEffect(
		() => {
			function loadPicture() {
				if (currentImage) {
					currentImage.loadSaveData(props.drawing.drawing, true);
				}
			}

			loadPicture();
		},
		// eslint-disable-next-line
		[ currentImage ]
	);
	let Like = 0;
	let Dislike = 0;
	props.reviews.forEach((review) => (review.like ? (Like += 1) : (Dislike += 1)));
	return (
		<div>
			{props.drawing.drawing ? (
				<div className="drawingcard" key={props.key}>
					<CanvasDraw
						ref={(canvas) => currentImageSet(canvas)}
						canvasWidth={400}
						canvasHeight={300}
						hideGrid={true}
						disabled
						backgroundColor="black"
						className="reviewcanvas"
					/>
					<div className="description">
						<div className="prompttitle">
							<b> "{props.prompt.prompt}" </b>
						</div>
						<div className="author">
							<p style={{ fontSize: 36 }}>
								<b>By: {props.creator.username} </b>
							</p>
						</div>
					</div>
					<div className="likes">
						<div className="thumbsUp">
							<span role="img" aria-label="thumbsup">
								👍
							</span>{' '}
							: {Like}
						</div>
						<div className="thumbsDown">
							<span role="img" aria-label="thumbsdown">
								👎
							</span>{' '}
							: {Dislike}
						</div>
					</div>
					<div className="reviews">
						<div className="comments">
							<div className="allreviews">
								{props.reviews.map(
									(review) =>
										review.comment.length > 0 ? <p className="singlereview">"{review.comment}"</p> : null
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				'Loading'
			)}
		</div>
	);
}

export default DrawingCard;
