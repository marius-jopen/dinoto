<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import Video from '../../components/video.svelte';
	import { PrismicImage } from "@prismicio/svelte";
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	export let slice: Content.SliderSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
	let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
	let slider;

	let splideOptions = {
		rewind: true,
		arrows: true,
		pagination: true,
		pauseOnHover: false,
		type: 'loop',
	};

	let height = "h-[50vw]";
</script>

<section class="{distanceTop} {distanceBottom}">
	<div>
		<Splide
			class="{height}"
			options={splideOptions}
			bind:this={slider}
			aria-label="..."
		>
			{#each slice.primary.items as item, index}
				<SplideSlide>
					<div class="{height}">
						{#if item.image.url}
							<PrismicImage class="h-full w-full object-cover" field={item.image} />
						{:else if item.video_url}
							<!-- <Video
								videoPoster={item.video_poster.url}
								videoUrl={item.video_url}
								autoplay={item.autoplay}
								status={false}
							/> -->
						{/if}
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</section>
