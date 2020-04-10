import React, { useState } from 'react';
import CreateRoom from './create_room';
import JoinRoom from './join_room';
import Box from '@material-ui/core/Box';

import { withAuthorization } from '../Session';

import './createorjoin.css';

function CreateOrJoinRoom(props) {
	const [ userData, userDataSet ] = useState([]);

	props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
		userDataSet(snapshot.val());
	});

	return (
		<div className="createorjoin">
			<Box component="span" m={1}>
				<CreateRoom userData={userData} firebaseId={props.firebase.auth.W} roomNumberSet={props.roomNumberSet} />
			</Box>
			<Box component="span" m={1}>
				<JoinRoom userData={userData} firebaseId={props.firebase.auth.W} roomNumberSet={props.roomNumberSet} />
			</Box>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CreateOrJoinRoom);
