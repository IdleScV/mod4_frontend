import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './index.css';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { passwordOne } = this.state;

		this.props.firebase
			.doPasswordUpdate(passwordOne)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { passwordOne, passwordTwo, error } = this.state;

		const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

		return (
			<form onSubmit={this.onSubmit} className="passwordchangeform">
				{/* <input
					name="passwordOne"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="New Password"
				/> */}

				<TextField
					name="passwordOne"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="New Password"
				/>
				<br />
				{/* <input
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Confirm New Password"
				/> */}
				<TextField
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Confirm New Password"
				/>
				<br />
				{/* <button disabled={isInvalid} type="submit">
					Reset My Password
				</button> */}
				<Button disabled={isInvalid} type="submit">
					Reset My Password
				</Button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

export default withFirebase(PasswordChangeForm);
