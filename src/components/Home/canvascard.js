import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import './index.css';
function CanvasCard({ drawing, reviews, prompt }) {
	const [ currentImage, currentImageSet ] = useState(null);

	useEffect(
		() => {
			function loadPicture() {
				if (currentImage) {
					currentImage.loadSaveData(drawing.drawing, false);
				}
			}
			loadPicture();
		},
		[ currentImage ]
	);

	return (
		<div className="cardhomepage">
			<div className="prompttitle">{prompt.prompt}</div>
			<CanvasDraw
				ref={(canvas) => currentImageSet(canvas)}
				canvasWidth={300}
				canvasHeight={200}
				hideGrid={true}
				disabled
				backgroundColor="black"
				className="reviewcanvas"
			/>
			<div className="comment">
				{reviews.map((review) => (review.comment.length > 1 ? <div>"{review.comment}"</div> : null))}
			</div>
		</div>
	);
}

export default CanvasCard;
