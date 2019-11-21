import React from 'react';
import calcTime from '../../../dataHelpers/calcTime';


export default function CommentHeader(props) {
	const timeStr = calcTime(props.time);

	return (
		<div className='commentHeader'>
			<span className='commentBy'>{props.by}</span>
			<span className='commentTime'>{timeStr}</span>
			<span className='commentChildrenCount'>{`Children: ${props.count}`}</span>

			<button className='childrenVisBtn' onClick={() => props.toggleVis(!props.vis)}>
				{props.vis ? "[-]" : "[+]"}
			</button>
		</div>
	)
};