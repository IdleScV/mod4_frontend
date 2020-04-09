import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import UserList from './userList';

class AdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			users: []
		};
	}
	componentDidMount() {
		this.setState({ loading: true });
		//* .on() registers a continuous listener taht triggers every time something has changed.
		//* on the other hand, using .once() registeres a listener that gets called only once
		this.props.firebase.users().on('value', (snapshot) => {
			const usersObject = snapshot.val();
			const usersList = Object.keys(usersObject).map((key) => ({
				...usersObject[key],
				uid: key
			}));
			//* Sort userlist by name
			const sortedUserList = usersList.sort((a, b) => a.username > b.username);
			this.setState({
				users: sortedUserList,
				loading: false
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}

	render() {
		const { users, loading } = this.state;

		return (
			<div>
				<h1>Admin</h1>
				{loading && <div>Loading ...</div>}
				<UserList users={users} />
			</div>
		);
	}
}

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(AdminPage));
