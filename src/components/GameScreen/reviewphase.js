import React, { useState, useEffect } from 'react';
import DrawingCollection from './drawingcollection';
import './reviewphase.css';
import Emoji from "react-emoji-render";

const URL = 'https://draw-off-app-api.herokuapp.com/round_reviews';

function ReviewPhase(props) {
	const [ drawingsFetched, drawingsFetchedSet ] = useState(false);
	const [ drawingData, drawingDataSet ] = useState(null);

	useEffect(() => {
		fetchReviews();
		// eslint-disable-next-line
	}, []);

	function fetchReviews() {
		let reviews_needed = props.numPeople * props.numPeople;
		let roomNumber = props.roomNumber;
		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reviews_needed: reviews_needed, roomNumber: roomNumber })
		})
			.then((response) => response.json())
			.then((json) => checkIfNeedRefresh(json));
	}

	function checkIfNeedRefresh(data) {
		if (data.message) {
			fetchReviews();
		} else {
			drawingDataSet(data);
			drawingsFetchedSet(true);
		}
	}

	return (
		<div>
			{drawingsFetched ? (
				<DrawingCollection drawingData={drawingData} isHost={props.isHost} />
			) : (
				<>
					<div id="loader"><Emoji text="🍆🍆🍆🍆💦🍆🍆🍆🍆" /></div>
					<h3>Waiting for all users to submit reviews</h3>
				</>
			)}
		</div>
	);
}

export default ReviewPhase;
