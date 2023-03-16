import type { Block } from "./block.interface"
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
	has_blocks: boolean
	block_data: Array<Block>
	yoast_head_json: YoastHead,
}