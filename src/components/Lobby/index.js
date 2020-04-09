import React, { useEffect, useState } from 'react';

const URL = 'http://localhost:3000/rooms/';

function Lobby({ roomNumber }) {
	const [ users, usersSet ] = useState([]);
	const [ roomStatus, roomStatusSet ] = useState('Loading...');
	const [ host, hostSet ] = useState(null);

	function fetchUsers() {
		console.log('room number is', roomNumber);
		fetch(`${URL}${roomNumber}`).then((response) => response.json()).then((json) => showData(json));
	}

	function showData(data) {
		console.log(data);
		roomStatusSet(data['room_status']);
		hostSet(data['host'].username);
		usersSet(data['user_list'].map((user) => user['username']));
	}

	useEffect(() => {
		//Component will update
		fetchUsers();
	}, []);

	return (
		<div>
			{host ? (
				<div>
					<div>Room Number is: {roomNumber}</div>
					<div>Hosted By: {host}</div>
					<button onClick={fetchUsers}>Refresh</button>
					<div>Room Status: {roomStatus}</div>
					{users ? <ul>{users.map((user) => <li>{user}</li>)}</ul> : null}
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default Lobby;
