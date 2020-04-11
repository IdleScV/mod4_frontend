import React, { useState, useEffect } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

function Review({ postReview, currentImage }) {
	const [ value, setValue ] = useState('upvote');
	const [ comment, setComment ] = useState('');
	const [ current, currentSet ] = useState(currentImage);
	const handleChange = (event) => {
		setValue(event.target.value);
	};
	useEffect(
		() => {
			setValue('upvote');
			setComment('');
		},
		[ current ]
	);

	return (
		<div>
			<RadioGroup value={value} onChange={handleChange}>
				<FormControlLabel value="upvote" control={<Radio />} label="Up Vote" />
				<FormControlLabel value="downvote" control={<Radio />} label="Down Vote" />
			</RadioGroup>
			<TextField
				id="standard-basic"
				label="Add Comment"
				value={comment}
				onChange={(e) => {
					setComment(e.target.value);
				}}
			/>
			<button onClick={() => postReview(value, comment)}>Submit</button>
		</div>
	);
}

export default Review;
