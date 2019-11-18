import React from 'react';
import DateDisplay from '../../icons/DateDisplay';

export default function ArticleHeader(props) {
	return (
		<>
			<header className='ArticleHeader'>

				{props.date && <DateDisplay date={props.date} />}

				{props.author && (<p>{props.author}</p>)}

				<p><a href={props.url} target='_blank' rel='noopener noreferrer' className='articleLink'>
					{props.domain ? props.domain : 'Link'}
				</a></p>

			</header>
		</>
	)
}
