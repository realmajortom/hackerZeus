import React from 'react';


export default function ErrorLink(props) {
	return (
		<div style={{textAlign: 'center'}}>
			<p style={{fontSize: '18pt', fontWeight: 'bolder', color: '#aaa'}}>No Content Available</p>
			<p><a href={props.url} target='_blank' rel='noopener noreferrer'>Go to linked website</a></p>
		</div>
	)
}