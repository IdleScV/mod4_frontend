import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Canvas from '../Canvas';
import CreateOrJoinRoom from '../CreateOrJoinRoom';
import Lobby from '../Lobby';

import * as ROUTES from '../../constants/routes';

// Gives all components information on authenticated user (or sessions)
import { withAuthentication } from '../Session';

const App = () => {
	return (
		<Router>
			<div>
				<Navigation />
				<hr />
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
				<Route path={ROUTES.ADMIN} component={AdminPage} />
				<Route path={ROUTES.CANVAS} component={Canvas} />
				<Route path={ROUTES.CREATEORJOINROOM} component={CreateOrJoinRoom} />
				<Route path="/room" component={Lobby} />
			</div>
		</Router>
	);
};

export default withAuthentication(App);

{
	/* <Switch>
	<Redirect from="/users/:id" to="/users/profile/:id" />
	<Route path="/users/profile/:id">
		<Profile />
	</Route>
</Switch>; */
}
