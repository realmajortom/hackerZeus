import React from 'react';
import ListItem from './ListItem';
import LoadRingSm from './LoadRingSm';
import LoadArrow from './LoadArrow';

export default function LoadedList(props) {
	return (
		<div className='List'>

			<ul className='articleList'>
				{props.items.map(i => <ListItem key={i.id} data={i} setReader={props.setReader} />)}
			</ul>

			<div className='loadMoreCont'>
				<button className='loadMoreBtn' onClick={() => props.load()}>
					{props.loadingMore === true ? <LoadRingSm /> : <LoadArrow />}
				</button>
			</div>

		</div>
	)
}