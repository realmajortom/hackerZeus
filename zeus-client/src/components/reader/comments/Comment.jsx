import React, {useState} from 'react';
import CommentList from './CommentList';
import calcTime from '../../../dataHelpers/calcTime';


export default function Comment(props) {
	const [childrenVis, setChildrenVis] = useState(true);

	const timeStr = calcTime(props.data.time);

	return (
		<div>

			<div className={`Comment commentDepth${props.depth}`}>

				<div className='commentHeader'>
					<span className='commentBy'>{props.data.by}</span>

					<span className='commentTime'>{timeStr}</span>

					<button className='childrenVisBtn' onClick={() => setChildrenVis(!childrenVis)}>
						{childrenVis ? "[-]" : "[+]"}
					</button>
				</div>

				<div
					className='commentText'
					style={childrenVis ? {display: 'block'} : {display: 'none'}}
					dangerouslySetInnerHTML={{__html: props.data.text}}
				/>
			</div>


			{props.data.hasOwnProperty('kids') &&
				<div style={childrenVis ? {display: 'block'} : {display: 'none'}} >
					<CommentList ids={props.data.kids} depth={props.depth} />
				</div>
			}

		</div>
	);
}