<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { PrismicImage, PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.ImageSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="{slice.primary.style == 'Full Screen' ? '' : 'box'} {distanceTop} {distanceBottom}">
	<div class="{slice.primary.style == 'Inline' ? 'ml-[35%] w-[65%]' : 'w-full'} relative">
		<div class="{slice.primary.style == 'Full Screen' ? '' : 'rounded-3xl overflow-hidden'}">			
			<PrismicImage class="w-full" field={slice.primary.image} />
		</div>

		<div class="text-center pt-2 text-d_darkGray">
			<PrismicRichText field={slice.primary.caption} />
		</div>
	</div>
</section>
