<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.ExpertiseSlice;
</script>

<section class="box">
	<div class="flex flex-wrap">
		{#each slice.primary.items as item}
			<div class="w-1/2 pb-4">
				<div class="text-d_lightGreen">
					<p>
						{item.headline}
					</p>
				</div>
	
				<PrismicRichText field={item.text} />
			</div>
		{/each}
	</div>
</section>
