import React from 'react';

const Timer = (props) => {
	return (
		<div>
			<h3>Time Left: {props.timeLeft}</h3>
		</div>
	);
};

export default Timer;
