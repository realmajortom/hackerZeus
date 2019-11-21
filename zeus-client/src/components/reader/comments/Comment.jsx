import React, {useState} from 'react';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody';
import CommentList from './CommentList';


export default function Comment(props) {
	const [vis, setVis] = useState(false);

	return (
		<div className='commentContainer'>

			<div className={`Comment commentDepth${props.depth}`}>

				<CommentHeader
					vis={vis}
					toggleVis={setVis}
					by={props.data.by}
					time={props.data.time}
					count={props.data.kids ? props.data.kids.length : 0} />

				<CommentBody
					text={props.data.text}
					fontSize={props.fontSize} />

			</div>

			{props.data.kids &&
				<CommentList
					vis={vis}
					depth={props.depth}
					ids={props.data.kids}
					key={`${props.data.id}-coli`}
				/>
			}


		</div>
	);
}