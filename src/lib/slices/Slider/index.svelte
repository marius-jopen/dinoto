<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import Video from '../../components/video.svelte';
	import { PrismicImage } from "@prismicio/svelte";
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let slice: Content.SliderSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
	let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
	let slider; // Will hold the Splide component instance

	let splideOptions = {
		rewind: true,
		arrows: true,
		pagination: true,
		pauseOnHover: false,
		type: 'loop', // Keep loop type for continuous sliding
	};

	let height = "h-[50vw]";

	let currentSlideIndex = 0; // Tracks the current active slide index
	let splideInstance; // Will hold the actual Splide instance
	let eventListenerAttached = false;

	// Function to update the current slide index
	const updateCurrentSlideIndex = () => {
		if (splideInstance) {
			// Use getIndex to get the actual active slide index
			currentSlideIndex = splideInstance.Components.Controller.getIndex();
		}
	};

	// Wait for the component to mount and the Splide instance to be available
	onMount(() => {
		// Wait for the next tick to ensure slider.splide is available
		setTimeout(() => {
			if (slider && slider.splide) {
				splideInstance = slider.splide;

				// Get the initial index
				updateCurrentSlideIndex();

				// Attach the event listener only once
				if (!eventListenerAttached) {
					eventListenerAttached = true;

					splideInstance.on('move', () => {
						updateCurrentSlideIndex();
					});
				}
			}
		});
	});
</script>

<section class="{distanceTop} {distanceBottom}">
	<div>
		<Splide
			class="{height}"
			options={splideOptions}
			bind:this={slider}
			aria-label="Slider"
		>
			{#each slice.primary.items as item, index}
				<SplideSlide>
					<!-- Display if the current slide is active -->
					<!-- <p>Is Active: {currentSlideIndex === index ? true : false}</p>
					<p>Current Slide Index: {currentSlideIndex}</p>
					<p>Current Loop Index: {index}</p>
					<p>Autoplay:{item.autoplay}</p> -->

					<div class="{height}">
						{#if item.image.url}
							<PrismicImage class="h-full w-full object-cover" field={item.image} />
						{:else if item.video_url}	
							{#if currentSlideIndex === index}						
								<Video
									videoPoster={item.video_poster.url}
									videoUrl={item.video_url}
									autoplay={item.autoplay ? true : false}
									status={currentSlideIndex === index ? true : false}
								/>
							{/if}
						{/if}
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</section>
