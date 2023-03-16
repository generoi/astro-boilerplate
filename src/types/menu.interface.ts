export interface MenuItem {
	ID: number
	url: string
	type: string
	title: string
	target: string
	attr_title: string
	description: string
	classes: string[]
	slug: string
	object: string
	object_type: string
}

export default interface Menu {
	term_id: number
	name: string
	slug: string
	description: string
	count: number
	items: Array<MenuItem>
}