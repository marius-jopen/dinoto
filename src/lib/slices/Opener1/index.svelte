<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.Opener1Slice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="rounded-3xl relative w-full mb-4">
		<div class="absolute top-0 right-0 h-full w-8/12 z-0">
			<PrismicImage class="w-full h-full rounded-3xl object-cover" field={slice.primary.image} />
		</div>

		<div class="flex z-20 relative justify-end bg-d_lightGray h-full w-5/12 rounded-3xl text-d_black py-8 px-10">
			<div class="p1">
				<PrismicRichText field={slice.primary.text} />
			</div>
		</div>
	</div>

	<div class="w-full rounded-3xl bg-d_lightGreen text-d_black text-center pt-10 pb-10 px-8">
		<h1>
			{slice.primary.headline}
		</h1>
	</div>
</section>
