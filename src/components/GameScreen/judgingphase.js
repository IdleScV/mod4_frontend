import React, { useState, useEffect } from 'react';

import JudgePicture from './judgepicture';

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
	}, []);

	function nextImage() {
		currentImageNumSet(currentImageNum + 1);
	}

	return (
		<div>
			{props.allPlayerDrawings ? (
				<div>
					<div>
						Judging Picture #{currentImageNum} out of #{totalImageNum}
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
