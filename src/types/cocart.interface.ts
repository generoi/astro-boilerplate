export interface Currency {
	currency_code: string
	currency_symbol: string
	currency_minor_unit: number
	currency_decimal_separator: string
	currency_thousand_separator: string
	currency_prefix: string
	currency_suffix: string
}

export interface BillingAddres {
	billing_first_name: string
	billing_last_name: string
	billing_company: string
	billing_country: string
	billing_address_1: string
	billing_address_2: string
	billing_postcode: string
	billing_city: string
	billing_state: string
	billing_phone: string
	billing_email: string
}

export interface ShippingAddress {
	shipping_first_name: string
	shipping_last_name: string
	shipping_company: string
	shipping_country: string
	shipping_address_1: string
	shipping_address_2: string
	shipping_postcode: string
	shipping_city: string
	shipping_state: string
}

export interface Customer {
	billing_address: BillingAddres
	shipping_address: ShippingAddress
}

export interface Quantity {
	value: number
	min_purchase: number
	max_purchase: number
}

export interface TaxData {
	subtotal: string[] // @todo
	total: string[]
}

export interface ItemTotals {
	subtotal: number
	subtotal_tax: number
	total: number
	tax: number
}

interface Meta {
    [key: string]: string | boolean | number | Meta;
}

export interface CartItem {
    item_key: string
    id: number
    name: string
    title: string
    price: string
    quantity: Quantity
    tax_data: TaxData
    totals: ItemTotals
    slug: string
	meta: Meta
    cart_item_data: string[] // @todo
    featured_image: string
}

export interface Rate {
	key: string
	method_id: string
	instance_id: number
	label: string
	cost: string
	html: string
	taxes: string[] // @todo
	chosen_method: boolean
}

export interface Rates {
    [key: string]: Rate;
}

export interface Package {
	package_name: string
	rates: Rates
	package_details: string
	index: number
	chosen_method: string
	formatted_destination: string
}

export interface Packages {
    [key: string]: Package
}

export interface Shipping {
	total_packages: number
	show_package_details: boolean
	has_calculated_shipping: boolean
	packages: Packages
}

export interface CartTotals {
	subtotal: string
	subtotal_tax: string
	fee_total: string
	fee_tax: string
	discount_total: string
	discount_tax: string
	shipping_total: string
	shipping_tax: string
	total: string
	total_tax: string
}

export default interface Cart {
	cart_hash: string
	cart_key: string
	currency: Currency
	customer: Customer
	items: Array<CartItem>
	item_count: number
	items_weight: number
    coupons: string[] // todo
    needs_payment: boolean
    needs_shipping: boolean
    shipping: Shipping
    fees: string[] // todo
    taxes: string[] // todo
    totals: CartTotals
    removed_items: string[] // todo
    cross_sells: string[] // todo
    notices: string[] // todo
}
