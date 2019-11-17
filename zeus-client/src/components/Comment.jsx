import React from 'react';
import CommentList from './CommentList';


export default function Comment(props) {
	return (
		<div>

			<div className='Comment'>
				<p className='commentText'>{props.data.text}</p>
			</div>

			{props.data.hasOwnProperty('kids') && <CommentList ids={props.data.kids} />}

		</div>
	);
}