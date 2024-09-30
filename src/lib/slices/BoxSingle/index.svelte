<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";
    import { backgroundColor } from '../../components/color-styles';

	export let slice: Content.BoxSingleSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
	let styleClass
	
	$: styleClass = backgroundColor(slice.primary.color);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="{styleClass} rounded-3xl">
		<div class="flex relative pt-4 pb-10">
			<h2 class="absolute pl-8">
				{slice.primary.number}
			</h2>
			
			<h2 class="ml-[35%] w-[65%]">
				{slice.primary.headline}
			</h2>
		</div>

		<div class="ml-[35%] w-[65%] pb-10 pr-8">
			<PrismicRichText field={slice.primary.text} />
		</div>
	</div>
</section>
