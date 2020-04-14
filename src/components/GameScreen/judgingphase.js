import React, { useState, useEffect } from 'react';

import JudgePicture from './judgepicture';

import './judgingphase.css';

function JudgingPhase(props) {
	const [ totalImageNum, totalImageNumSet ] = useState(null);
	const [ currentImageNum, currentImageNumSet ] = useState(0);

	useEffect(() => {
		if (props.allPlayerDrawings.length > 0) {
			totalImageNumSet(props.allPlayerDrawings.length);
			// console.log('Drawing Received');
		} else {
			// console.log('No Drawings Yet');
		}
		// eslint-disable-next-line
	}, []);

	function nextImage() {
		if (currentImageNum + 1 === totalImageNum) {
			props.judgingOverSet(true);
		} else {
			currentImageNumSet(currentImageNum + 1);
		}
	}

	return (
		<div>
			{props.allPlayerDrawings ? (
				<div className="judginpanel">
					<div className="title">
						Art Piece #{currentImageNum + 1} out of #{totalImageNum}
					</div>
					<JudgePicture drawingData={props.allPlayerDrawings[currentImageNum]} nextImage={nextImage} />
				</div>
			) : (
				'Waiting for Drawings'
			)}
		</div>
	);
}

export default JudgingPhase;
