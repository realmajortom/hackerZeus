import React, {useState, useEffect} from 'react';
import Article from './article/Article';
import axios from 'axios';
import CommentSection from './comments/CommentSection';


export default function Reader(props) {
	const data = props.data;
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(null);
	const [message, setMessage] = useState('Select an item from the left to load content');


	useEffect(() => {
		if (data !== null) {
			setLoading(true);

			const askHN = /Ask HN/gi.test(data.title);

			if (askHN) {
				setArticle(null);
				setMessage(data.title);
				setLoading(false);
			} else {
				axios
					.post(`https://hackerzeus.appspot.com/parse`, { url: data.url, type: 'markdown', agent: props.agent })
					.then(res => {
						if (res.data.article) {
							setArticle(res.data.article);
						} else {
							setMessage('Server could not parse requested data');
							setArticle(null);
						}
						setLoading(false);
					});
			}
		};

	}, [data, props.agent, setArticle, setLoading]);


	return (
		<div className={'Reader ' + (loading !== false ? 'Loading' : '')}>

			<div style={loading ? {display: "none"} : {display: "block"}} className='commentJump'>
				{(data !== null && data.kids) && <a href='#commentSection' className='jumpText' >Jump to comments</a>}
			</div>

			{loading === true
				? <div className="loadRing"></div>
				: article
					? <Article data={article} font={props.font} fontSize={props.fontSize} />
					: <p className='noLoadMsg'>{message}</p>
			}

			<div style={loading !== false ? {display: "none"} : {display: "block"}}>
				{(data !== null && data.kids) && <CommentSection ids={data.kids} fontSize={props.fontSize} />}
			</div>

		</div>
	)
}