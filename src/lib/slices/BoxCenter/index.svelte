<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";
	import { backgroundColor } from '../../components/color-styles';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.BoxCenterSlice;

	let styleClass
	$: styleClass = backgroundColor(slice.primary.color);

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box flex justify-center {distanceTop} {distanceBottom}">
	<div class="{styleClass} w-4/12 py-8 px-8 rounded-3xl relative">
		<PrismicRichText field={slice.primary.text} />

		<div class="bg-d_white w-12 h-12 text-center pt-3 rounded-full absolute right-[10%] mt-2">
			{slice.primary.emoji}
		</div>
	</div>
</section>