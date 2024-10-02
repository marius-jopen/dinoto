<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.Opener2Slice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<PrismicImage class="w-full h-[40vw] object-cover rounded-2xl md:rounded-3xl" field={slice.primary.image} />

	<div class="w-full rounded-2xl md:rounded-3xl bg-d_lightGreen text-d_black text-center py-8 px-8 mt-4 md:-mt-20 z-10 relative">
		<h2>
			{slice.primary.headline}
		</h2>
	</div>

</section>
