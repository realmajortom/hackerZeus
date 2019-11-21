import React from 'react';


export default function CommentBody(props) {
	return (
		<div className='commentText' dangerouslySetInnerHTML={{__html: props.text}} style={{fontSize: `${props.fontSize - 1}pt`}} />
	)
}