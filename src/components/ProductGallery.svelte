<script lang="ts">
	import type {Image} from '../types/product.interface';
	export let images : Array<Image>;

	let featuredImage = images.shift();
</script>

{#if featuredImage}
	<div class="container">
		<img class="featured" src={featuredImage.src} alt={featuredImage.alt} />

		{#if images.length}
			<ul>
				{#each images as image}
					<li>
						<img src={image.src} alt={image.alt} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}

	ul {
		display: flex;
		gap: 1rem;
		padding-left: 0;
		list-style: none;

		li {
			width: 100px;
		}

		img {
			width: 100%;
		}
	}
</style>