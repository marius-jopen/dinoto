<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { backgroundColor, textColor } from '../../components/color-styles';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let slice: Content.MixedSliderSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
	let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	let slider: any; // Will hold the Splide component instance

	let splideOptions = {
		arrows: true,
		pagination: false,
		perPage: 3,
		perMove: 1,
		pauseOnHover: false,
		type: 'loop',
	};

	let height = "h-[100%]";

	let currentSlideIndex = 0; // Tracks the current active slide index
	let splideInstance: any; // Will hold the actual Splide instance
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

	// Function to render content based on item type
	function renderContent(item: Content.MixedSliderSliceDefaultPrimaryItemsItem) {
		if (item.video && item.video.trim()) {
			// Video content
			return {
				type: 'video',
				content: item.video
			};
		} else if (item.image && item.image.url) {
			// Image content with optional hover effect
			return {
				type: 'image',
				image: item.image,
				imageHover: item.image_hover
			};
		} else if (item.text && item.text.trim()) {
			// Text content
			return {
				type: 'text',
				content: item.text
			};
		}
		
		// Fallback for empty items
		return {
			type: 'empty'
		};
	}
</script>

<section class="hidden md:block {distanceTop} {distanceBottom}">
	<Splide
		class="{height}"
		options={splideOptions}
		bind:this={slider}
		aria-label="Mixed Content Slider"
	>
		{#each slice.primary.items as item, index}
			{@const content = renderContent(item)}
			<SplideSlide>
				<div data-aos="fade-up" class="w-full box {height}">
					<div class="mr-6 h-full">
						<div 
							class="w-full h-full rounded-3xl overflow-hidden {backgroundColor(item.color)}"
							style="color: {textColor(item.color)};"
						>
							{#if content.type === 'video'}
								<video 
									class="w-full h-full object-cover" 
									autoplay 
									muted 
									loop 
									playsinline
									controls
								>
									<source src={content.content} type="video/mp4">
									Your browser does not support the video tag.
								</video>
							{:else if content.type === 'image' && content.image}
								{#if content.imageHover && content.imageHover.url}
									<!-- Image with hover effect -->
									<div class="relative w-full h-full group">
										<img 
											src={content.image.url} 
											alt={content.image.alt || ''} 
											class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
										/>
										<img 
											src={content.imageHover.url} 
											alt={content.imageHover.alt || ''} 
											class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										/>
									</div>
								{:else}
									<!-- Image only -->
									<img 
										src={content.image.url} 
										alt={content.image.alt || ''} 
										class="w-full h-full object-cover"
									/>
								{/if}
							{:else if content.type === 'text'}
								<!-- Text content styled like Cards component -->
								<div class="w-full h-full flex flex-col justify-center py-3 px-8">
									<div class="pb-10 pt-2">
										<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
											{content.content}
										</h2>
									</div>
								</div>
							{:else}
								<!-- Fallback for empty items -->
								<div class="w-full h-full bg-gray-100 flex items-center justify-center">
									<p class="text-gray-400">No content</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
</section>

<section class="box md:hidden {distanceTop} {distanceBottom}">
	{#each slice.primary.items as item, index}
		{@const content = renderContent(item)}
		<div data-aos="fade-up" class="w-full {height}">
			<div class="mb-6 h-full">
				<div 
					class="w-full h-full rounded-lg overflow-hidden {backgroundColor(item.color)}"
					style="color: {textColor(item.color)};"
				>
					{#if content.type === 'video'}
						<video 
							class="w-full h-full object-cover" 
							autoplay 
							muted 
							loop 
							playsinline
							controls
						>
							<source src={content.content} type="video/mp4">
							Your browser does not support the video tag.
						</video>
					{:else if content.type === 'image' && content.image}
						{#if content.imageHover && content.imageHover.url}
							<!-- Image with hover effect -->
							<div class="relative w-full h-full group">
								<img 
									src={content.image.url} 
									alt={content.image.alt || ''} 
									class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
								/>
								<img 
									src={content.imageHover.url} 
									alt={content.imageHover.alt || ''} 
									class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								/>
							</div>
						{:else}
							<!-- Image only -->
							<img 
								src={content.image.url} 
								alt={content.image.alt || ''} 
								class="w-full h-full object-cover"
							/>
						{/if}
					{:else if content.type === 'text'}
						<!-- Text content styled like Cards component -->
						<div class="w-full h-full flex flex-col justify-center py-3 px-8">
							<div class="pb-10 pt-2">
								<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
									{content.content}
								</h2>
							</div>
						</div>
					{:else}
						<!-- Fallback for empty items -->
						<div class="w-full h-full bg-gray-100 flex items-center justify-center">
							<p class="text-gray-400">No content</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</section>
