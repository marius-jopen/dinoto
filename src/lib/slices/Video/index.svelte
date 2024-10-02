<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";
    import Video from '../../components/video.svelte';

	export let slice: Content.VideoSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="{slice.primary.style == 'Full Screen' ? '' : 'box'} {distanceTop} {distanceBottom}">
	<div class="{slice.primary.style == 'Inline' ? 'ml-[25%] w-[75%]' : 'w-full'} relative">
		<div class="{slice.primary.style == 'Full Screen' ? '' : 'rounded-2xl md:rounded-3xl overflow-hidden'}">			
			<Video
				videoPoster={slice.primary.video_poster.url}
				videoUrl={slice.primary.video_url}
				autoplay={slice.primary.autoplay}
				status={slice.primary.autoplay}
			/>
		</div>

		<div class="text-center pt-2 text-d_darkGray">
			<PrismicRichText field={slice.primary.caption} />
		</div>
	</div>
</section>
