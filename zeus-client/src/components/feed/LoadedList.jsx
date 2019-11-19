import React from 'react';
import FeedItem from './FeedItem';
import LoadRingSm from '../icons/LoadRingSm';
import LoadArrow from '../icons/LoadArrow';

export default function LoadedList(props) {
	return (
		<div>

			<ul className='articleList'>
				{props.items.map(i => <FeedItem key={i.id} data={i} setReader={props.setReader} dark={props.dark}/>)}
			</ul>

			<div className='loadMoreCont'>
				<button className='loadMoreBtn' onClick={() => props.load()}>
					{props.loadingMore === true ? <LoadRingSm /> : <LoadArrow />}
				</button>
			</div>

		</div>
	)
}