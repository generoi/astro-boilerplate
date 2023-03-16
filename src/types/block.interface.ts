export interface BlockAttributes {
	align: string
	content: string
	// todo
}

export interface HeadingBlockAttributes extends BlockAttributes {
	level: number
	placeholder: string
}

export interface ParagraphBlockAttributes extends BlockAttributes {
	placeholder: string
	dropCap: boolean
}

export interface MediaTextBlockAttributes extends BlockAttributes {
	mediaId?: number
	mediaLink?: string
	mediaType: string
	mediaAlt: string
	mediaPosition: 'left' | 'right'
	mediaUrl: string
	mediaWidth: number
	mediaSizeSlug: string
	isStackedOnMobile: boolean
	verticalAlignment: string
	imageFill: boolean
}

export interface BaseBlock {
	blockName: string
	attrs: BlockAttributes
	innerBlocks: Array<Block>
	innerHTML: string
	innerContent: string
	rendered: string
}

export interface ParagraphBlock extends BaseBlock {
	blockName: "core/paragraph"
	attrs: ParagraphBlockAttributes
}

export interface HeadingBlock extends BaseBlock {
	blockName: "core/heading"
	attrs: HeadingBlockAttributes
}

export interface MediaTextBlock extends BaseBlock {
	blockName: "core/media-text"
	attrs: MediaTextBlockAttributes
}

export type Block =
	| ParagraphBlock
	| HeadingBlock
	| MediaTextBlock
	| BaseBlock