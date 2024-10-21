<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.ChatSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="flex-col-reverse md:flex-row flex gap-8">
		<div class="md:w-1/2 flex flex-col justify-end">
			<div data-aos="fade-up" class="relative bg-d_lightGreen text-d_black py-6 px-8 rounded-2xl md:rounded-3xl">
				<PrismicRichText field={slice.primary.text_bottom} />

				<div class="bg-d_white w-12 h-12 text-center pt-3 rounded-full absolute right-[12%] md:right-[10%] -mt-1 lg:mt-0">
					{slice.primary.emoji}
				</div>
			</div>
		</div>
		
		<div class="md:w-1/2 flex flex-col justify-start gap-y-4">
			{#each slice.primary.items as item}
				<div data-aos="fade-up" class="bg-d_mediumGray text-d_black py-6 px-8 rounded-2xl md:rounded-3xl">
					<PrismicRichText field={item.text} />
				</div>
			{/each}
		</div>
	</div>
</section>
