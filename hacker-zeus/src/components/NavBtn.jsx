import React from 'react';

export default function NavBtn(props) {
	return (
		<>
			<button className={'NavBtn ' + (props.current && 'NavCurrent')} onClick={props.click}>
				{props.text}
			</button>
		</>
	)
}