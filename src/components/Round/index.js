import React, { useState } from 'react';

import Canvas from '../Canvas';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Round = () => {
	return (
		<div>
			<h1> "Round [X] " </h1>
			<h3> Draw a dick </h3>
			<Canvas />
		</div>
	);
};

export default Round;
