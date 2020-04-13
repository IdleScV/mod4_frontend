import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';

import './index.css';

import { AuthUserContext } from '../Session';

export default function Landing() {
	return (
		<div className="landing">
			<h2>Welcome to *insert app name here*!</h2>
			<div className="buttons">
				<AuthUserContext.Consumer>
					{(authUser) =>
						!authUser ? (
							<div>
								<Button>
									<Link to={ROUTES.SIGN_IN}>Sign In</Link>
								</Button>
								<Button>
									<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
								</Button>{' '}
							</div>
						) : (
							<Button>
								<Link to={ROUTES.CREATEORJOINROOM}>Create or Join Room</Link>
							</Button>
						)}
				</AuthUserContext.Consumer>
			</div>
			<div className="about">
				<h3>About . . . </h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus dolor, luctus nec porttitor in,
					vulputate nec leo. Pellentesque rutrum erat nec fringilla varius. Praesent convallis dignissim orci, id
					malesuada purus tempus ut. Donec eu feugiat turpis. Curabitur ut libero id est vestibulum eleifend vitae
					id neque. Praesent ultrices tellus vel lectus pellentesque, non maximus magna feugiat. Vivamus sed
					malesuada dui, a porta nulla. Morbi sit amet libero nulla. Suspendisse quis odio lobortis, suscipit felis
					ut, vulputate velit.
				</p>
				<br />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus dolor, luctus nec porttitor in,
					vulputate nec leo. Pellentesque rutrum erat nec fringilla varius. Praesent convallis dignissim orci, id
					malesuada purus tempus ut. Donec eu feugiat turpis. Curabitur ut libero id est vestibulum eleifend vitae
					id neque. Praesent ultrices tellus vel lectus pellentesque, non maximus magna feugiat. Vivamus sed
					malesuada dui, a porta nulla. Morbi sit amet libero nulla. Suspendisse quis odio lobortis, suscipit felis
					ut, vulputate velit.
				</p>
			</div>
			<div className="footer">Created with React, Rails, & Firebase</div>
		</div>
	);
}
