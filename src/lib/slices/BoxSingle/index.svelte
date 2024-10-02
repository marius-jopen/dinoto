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
	<div class="{styleClass} rounded-2xl md:rounded-3xl">
		<div class="flex relative pt-6 pb-10">
			<h3 class="md:absolute pl-8">
				{slice.primary.number}
			</h3>
			
			<h3 class="ml-8 md:ml-[35%] w-full md:w-[65%] text-right md:text-left mr-8 md:mr-0 ">
				{slice.primary.headline}
			</h3>
		</div>

		<div class="md:ml-[35%] md:w-[65%] pb-10 pr-8 pl-8 md:pl-0">
			<PrismicRichText field={slice.primary.text} />
		</div>
	</div>
</section>
