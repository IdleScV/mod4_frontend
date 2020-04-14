import React from 'react';
import DrawingCard from './drawingcard';
import './drawingcollection';

function DrawingCollection({ drawingData, isHost }) {
	return (
		<div className="drawingCollection">
			{drawingData.drawings.map((drawing, i) => (
				<DrawingCard
					drawing={drawing}
					reviews={drawingData.reviews[i]}
					prompt={drawingData.prompt[i]}
					creator={drawingData.creator[i]}
					key={i}
				/>
			))}
		</div>
	);
}

export default DrawingCollection;
