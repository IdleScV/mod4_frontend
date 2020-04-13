import React, { useState, useEffect } from 'react';
import DrawingCollection from './drawingcollection';

const URL = 'http://localhost:3000/round_reviews';

function ReviewPhase(props) {
	const [ drawingsFetched, drawingsFetchedSet ] = useState(false);
	const [ drawingData, drawingDataSet ] = useState(null);

	useEffect(() => {
		fetchReviews();
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

	return <div>{drawingsFetched ? <DrawingCollection drawingData={drawingData} /> : 'Loading'}</div>;
}

export default ReviewPhase;
