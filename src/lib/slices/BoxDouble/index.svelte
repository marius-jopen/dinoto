<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { backgroundColor } from '../../components/color-styles';
	import { PrismicRichText, PrismicImage } from "@prismicio/svelte";

	export let slice: Content.BoxDoubleSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
	let styleClassLeft
	let styleClassRight
	
	$: styleClassLeft = backgroundColor(slice.primary.color_left);
	$: styleClassRight = backgroundColor(slice.primary.color_right);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="flex gap-8">
		<div class="rounded-3xl overflow-hidden {styleClassLeft}">
			{#if slice.primary.headline_left}
				<h2 class="pt-4 px-4">
					{slice.primary.headline_left}
				</h2>
			{/if}

			{#if slice.primary.text_left && slice.primary.text_left.length > 0}
				<div class="px-4 pt-4 pb-4">
					<PrismicRichText field={slice.primary.text_left} />
				</div>
			{/if}

			<PrismicImage class="w-full h-full object-cover" field={slice.primary.image_left} />
		</div>

		<div class="rounded-3xl overflow-hidden {styleClassRight}">
			{#if slice.primary.headline_right}
				<h2 class="pt-4 px-4">
					{slice.primary.headline_right}
				</h2>
			{/if}

			{#if slice.primary.text_right && slice.primary.text_right.length > 0}
				<div class="px-4 pt-4 pb-4">
					<PrismicRichText field={slice.primary.text_right} />
				</div>
			{/if}

			<PrismicImage class="w-ful h-full object-cover" field={slice.primary.image_right} />
		</div>
	</div>
</section>
