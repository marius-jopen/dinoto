<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.DogBreakSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
    <div class="text-center md:w-[70%] mx-8 md:mx-[15%]">
        <PrismicRichText field={slice.primary.text} />
    </div>
</section>
