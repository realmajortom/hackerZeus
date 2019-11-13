import React from 'react';

const DateDisplay = (props) => {
	const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	return (
		<>
			<p>
				<span>{props.date.slice(8, 10)} </span>
				<span>{months[props.date.slice(5, 7) - 1]}, </span>
				<span>{props.date.slice(0, 4)}</span>
			</p>
		</>
	)
}

export default function Article(props) {

	const article = {
		"title": props.article.title,
		"content": props.article.content,
		"author": props.article.author,
		"lead_image_url": props.article.lead_image_url,
		"date_published": props.article.date_published,
		"dek": props.article.dek,
		"next_page_url": props.article.next_page_url,
		"url": props.article.url,
		"domain": props.article.domain,
		"excerpt": props.article.excerpt,
		"word_count": props.article.word_count,
		"direction": props.article.direction,
		"total_pages": props.article.total_pages,
		"rendered_pages": props.article.rendered_pages
	}



	return (
		<div className='Article'>
			<article className='articleInner'>

				<header>

					<section className='articleMeta' name='Article Info'>
						{article.date_published !== null && <DateDisplay date={article.date_published} />}

						{article.author !== null && (<p>{article.author}</p>)}

						<a href={article.url} target='_blank' rel='noopener noreferrer' className='articleLink'>
							{article.domain === null ? 'Link' : article.domain}
						</a>
					</section>

					<h1 className='articleTitle'>{article.title}</h1>
				</header>

				<section name='Article Content' className='articleContext'>
					{article.content !== null ? article.content : article.excerpt !== null ? article.excerpt : 'Go to website'}
				</section>


			</article>
		</div>
	)
}