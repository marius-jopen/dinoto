<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.TextSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="{slice.primary.style == "Inline" ? 'ml-[35%] w-[65%]' : 'w-full'}">
		<PrismicRichText field={slice.primary.text} />
	</div>
</section>
