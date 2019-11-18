import React from 'react';

export default function DateDisplay(props) {
	const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	return (
		<>
			<p>
				<span>{props.date.slice(8, 10)} </span>
				<span>{months[props.date.slice(5, 7) - 1]}, </span>
				<span>{props.date.slice(0, 4)}</span>
			</p>
		</>
	);

}