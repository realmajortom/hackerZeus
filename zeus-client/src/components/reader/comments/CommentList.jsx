import React, {useEffect, useState} from 'react';
import getItems from '../../../dataHelpers/getItems';
import Comment from './Comment';


export default function CommentList(props) {
	const depth = props.depth + 1;
	const ids = props.ids;
	const [comms, setComms] = useState([]);

	useEffect(() => {
		setComms(getItems(ids));
	}, [ids]);

	return (
		<div className='CommentList'>
			{comms.map(c => <Comment key={c.id} data={c} depth={depth} />)}
		</div>
	);
}