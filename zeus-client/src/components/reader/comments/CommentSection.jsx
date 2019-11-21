import React from 'react';
import CommentList from './CommentList';


export default function CommentSection(props) {
	return (
		<div className='CommentSection' id='commentSection'>
			<h3>Comments</h3>
			<CommentList ids={props.ids} depth={0} vis={true} fontSize={props.fontSize} />
		</div>
	)
}
