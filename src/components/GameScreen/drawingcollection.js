import React, { useState, useEffect } from 'react';
import DrawingCard from './drawingcard';
import './drawingcollection';

function DrawingCollection({ drawingData }) {
	const [ isHost, isHostSet ] = useState(null);

	return (
		<div>
			{/* <div className="roomcontrols">
                    {isHost ? <Button onClick={startGame}>Return to Lobby</Button> : null}

                    <Link to={ROUTES.CREATEORJOINROOM}>
                        <Button onClick={leavePagePost}>Leave Session</Button>
                    </Link>
            </div> */}

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
		</div>
	);
}

export default DrawingCollection;
