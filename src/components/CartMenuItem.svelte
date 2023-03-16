<script type="ts">
	import { cart } from '../stores/cart';
</script>

<button>
	{$cart?.item_count || 0} items
</button>