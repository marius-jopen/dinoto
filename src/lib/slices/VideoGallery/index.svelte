<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import Video from '../../components/video.svelte';

	export let slice: Content.VideoGallerySlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="flex-col md:flex-row flex gap-8 {!slice.primary.full && 'justify-center'}">
		{#each slice.primary.items as item}
			<div data-aos="fade-up" class="{!slice.primary.full && 'w-1/3'} rounded-2xl md:rounded-3xl overflow-hidden">
				<Video
					videoPoster={item.video_poster.url}
					videoUrl={item.video_url}
					autoplay={item.autoplay}
					status={item.autoplay}
				/>
			</div>
		{/each}
	</div>
</section>
