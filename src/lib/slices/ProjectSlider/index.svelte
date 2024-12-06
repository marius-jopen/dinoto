<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';
	import ProjectItem from '$lib/components/project-item.svelte';
	import { workStore } from '$lib/stores';
	import { get } from 'svelte/store';

	export let slice: Content.ProjectSliderSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	let slider; // Will hold the Splide component instance

	let splideOptions = {
		rewind: true,
		arrows: true,
		pagination: false,
		perPage: 2.2,
		perMove: 1,
		pauseOnHover: false,
		type: 'loop',
	};

	let height = "h-[100%]";

	let currentSlideIndex = 0; // Tracks the current active slide index
	let splideInstance; // Will hold the actual Splide instance
	let eventListenerAttached = false;
	let work = get(workStore);

	console.log("WORK");
	console.log(work);

	function getProjectById(id) {
		return work.find(project => project.id === id);
	}

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

<section data-aos="fade-up" class="hidden md:block {distanceTop} {distanceBottom}">
	<Splide
		class="{height}"
		options={splideOptions}
		bind:this={slider}
		aria-label="Slider"
		>
			{#each slice.primary.items as item, index}
				<SplideSlide>
					<div class="w-full box {height}">
						<div class="mr-6">
							<ProjectItem cloud={false} list={true} data={getProjectById(item.project.id)} />
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
</section>

<section data-aos="fade-up" class="box md:hidden {distanceTop} {distanceBottom}">
	{#each slice.primary.items as item, index}
		<div class="w-full {height}">
			<div class="mb-6">
				<ProjectItem cloud={false} list={true} data={getProjectById(item.project.id)} />
			</div>
		</div>
	{/each}
</section>
