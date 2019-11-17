import React, {useEffect, useState} from 'react';
import getItems from '../api/getItems';
import Comment from './Comment';


export default function CommentList(props) {
	const ids = props.ids;
	const [comments, setComments] = useState([]);

	useEffect(() => {
		setComments(getItems(ids));
	}, [ids]);

	return (
		<div className='CommentList'>
			{comments.map(c => <Comment key={c.id} data={c} />)}
		</div>
	);
}