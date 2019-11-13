import React from 'react';
import ListItem from './ListItem';

export default function List(props) {

	if (props.loading) {
		return (
			<div className='List ListLoading'>
				<div className="loadRing"></div>
			</div>
		)
	} else {
		return (
			<div className='List'>
				<ul>
					{props.items.map(i => <ListItem key={i.id} data={i} setReader={props.setReader} type={props.type} />)}
				</ul>
			</div>
		)
	}
}