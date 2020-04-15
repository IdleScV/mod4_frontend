import React from 'react';
import CanvasCard from './canvascard';
import './index.css';
function HomeDrawingCollection({ data }) {
	let { username, drawings, reviews, prompt } = data;
	return (
		<div className="homecollection">
			<div className="title">Drawings by {username}</div>
			<div className="flex">
				{drawings.map((drawing, i) => (
					<CanvasCard drawing={drawing} prompt={prompt[i]} reviews={reviews[i]} key={i} />
				))}
			</div>
		</div>
	);
}

export default HomeDrawingCollection;
