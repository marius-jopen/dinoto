<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.ExpertiseSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="flex flex-wrap lg:flex-nowrap pb-12 md:pb-0">
		{#each slice.primary.items as item}
			<div data-aos="fade-up" class="w-full sm:w-1/2 pb-12 p1 pr-2 text-center md:text-left">
				<div class="text-d_lightGreen">
					{item.headline}
				</div>
	
				<PrismicRichText field={item.text} />
			</div>
		{/each}
	</div>
</section>
