<script lang="ts">
	import type Product from '../types/product.interface';
	import {addToCart as addToCartApi} from '../api/frontend/cart';
	import { cart } from '../stores/cart';

	export let product : Product;

	let quantity = 1;
	let isAdding = false;
	let isAdded = false;

	$: buttonLabel = isAdding ? 'Adding...' : (isAdded ? 'Added to cart' : 'Add to cart')

	async function addToCart(product: Product, quantity: number) {
		isAdding = true;
		try {
			const response = await cart.addProduct(product, quantity);
			isAdded = true;
			setTimeout(() => isAdded = false, 5000);
		} catch (error) {
			console.log(error);
		}
		isAdding = false;
	}
</script>

<input type="number" min="0" value={quantity} />
<button on:click={() => addToCart(product, quantity)}>
	{buttonLabel}
</button>
