import { writable, get } from 'svelte/store';
import { addToCart, getCart } from '../api/frontend/cart';
import type Cart from '../types/cocart.interface';
import type Product from '../types/product.interface';

const COOKIE_CART_KEY = 'cart_key';
const isClientSide = typeof document !== 'undefined';

export const cartKey = writable('');

function getCookie(name: string) {
	if (!isClientSide) {
		return '';
	}
	const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
	return value;
}

cartKey.subscribe((value) => {
	if (!isClientSide || !value) {
		return;
	}
	const maxAge = cartKey ? 60 * 60 * 24 * 31 : 0;
	document.cookie = `${COOKIE_CART_KEY}=${encodeURIComponent(value)}; path=/; expires=${maxAge}`
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