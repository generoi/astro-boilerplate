import type YoastHead from "./yoast.interface"

export default interface Page {
	id: number
	slug: string
	link: string
	lang: string | boolean
	modified: string
	parent: number
	menu_order: number
	title: {
		rendered: string
	}
	translations: any
	content: {
		rendered: string
	}
	yoast_head_json: YoastHead
}