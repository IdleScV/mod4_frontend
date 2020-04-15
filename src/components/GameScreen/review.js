import React, { useState } from 'react';

import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenRadio = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600]
		}
	},
	checked: {}
})((props) => <Radio color="default" {...props} />);

function Review({ postReview, currentImage }) {
	const [ value, setValue ] = useState('upvote');
	const [ comment, setComment ] = useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className="reviewpost">
			<div className="buttons">
				<h2>I LIKE IT</h2>
				<GreenRadio checked={value === 'upvote'} onChange={handleChange} value="upvote" name="radio-button-demo" />
				<h2>I HATE IT</h2>
				<Radio checked={value === 'downvote'} onChange={handleChange} value="downvote" name="radio-button-demo" />
			</div>
			<TextField
				className="input"
				id="outlined-multiline-static"
				multiline
				rows={6}
				label="Write a Review . . ."
				value={comment}
				placeholder="🙏🏻😇🙏🏻 Be Nice . . . . . or crush their hopes and dreams 🔥😈🔥"
				variant="outlined"
				onChange={(e) => {
					setComment(e.target.value);
				}}
			/>
			<br />
			<Button
				className="submit"
				variant="contained"
				color="primary"
				endIcon={<Icon>send</Icon>}
				onClick={() => {
					postReview(value, comment);
					setComment('');
				}}
			>
				Submit
			</Button>
		</div>
	);
}

export default Review;
