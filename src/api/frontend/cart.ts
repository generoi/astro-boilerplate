import type { CartItem } from '../../types/cocart.interface';
import type Cart from '../../types/cocart.interface';
import type Product from '../../types/product.interface';
import { fetchClient } from '../fetch';

// @see https://docs.cocart.xyz/#add-to-cart-add-a-simple-product
export async function addToCart(product: Product, quantity: number, cartKey?: string) {
	const response = await fetchClient(
		`/wp-json/cocart/v2/cart/add-item`,
		{
			...cartKey && { cart_key: cartKey }
		},
		{
			method: 'POST',
			body: JSON.stringify({
				id: String(product.id),
				quantity: String(quantity),
			}
		),
	});

	const result: CartItem = await response.json();
	console.log(result);
	return result;
}

export async function getCart(cartKey?: string) {
	const response = await fetchClient(`/wp-json/cocart/v2/cart`, {
		...cartKey && { cart_key: cartKey }
	});
	const result: Cart = await response.json();
	return result;
}