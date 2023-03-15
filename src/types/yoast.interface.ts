interface Robots {
	index: "noindex" | "index",
	follow: "follow" | "nofollow",
}

interface OgImage {
	width: number,
	height: number,
	url: string,
	type: string,
}

export default interface YoastHead {
	title: string
	description?: string
	robots: Robots,
	og_locale: string,
	og_type: string,
	og_title: string,
	og_description?: string,
	og_url: string,
	og_site_name: string,
	article_modified_time?: string,
	og_image: Array<OgImage>,
	twitter_card: "summary" | "summary_large_image" | "app" | "player",
	twitter_misc?: string,
	schema: JSON,
}