import React, { useState } from 'react';
import CreateRoom from './create_room';
import JoinRoom from './join_room';

import { withAuthorization } from '../Session';

function CreateOrJoinRoom(props) {
	const [ userData, userDataSet ] = useState([]);

	props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
		userDataSet(snapshot.val());
	});

	return (
		<div>
			<CreateRoom userData={userData} firebaseId={props.firebase.auth.W} />
			<JoinRoom />
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CreateOrJoinRoom);
