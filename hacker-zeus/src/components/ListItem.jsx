import React from 'react';

export default function ListItem(props) {
	const data = props.data;
	const by = data.by;
	const score = data.score;
	const title = data.title;
	const desc = data.descendants;

	const date = new Date(data.time * 1000);

	const time = {
		month: date.getMonth() + 1,
		date: date.getDate(),
		hour: (date.getHours() > 12 ? (date.getHours() - 12) : date.getHours()),
		min: (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()),
		ampm: date.getHours() < 12 ? 'am' : 'pm'
	}

	return (
		<>
			<li className='ListItem' id={props.data.id}>

				<button onClick={() => props.setReader(data)} className='listBtn'>

					<h2 className='listItemTitle'>{title}</h2>

					<div className='listInfo'>

						<div className='infoLeft'>
							<span>{by}</span>
							<div className='infoLeftBottom'>
								<span className='infoDate'>{`${time.month}.${time.date}`}</span>
								<span>{`${time.hour}:${time.min} ${time.ampm}`}</span>
							</div>
						</div>

						<div className='infoRight'>
							{desc > 0 && <span>Comments: {desc}</span>}
							<div className='ptsSpan'><span>Pts: {score}</span></div>
						</div>

					</div>

				</button>

			</li>
		</>
	)
}