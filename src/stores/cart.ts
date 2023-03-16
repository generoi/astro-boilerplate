import { writable, get } from 'svelte/store';
import { addToCart, getCart } from '../api/frontend/cart';
import type Cart from '../types/cocart.interface';
import type Product from '../types/product.interface';
import { getCookie, setCookie } from '../utils/cookies';

const COOKIE_CART_KEY = 'cart_key';

export const cartKey = writable('');

cartKey.subscribe((value) => {
	if (!value) {
		return;
	}
	const maxAge = 60 * 60 * 24 * 31;
	setCookie(COOKIE_CART_KEY, value, maxAge);
});

function createCartStore() {
	const { subscribe, set, update } = writable(null as Cart | null);

	async function fetch() {
		const sessionCartKey = get(cartKey) || getCookie(COOKIE_CART_KEY);
		const cart = await getCart(sessionCartKey);
		set(cart);
	}

	async function addProduct(product: Product, quantity: number) {
		const item = await addToCart(product, quantity, get(cartKey));
		fetch();
		return item;
	}

	subscribe((cart) => {
		cartKey.set(cart?.cart_key || '');
	})

	fetch();

	return {
		subscribe,
		set,
		update,
		fetch,
		addProduct,
	}
}

export const cart = createCartStore();