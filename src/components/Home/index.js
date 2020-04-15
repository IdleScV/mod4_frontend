import React, { useState, useEffect } from 'react';

import { withAuthorization } from '../Session';
import HomeDrawingCollection from './homedrawingcollection';
import './index.css';
const USERSURL = 'https://draw-off-app-api.herokuapp.com/users/';

const HomePage = (props) => {
	const [ data, setData ] = useState(null);

	useEffect(() => {
		function fetchUserDrawings() {
			let firebaseId = props.firebase.auth.W;

			fetch(USERSURL + firebaseId).then((response) => response.json()).then((json) => setData(json));
		}

		fetchUserDrawings();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="homepage">
			<div className="drawingcollection">
				{data ? (
					<HomeDrawingCollection data={data} />
				) : (
					<div>You have not yet made any drawings... play some games!</div>
				)}
			</div>
		</div>
	);
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
