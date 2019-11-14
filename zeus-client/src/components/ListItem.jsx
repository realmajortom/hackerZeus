import React from 'react';
import * as ParseUrl from 'url-parse';

export default function ListItem(props) {
	const data = props.data;

	const host = new ParseUrl(data.url, {}).host;

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

					<p className='listItemTitle' style={data.title.length >= 72 ? {fontSize: '11pt'} : {}}>{data.title}</p>

					<div className='listInfo'>

						<div className='infoLeft'>

							<a href={data.url} target='_blank' rel='noopener noreferrer' className='listHost'>{host}</a>

							<div className='infoLeftBottom'>
								<span className='infoDate'>{`${time.month}.${time.date}`}</span>
								<span className='infoTime'>{`${time.hour}:${time.min} ${time.ampm}`}</span>
								<span className='infoDivider'>|</span>
								<span>{data.by}</span>
							</div>
						</div>

						<div className='infoRight'>
							{data.descendants > 0 && <span>Cmt: {data.descendants}</span>}
							<div className='ptsSpan'><span>Pt: {data.score}</span></div>
						</div>

					</div>

				</button>

			</li>
		</>
	)
}