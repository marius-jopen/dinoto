<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.TextSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="text-box {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="{slice.primary.style == "Inline" ? 'md:ml-[35%] md:w-[65%]' : slice.primary.style == "SuperNarrow" ? 'md:ml-[45%] md:w-[55%]' : 'w-full'}">
		<PrismicRichText field={slice.primary.text} />
	</div>
</section>
