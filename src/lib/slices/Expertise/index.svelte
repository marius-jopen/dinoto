<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.ExpertiseSlice;
</script>

<section class="box mt-8 mb-8">
	<div class="flex flex-wrap">
		{#each slice.primary.items as item}
			<div class="w-1/2 pb-6 p1">
				<div class="text-d_lightGreen">
					{item.headline}
				</div>
	
				<PrismicRichText field={item.text} />
			</div>
		{/each}
	</div>
</section>
