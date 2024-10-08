<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
	import { isFilled } from '@prismicio/helpers';

	export let slice: Content.ImageSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="{slice.primary.style == 'Full Screen' ? '' : 'box'} {distanceTop} {distanceBottom}">
	<div class="{slice.primary.style == 'Inline' ? 'lg:ml-[25%] lg:w-[75%]' : 'w-full'} relative">
		<div class="{slice.primary.style == 'Full Screen' ? '' : 'rounded-2xl md:rounded-3xl overflow-hidden'}">			
			<PrismicImage class="w-full" field={slice.primary.image} />
		</div>

		{#if isFilled.richText(slice.primary.caption)}
			<div class="text-center pt-2 text-d_darkGray">
				<PrismicRichText field={slice.primary.caption} />
			</div>
		{/if}
	</div>
</section>
