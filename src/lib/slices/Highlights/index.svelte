<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let slice: Content.HighlightsSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	let slider; // Will hold the Splide component instance

	let splideOptions = {
		rewind: true,
		arrows: false,
		pagination: false,
		pauseOnHover: false,
		type: 'fade', // Keep loop type for continuous sliding
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

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<Splide
			class="{height}"
			options={splideOptions}
			bind:this={slider}
			aria-label="Slider"
		>
			{#each slice.primary.items as item, index}
				<SplideSlide>
					<div class="bg-red-200 w-full {height}">
						HIGHLIGHTS SLIDERITEM {index}
					</div>
				</SplideSlide>
			{/each}
		</Splide>

	<!-- Add custom navigation buttons -->
	<div class="custom-navigation">
		<button
			class="prev-button"
			on:click={() => splideInstance?.go('<')}
			aria-label="Previous slide"
		>
			Prev
		</button>
		<button
			class="next-button"
			on:click={() => splideInstance?.go('>')}
			aria-label="Next slide"
		>
			Next
		</button>
	</div>
</section>

<style>
	.custom-navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}

	.prev-button,
	.next-button {
		padding: 0.5rem 1rem;
		background: #333;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 4px;
	}

	.prev-button:hover,
	.next-button:hover {
		background: #555;
	}
</style>