<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { PrismicImage } from "@prismicio/svelte";

	export let slice: Content.LogosSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<div class="flex flex-wrap rounded-3xl overflow-hidden">
		{#each slice.primary.items as item, index}
			<div class="w-1/3 md:w-1/5 aspect-square relative">
				<div class="hover:opacity-0 transition-opacity duration-200 absolute z-20 w-full h-full aspect-square top-0 left-0 {index % 2 === 0 ? 'bg-d_lightGreen' : 'bg-d_black'}">
					<PrismicImage class="w-full h-full p-4 md:p-8 lg:p-10" field={item.logo} />
				</div>
				
				<div class="z-10 aspect-square">
					<PrismicImage class="object-cover h-full w-full" field={item.image} />
				</div>
			</div>
		{/each}
	</div>
</section>