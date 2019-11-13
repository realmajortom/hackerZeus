import React, {useState, useEffect} from 'react';
import Article from './Article';
import axios from 'axios';

export default function Reader(props) {
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		if (props.data !== null) {
			setLoading(true);
			axios.post(`https://hackerzeus.appspot.com/parse`, {url: props.data.url}).then(res => {
				setArticle(res.data.article);
				setLoading(false);
			})
		}
	}, [props.data, setArticle, setLoading]);

	if (loading === true) {
		return (
			<div className='Reader Loading'>
				<div className="loadRing"></div>
			</div>
		)
	} else if (loading === false) {
		return (
			<div className='Reader'>
				<Article article={article} />
			</div>
		)
	} else {
		return (
			<div className='Reader Loading'>
				<p className='noLoadMsg'>Select an item from the left to load content.</p>
			</div>
		)
	}
}