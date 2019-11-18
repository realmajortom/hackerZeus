import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';


export default function Article(props) {

	return (
		<div className='Article'
			onMouseEnter={() => props.toggleDarken(true)}
			onMouseLeave={() => props.toggleDarken(false)}>

			<article className='articleInner'>

				<ArticleHeader
					date={props.data.date_published}
					author={props.data.author}
					url={props.data.url}
					domain={props.data.domain}
				/>

				<ArticleBody
					font={props.font}
					fontSize={props.fontSize}
					title={props.data.title}
					content={props.data.content}
					excerpt={props.data.excerpt}
					url={props.data.url}
				/>

			</article>

		</div>
	)
}