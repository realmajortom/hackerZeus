import React, {useState, useEffect} from 'react';
import Article from './Article';
import axios from 'axios';
import CommentSection from './CommentSection';


export default function Reader(props) {
	const data = props.data;
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(false);
	const [darken, setDarken] = useState(false);


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
		<div className={'Reader ' + (loading !== false || error === true ? 'Loading' : '')}>

			<div className='articleBack' style={darken ? {opacity: 0, zIndex: 10} : {opacity: 0, zIndex: -1}}></div>

			<div style={loading || error ? {display: "none"} : {display: "block"}} className='commentJump'>
				{(data !== null && data.kids) && <a href='#commentSection' className='jumpText' >Jump to comments</a>}
			</div>

			{loading === true
				? <div className="loadRing"></div>
				: error === true
					? <p className='noLoadMsg'>Server could not parse requested data</p>
					: article
						? <Article data={article} font={props.font} fontSize={props.fontSize} toggleDarken={setDarken} />
						: <p className='noLoadMsg'>Select an item from the left to load content</p>
			}

			<div style={loading ? {visibility: "hidden"} : {visibility: "visible"}}>
				{(data !== null && data.kids) && <CommentSection ids={data.kids} />}
			</div>

		</div>
	)
}