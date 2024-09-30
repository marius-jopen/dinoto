<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import Video from '../../components/video.svelte';

	export let slice: Content.VideoGallerySlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<div class="flex gap-8">
		{#each slice.primary.items as item}
			<div class="rounded-3xl overflow-hidden">
				<Video
					videoPoster={item.video_poster.url}
					videoUrl={item.video_url}
					autoplay={item.autoplay}
					status={false}
				/>
			</div>
		{/each}
	</div>
</section>
