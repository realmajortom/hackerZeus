import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Reader(props) {
	const [parsedData, setParsedData] = useState(null);

	useEffect(() => {
		if (props.data !== null) {
			axios.post(`https://hackerzeus.appspot.com/parse`, {url: props.data.url}).then(res => {
				console.log(res.data);
			})
		}
	}, [props.data, setParsedData]);

	return (
		<div className='Reader'>
			{/* <h1>{parsedData !== null && parsedData.title}</h1> */}
		</div>
	)
}