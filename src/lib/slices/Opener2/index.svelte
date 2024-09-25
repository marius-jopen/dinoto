<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.Opener2Slice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<PrismicImage class="w-full h-[40vw] object-cover rounded-3xl" field={slice.primary.image} />

	<div class="w-full rounded-3xl bg-d_lightGreen text-d_black text-center py-8 px-8 -mt-10 z-10 relative">
		<h1>
			{slice.primary.headline}
		</h1>
	</div>

</section>
