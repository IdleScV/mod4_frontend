import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';

import './index.css';

import { AuthUserContext } from '../Session';

export default function Landing() {
	return (
		<div className="landing">
			<h2>Draw-Off</h2>
			<div className="buttons">
				<AuthUserContext.Consumer>
					{(authUser) =>
						!authUser ? (
							<div>
								<Button variant="contained">
									<Link to={ROUTES.SIGN_IN}>Sign In</Link>
								</Button>
								<Button variant="contained">
									<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
								</Button>{' '}
							</div>
						) : (
							<Button variant="contained">
								<Link to={ROUTES.CREATEORJOINROOM}>Create or Join Room</Link>
							</Button>
						)}
				</AuthUserContext.Consumer>
			</div>
			<div className="about">
				<h2>About . . . </h2>
				<p>
					Welcome to <b>Draw-Off</b>, an application where you and other users can have a friendly "draw off"
					contest and see who can draw the best picture:<br /> (based upon the number of upvotes a user's drawing
					receives from their peers!)
				</p>
				<br />
				<div>
					<h3>How to Begin?</h3>
					<p>
						If you haven't already, <Link to={ROUTES.SIGN_UP}>sign up</Link> and create an account to get started!
						After doing so you as a user can either "Host a Room" or "Join a Room" by clicking on the menu tab
						(top-right) and clicking <b>"create or join"</b>
					</p>
					<br />
					<h3>Quick Notes:</h3>
					<ul>
						<li>In order to join a room you must know the Host's room number in order to enter!</li>
						<li>
							There is a limit on how many users can be in a lobby, <i>specified by the host</i>
						</li>
						<li>
							When the Game begins you have a time limit to draw your prompt <i>gotta go fast</i>
						</li>
						<br />
					</ul>
				</div>
			</div>
			<div className="footer">Created with React, Rails, & Firebase</div>
		</div>
	);
}
