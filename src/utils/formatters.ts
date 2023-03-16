
export const priceFormatter = new Intl.NumberFormat('fi-FI', {
	style: 'currency',
	currency: 'EUR',
});

export function price(price: number | string) {
	price = typeof price === 'string' ? parseFloat(price) : price;
	return priceFormatter.format(price);
}