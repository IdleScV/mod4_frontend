import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
	// <Button type="button" onClick={firebase.doSignOut}>
	// 	Sign Out
	// </Button>
	<Link to={ROUTES.LANDING} onClick={firebase.doSignOut}>
		Sign Out
	</Link>
);
export default withFirebase(SignOutButton);
