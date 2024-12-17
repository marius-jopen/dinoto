<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';
    import { PrismicLink, PrismicImage } from "@prismicio/svelte";

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
			options={splideOptions}
			bind:this={slider}
			aria-label="Slider"
		>
			{#each slice.primary.items as item, index}
				<SplideSlide>
					<div class="w-full flex-col-reverse md:flex-row flex gap-12 md:h-full">
						<div class="md:w-1/2 flex flex-col justify-center">
							
							{#if item.text}
								<div class="text-center mx-auto w-10/12 md:w-2/3 md:mt-8">
									{item.text}
								</div>
							{/if}

							<div class="flex gap-8 mt-12 justify-center">
								<button
									class="prev-button"
									on:click={() => splideInstance?.go('<')}
									aria-label="Previous slide"
								>
									
									<svg class="mt-2 md:mt-0 h-6 md:h-10 w-auto rotate-90" viewBox="0 0 61 69" fill="var(--d-darkGray)" xmlns="http://www.w3.org/2000/svg">
										<path d="M26.08 3.47C25.93 1.13 28.27 0 30.08 0C31.89 0 34.08 1.06 34.08 3.39L31.06 59.71C34.98 52.17 46.89 34 54.28 34C58.35 34 60.16 37.92 60.16 40.86C41.99 45.54 33.09 60.01 30.23 68.38H29.93C27.14 60.01 18.24 45.54 0 40.86C0 37.92 1.89 34 5.96 34C13.35 34 25.26 52.17 29.18 59.71L26.08 3.47Z" fill="var(--d-darkGray)"/>
									</svg>
								</button>

								<button
									class="next-button"
									on:click={() => splideInstance?.go('>')}
									aria-label="Next slide"
								>
									<svg class="mt-2 md:mt-0 h-6 md:h-10 w-auto -rotate-90" viewBox="0 0 61 69" fill="var(--d-darkGray)" xmlns="http://www.w3.org/2000/svg">
										<path d="M26.08 3.47C25.93 1.13 28.27 0 30.08 0C31.89 0 34.08 1.06 34.08 3.39L31.06 59.71C34.98 52.17 46.89 34 54.28 34C58.35 34 60.16 37.92 60.16 40.86C41.99 45.54 33.09 60.01 30.23 68.38H29.93C27.14 60.01 18.24 45.54 0 40.86C0 37.92 1.89 34 5.96 34C13.35 34 25.26 52.17 29.18 59.71L26.08 3.47Z" fill="var(--d-darkGray)"/>
									</svg>
								</button>
							</div>
						</div>
						
						<div class="md:w-1/2 flex justify-center items-center">
							<PrismicLink field={item.link} >
								<PrismicImage class="rounded-2xl md:h-[300px] md:h-[400px] w-auto object-cover" field={item.image} />
							</PrismicLink>
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>

	<!-- Add custom navigation buttons -->
	<!-- <div class="custom-navigation">
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
	</div> -->
</section>

<style>
	.custom-navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}
</style>