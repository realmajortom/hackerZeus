import React, {useState, useEffect} from 'react';
import Comment from './Comment';
import getItems from '../../../dataHelpers/getItems'


export default function CommentList(props) {
	const ids = props.ids;
	const vis = props.vis;
	const depth = props.depth;
	const fontSize = props.fontSize;
	const [comments, setComments] = useState([]);
	const [commCount, setCommCount] = useState(0);


	const getLoadList = (start, ids) => {
		const end = ids.length < (start + 5) ? ids.length : (start + 5);
		const list = ids.slice(start, end);

		return list;
	};


	const asyncSetComments = async (list, count, existing) => {
		const comms = await getItems(list);
		const filtered = await comms.filter(c => !c.error);

		if (existing) {
			const combined = existing.concat(filtered);
			setComments(combined);
		} else {
			setComments(filtered);
		}

		setCommCount(count + comms.length);
	}


	const loadMore = async () => {
		const list = await getLoadList(commCount, ids);
		asyncSetComments(list, commCount, comments);
	};


	useEffect(() => {
			const list = getLoadList(0, ids);
			asyncSetComments(list, 0, null);
	}, [ids]);


	const mappedComments = (vis && comments.length >= 1)
		? comments.map((c, i) => <Comment data={c} depth={depth + 1} fontSize={fontSize} key={`${c.id}-${i}`} />)
		: null;


	if (vis && mappedComments) {

		return (
			<div className='CommentList'>

				{mappedComments}

				{(commCount !== ids.length) && <button onClick={() => loadMore()} className='commentLoadBtn'>Load more</button>}

			</div>
		);

	} else {
		return (<div className='CommentList'></div>)
	};

}