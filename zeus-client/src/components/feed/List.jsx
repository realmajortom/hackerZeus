import React from 'react';
import LoadRing from '../icons/LoadRing';
import LoadedList from './LoadedList';



export default function List(props) {
	return (
		<div className={'List ' + (props.loading && 'Loading')}>
			{props.loading
				? <LoadRing />
				: <LoadedList items={props.items} setReader={props.setReader} load={props.load} loadingMore={props.loadingMore} />
			}
		</div>
	)
}