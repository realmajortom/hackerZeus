import React from 'react';
import CommentList from './CommentList';


export default function CommentSection(props) {
	return (
		<div className='CommentSection'>
			<CommentList ids={props.ids} />
		</div>
	)
}
