import React from 'react';
import CommentList from './CommentList';


export default function CommentSection(props) {
	return (
		<div className='CommentSection' id='commentSection'>
			<CommentList ids={props.ids} depth={0} />
		</div>
	)
}
