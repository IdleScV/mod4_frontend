import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
	<div>
		<h1>SignUpPage</h1>
		<SignUpForm />
	</div>
);
// Setting an initial state so we can reset after successful signup
const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	firebaseID: '',
	error: null
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { username, email, passwordOne } = this.state;
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			//* saves user into firebase realtime database
			.then((authUser) => {
				// console.log(authUser.W, username);
				return this.props.firebase.user(authUser.user.uid).set({
					username,
					email
				});
			})
			//* resets signup form state & sends user to home page
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};

	// onChange handler allows input fields to capture & update local state information
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;
		// Validation logic
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
				<input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
				<input
					name="passwordOne"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="Password"
				/>
				<input
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Confirm Password"
				/>
				{/* disabled if input are not valid */}
				<button disabled={isInvalid} type="submit">
					Sign Up
				</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignUpLink = () => {
	return (
		<p>
			Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
		</p>
	);
};

//* uses (withFirebase & withRouter) higher-order component here
// const SignUpForm = withRouter(withFirebase(SignUpFormBase)); << refactored with compose bellow
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
