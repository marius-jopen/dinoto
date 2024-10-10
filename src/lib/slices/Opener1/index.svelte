<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.Opener1Slice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<div class="rounded-3xl relative w-full mb-4">
		<div class="pb-4 md:pb-0 md:absolute top-0 right-0 h-full w-full md:w-8/12 lg:w-8/12 z-0">
			<PrismicImage class="aspect-[2/1] sm:aspect-[3/1] md:aspect-none w-full h-full rounded-2xl md:rounded-3xl object-cover" field={slice.primary.image} />
		</div>

		<div class="flex z-20 relative justify-end bg-d_lightGray h-full w-full md:w-7/12 lg:w-5/12 rounded-2xl md:rounded-3xl text-d_black py-8 px-10">
			<PrismicRichText field={slice.primary.text} />
		</div>
	</div>

	<div class="w-full rounded-2xl md:rounded-3xl bg-d_lightGreen text-d_black text-center pt-10 pb-10 px-8">
		<h2>
			{slice.primary.headline}
		</h2>
	</div>
</section>
