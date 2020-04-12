import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import './index.css';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Navigation = () => {
	return (
		<div className="nav_menu">
			<AuthUserContext.Consumer>
				{(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
			</AuthUserContext.Consumer>
		</div>
	);
};

const NavigationAuth = () => {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Menu
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem>
					<Link to={ROUTES.HOME}>Home</Link>
				</MenuItem>
				<MenuItem>
					<Link to={ROUTES.ACCOUNT}>Account</Link>
				</MenuItem>

				<MenuItem>
					<Link to={ROUTES.CREATEORJOINROOM}>Create or Join Room</Link>
				</MenuItem>
				<MenuItem>
					<SignOutButton />
				</MenuItem>
			</Menu>
		</div>
	);
};

const NavigationNonAuth = () => {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Menu
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem>
					<Link to={ROUTES.LANDING}>Landing</Link>
				</MenuItem>

				<MenuItem>
					<Link to={ROUTES.SIGN_IN}>Sign In</Link>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default Navigation;
