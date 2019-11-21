import React, {useState, useEffect} from 'react';
import Article from './article/Article';
import axios from 'axios';
import CommentSection from './comments/CommentSection';


export default function Reader(props) {
	const data = props.data;
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(false);


	useEffect(() => {
		if (data !== null) {
			setLoading(true);

			axios
				.post(`https://hackerzeus.appspot.com/parse`,
					{url: data.url, type: 'markdown', agent: props.agent})
				.then(res => {
					if (res.data.article) {
						setArticle(res.data.article);
						setError(false);
						setLoading(false);
					} else {
						setError(true);
						setLoading(false);
					}
				});
		};

	}, [data, props.agent, setArticle, setLoading, setError]);


	return (
		<div className={'Reader ' + (loading !== false ? 'Loading' : '')}>

			<div style={loading ? {display: "none"} : {display: "block"}} className='commentJump'>
				{(data !== null && data.kids) && <a href='#commentSection' className='jumpText' >Jump to comments</a>}
			</div>

			{loading === true
				? <div className="loadRing"></div>
				: error === true
					? <p className='noLoadMsg'>Server could not parse requested data</p>
					: article
						? <Article data={article} font={props.font} fontSize={props.fontSize} />
						: <p className='noLoadMsg'>Select an item from the left to load content</p>
			}

			<div style={loading !== false ? {display: "none"} : {display: "block"}}>
				{(data !== null && data.kids) && <CommentSection ids={data.kids} fontSize={props.fontSize} />}
			</div>

		</div>
	)
}