<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { backgroundColor } from '../../components/color-styles';
	import { PrismicRichText, PrismicImage } from "@prismicio/svelte";

	export let slice: Content.BoxTrippleSlice;
	
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
	let styleClass
	let styleClass2
	let styleClass3
	
	$: styleClass = backgroundColor(slice.primary.color_1);
	$: styleClass2 = backgroundColor(slice.primary.color_2);
	$: styleClass3 = backgroundColor(slice.primary.color_3);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<div class="lg:flex gap-8">
		<div class="flex flex-col gap-8">
			<div class="rounded-2xl md:rounded-3xl overflow-hidden {styleClass}">
				{#if slice.primary.headline_1}
					<h2 class="pt-6 px-8">
						{slice.primary.headline_1}
					</h2>
				{/if}
	
				{#if slice.primary.text_1 && slice.primary.text_1.length > 0}
					<div class="px-8 pt-8 pb-8 pb-4">
						<PrismicRichText field={slice.primary.text_1} />
					</div>
				{/if}
	
				<PrismicImage class="w-full h-full object-cover" field={slice.primary.image_1} />
			</div>
	
			<div class="rounded-2xl md:rounded-3xl overflow-hidden mb-8 lg:mb-0 {styleClass2}">
				{#if slice.primary.headline_2}
					<h2 class="pt-6 px-8">
						{slice.primary.headline_2}
					</h2>
				{/if}
	
				{#if slice.primary.text_2 && slice.primary.text_2.length > 0}
					<div class="px-8 pt-8 pb-8 pb-4">
						<PrismicRichText field={slice.primary.text_2} />
					</div>
				{/if}
	
				<PrismicImage class="w-ful h-full object-cover" field={slice.primary.image_2} />
			</div>
		</div>

		<div class="rounded-2xl md:rounded-3xl overflow-hidden {styleClass3}">
			{#if slice.primary.headline_3}
				<h2 class="pt-6 px-8">
					{slice.primary.headline_3}
				</h2>
			{/if}

			{#if slice.primary.text_3 && slice.primary.text_3.length > 0}
				<div class="px-8 pt-8 pb-8 pb-4">
					<PrismicRichText field={slice.primary.text_3} />
				</div>
			{/if}

			<PrismicImage class="w-ful h-full object-cover" field={slice.primary.image_3} />
		</div>
	</div>
</section>
