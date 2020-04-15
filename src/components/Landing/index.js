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
					contest and see who can draw the best picture:<br /> </p>
					<p style={{fontSize: 13, textAlign: "center"}}>(Which will be based upon the number of upvotes a drawing
					receives from their peers!)</p>
				<br />
				<div>
					<h3>How to Begin?</h3>
					<p>
						If you haven't already, <Link to={ROUTES.SIGN_UP}><u>sign-up</u></Link> and create an account to get started!<br/>
						After doing so, you can either <em>"host"</em> or <em>"join"</em> a room by clicking on the <b>menu</b> tab
						(top-left) and clicking <b>"Create or Join Room"</b>
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
