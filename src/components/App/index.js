import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';


import CreateOrJoinRoom from '../CreateOrJoinRoom';
import Lobby from '../Lobby';

import * as ROUTES from '../../constants/routes';

// Gives all components information on authenticated user (or sessions)
import { withAuthentication } from '../Session';
import './app.css';

const App = () => {
	const [ roomNumber, roomNumberSet ] = useState(null);

	return (
		<Router>
			<div className="app">
				<div className="navbar">
					<Navigation />
				</div>
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
				<Route path={ROUTES.ADMIN} component={AdminPage} />

				<Route
					path={ROUTES.CREATEORJOINROOM}
					render={() => {
						return <CreateOrJoinRoom roomNumberSet={roomNumberSet} />;
					}}
				/>
				{roomNumber ? (
					<Route
						path={ROUTES.LOBBY}
						render={() => {
							return <Lobby roomNumber={roomNumber} roomNumberSet={roomNumberSet} />;
						}}
					/>
				) : (
					<Route
						path={ROUTES.LOBBY}
						render={() => {
							return <CreateOrJoinRoom roomNumberSet={roomNumberSet} />;
						}}
					/>
				)}
			</div>
		</Router>
	);
};

export default withAuthentication(App);
