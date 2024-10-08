<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.ExpertiseSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="flex flex-wrap">
		{#each slice.primary.items as item}
			<div data-aos="fade-up" class="w-full sm:w-1/2 pb-8 p1 pr-2">
				<div class="text-d_lightGreen">
					{item.headline}
				</div>
	
				<PrismicRichText field={item.text} />
			</div>
		{/each}
	</div>
</section>
