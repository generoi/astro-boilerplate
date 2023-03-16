import type YoastHead from "./yoast.interface"

export interface Image {
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	src: string
	name: string
	alt: string
}

type Taxonomy = {
	id: number
	name: string
	slug: string
}

type Dimensions = {
	length: string
	width: string
	height: string
}

export default interface Product {
	id: number
	name: string
	slug: string
	permalink: string
	date_created: string
	description: string
	short_description: string
	sku: string
	regular_price: string
	price: string
	tags: Array<Taxonomy>
	product_line: Array<Taxonomy>
	categories: Array<Taxonomy>
	images: Array<Image>
	lang: string
	stock_status: string
	purchasable: boolean
	dimensions: Dimensions
	variation_name: string | boolean
	yoast_head_json: YoastHead
}