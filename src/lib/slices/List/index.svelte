<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.ListSlice;
</script>

<section class="box">
	
	<div class="border-t border-d_black">
		{#each slice.primary.items as item}
			<div class="flex w-full border-b border-d_black pb-4 pt-4">
				<div class="w-1/2">
					<p>
						{item.headline}
					</p>
				</div>
	
				<div class="w-1/2">
					<PrismicRichText field={item.text} />
				</div>
			</div>
		{/each}
	</div>
	
</section>
