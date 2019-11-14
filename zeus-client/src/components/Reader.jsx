import React, {useState, useEffect} from 'react';
import Article from './Article';
import axios from 'axios';


export default function Reader(props) {
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(false);


	useEffect(() => {
		if (props.data !== null) {
			setLoading(true);

			axios
				.post(`https://hackerzeus.appspot.com/parse`, {url: props.data.url, type: 'markdown', agent: 'desktop'})
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

	}, [props.data, setArticle, setLoading, setError]);



	return (
		<div className={'Reader ' + (loading !== false || error === true ? 'Loading' : '')}>

			{loading === false && error === false
				? <Article data={article} />
				: loading === true
					? <div className="loadRing"></div>
					: error === true
						? <p className='noLoadMsg'>Server could not parse requested data</p>
						: <p className='noLoadMsg'>Select an item from the left to load content</p>
			}

		</div>
	)
}