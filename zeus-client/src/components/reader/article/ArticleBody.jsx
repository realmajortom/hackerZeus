import React from 'react';
import ErrorLink from './ErrorLink';
const ReactMarkdown = require('react-markdown');


export default function ArticleBody(props) {
	return (
		<>
			<section name='Article Content' className='ArticleBody' style={{fontFamily: props.font}}>

				<h1 className='articleTitle' style={{fontSize: `${props.fontSize * 1.85}pt`}}>{props.title}</h1>

				<div className='articleText' style={{fontSize: `${props.fontSize}pt`}}>
					{props.content
						? <ReactMarkdown source={props.content} linkTarget='_blank' renderers={{html: true}} />
						: props.excerpt
							? props.excerpt
							: <ErrorLink url={props.url} />
					}
				</div>


			</section>
		</>
	)
}
