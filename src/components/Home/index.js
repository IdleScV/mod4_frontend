import React from 'react';

import { withAuthorization } from '../Session';

const HomePage = (props) => {
	console.log(props.firebase.auth);
	return (
		<div>
			<h1>Home Page</h1>
			<p>The Home Page is accesible by all signed in users</p>
		</div>
	);
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
