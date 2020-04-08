import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h1>Account {authUser.email}</h1>
					<PasswordForgetForm />
					<PasswordChangeForm />
				</div>
			)}
		</AuthUserContext.Consumer>
	);
};
//* gives a value to condition variable inside of withAuthorization.js
const condition = (authUser) => !!authUser;

//* passes condition & page into withAuthorization.js
//* only allows accountpage to load if user is signed in
export default withAuthorization(condition)(AccountPage);
