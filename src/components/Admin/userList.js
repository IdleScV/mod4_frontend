import React from 'react';

const UserList = ({ users }) => {
	return (
		<ul>
			{users.map((user) => (
				<li key={user.uid}>
					<span>
						<strong>Username:</strong> {user.username}
					</span>
					<br />
					<span>
						<strong>E-Mail:</strong> {user.email}
					</span>
					<br />

					<span>
						<strong>ID:</strong> {user.uid}
					</span>
				</li>
			))}
		</ul>
	);
};

export default UserList;
