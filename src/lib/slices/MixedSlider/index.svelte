<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import { backgroundColor, textColor } from '../../components/color-styles';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/helpers';

	export let slice: Content.MixedSliderSlice;

	let videoElements: HTMLVideoElement[] = [];
	let mobileVideoElements: HTMLVideoElement[] = [];
	let hlsInstances: any[] = [];

	// Check if URL is HLS
	const isHls = (url: string) => url && url.includes('.m3u8');

	// Initialize HLS for a video element
	const initHls = async (videoEl: HTMLVideoElement, url: string): Promise<any> => {
		const { default: Hls } = await import('hls.js');
		
		if (Hls.isSupported()) {
			const hls = new Hls({
				autoStartLoad: true,
				capLevelToPlayerSize: true,
				maxBufferLength: 30,
				enableWorker: true,
			});
			
			hls.loadSource(url);
			hls.attachMedia(videoEl);
			
			hls.on(Hls.Events.ERROR, (event: any, data: any) => {
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							hls.startLoad();
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							hls.recoverMediaError();
							break;
						default:
							hls.destroy();
							break;
					}
				}
			});
			
			return hls;
		} else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
			videoEl.src = url;
		}
		return null;
	};

	let distanceTop = getDistanceTop(slice.primary.distance_top);
	let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	let slider: any; // Will hold the Splide component instance

	let splideOptions = {
		arrows: true,
		pagination: false,
		perPage: 2,
		perMove: 1,
		pauseOnHover: false,
		rewind: false,
		type: 'loop',
		start: 0,
	};

	// Use loop by default, but avoid visual duplication when there are too few items
	// Splide needs more slides than `perPage` to loop without duplicating the first slide in view
	let effectiveOptions = splideOptions;

	// Rotate items so the original first item is rendered last when enough slides
	let rotatedItems: Content.MixedSliderSliceDefaultPrimaryItemsItem[] = [];

	let height = "h-[100%]";

	let currentSlideIndex = 0; // Tracks the current active slide index
	let splideInstance: any; // Will hold the actual Splide instance
	let eventListenerAttached = false;

	// Build a content signature to detect duplicates (keeps first occurrence only)
	const createItemSignature = (item: Content.MixedSliderSliceDefaultPrimaryItemsItem) => {
		const video = typeof item.video === 'string' ? item.video.trim() : '';
		const image = item.image && item.image.url ? item.image.url : '';
		const imageHover = item.image_hover && item.image_hover.url ? item.image_hover.url : '';
		const text = typeof item.text === 'string' ? item.text.trim() : '';
		const color = typeof item.color === 'string' ? item.color : '';
		return [video, image, imageHover, text, color].join('|');
	};

	// Unique items array prevents the same content from appearing twice
	const uniqueItems: Content.MixedSliderSliceDefaultPrimaryItemsItem[] = (() => {
		const seen = new Set<string>();
		const result: Content.MixedSliderSliceDefaultPrimaryItemsItem[] = [];
		for (const item of slice.primary.items) {
			const sig = createItemSignature(item);
			if (!seen.has(sig)) {
				seen.add(sig);
				result.push(item);
			}
		}
		return result;
	})();

	// Quick-and-dirty: repeat items 4x to make the loop feel richer
	const repeatedItems: Content.MixedSliderSliceDefaultPrimaryItemsItem[] = [
		...uniqueItems,
		...uniqueItems,
		...uniqueItems,
		...uniqueItems
	];

	// Keep original order: first array item should be first visible
	rotatedItems = uniqueItems;

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

		// Initialize HLS for desktop videos
		repeatedItems.forEach((item, index) => {
			const videoUrl = typeof item.video === 'string' ? item.video.trim() : '';
			const videoEl = videoElements[index];
			if (videoEl && videoUrl && isHls(videoUrl)) {
				initHls(videoEl, videoUrl).then((hls) => {
					if (hls) hlsInstances.push(hls);
				});
			}
		});

		// Initialize HLS for mobile videos
		uniqueItems.forEach((item, index) => {
			const videoUrl = typeof item.video === 'string' ? item.video.trim() : '';
			const videoEl = mobileVideoElements[index];
			if (videoEl && videoUrl && isHls(videoUrl)) {
				initHls(videoEl, videoUrl).then((hls) => {
					if (hls) hlsInstances.push(hls);
				});
			}
		});

		return () => {
			hlsInstances.forEach(hls => hls?.destroy());
		};
	});

</script>

<section class="hidden md:block {distanceTop} {distanceBottom}">
	<Splide
		class="{height}"
		options={effectiveOptions}
		bind:this={slider}
		aria-label="Mixed Content Slider"
	>
		{#each repeatedItems as item, index}
			<SplideSlide>
				<div class="w-full box {height}">
					<div class="mr-6 h-full">
					<div 
						class="group relative w-full h-full rounded-3xl overflow-hidden {backgroundColor(item.color)}"
						style="color: {textColor(item.color)};"
					>
						{#if item && item.video && typeof item.video === 'string' && item.video.trim()}
								<video 
									bind:this={videoElements[index]}
									class="w-full h-full object-cover" 
									autoplay 
									muted 
									loop 
									playsinline
									controls
								>
									{#if !isHls(item.video)}
										<source src={item.video} type="video/mp4">
									{/if}
									Your browser does not support the video tag.
								</video>
						{:else if item && item.image && item.image.url && item.text && typeof item.text === 'string' && item.text.trim()}
							<!-- Image background with text overlay (and optional hover image) -->
							<div class="relative w-full h-full">
								<img 
									src={item.image.url} 
									alt={item.image.alt || ''} 
									class="w-full h-full object-cover {item.image_hover && item.image_hover.url ? 'transition-opacity duration-300 group-hover:opacity-0' : ''}"
								/>
								{#if item.image_hover && item.image_hover.url}
									<img 
										src={item.image_hover.url} 
										alt={item.image_hover.alt || ''} 
										class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									/>
								{/if}
								<div class="absolute inset-0 w-full h-full flex flex-col justify-center py-3 px-8">
									<div class="pb-10 pt-2">
										<h2 class="text-2xl text-center md:text-3xl lg:text-4xl font-bold leading-tight text-white">
											{item.text}
										</h2>
									</div>
								</div>
							</div>
						{:else if item && item.image && item.image.url && item.image_hover && item.image_hover.url}
							<!-- Image with hover effect -->
							<div class="relative w-full h-full">
								<img 
									src={item.image.url} 
									alt={item.image.alt || ''} 
									class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
								/>
								<img 
									src={item.image_hover.url} 
									alt={item.image_hover.alt || ''} 
									class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								/>
							</div>
							{:else if item && item.image && item.image.url}
								<!-- Image only -->
								<img 
									src={item.image.url} 
									alt={item.image.alt || ''} 
									class="w-full h-full object-cover"
								/>
							{:else if item && item.text && typeof item.text === 'string' && item.text.trim()}
								<!-- Text content styled like Cards component -->
								<div class="w-full h-full flex flex-col justify-center py-3 px-8">
									<div class="pb-10 pt-2">
										<h2 class="text-2xl text-center md:text-3xl lg:text-4xl font-bold leading-tight text-white">
											{item.text}
										</h2>
									</div>
								</div>
						{:else}
							<!-- Fallback for empty items -->
							<div class="w-full h-full bg-gray-100 flex items-center justify-center">
								<p class="text-gray-400">No content</p>
							</div>
						{/if}
						{#if isFilled.link(item.link) && item.image && item.image.url}
							<PrismicLink field={item.link} class="absolute inset-0 z-10" />
						{/if}
					</div>
				</div>
			</div>
		</SplideSlide>
		{/each}
	</Splide>
</section>

<section class="box md:hidden {distanceTop} {distanceBottom}">
	{#each uniqueItems as item, index}
		<div data-aos="fade-up" class="w-full {height}">
			<div class="mb-6 h-full">
				<div 
					class="group relative w-full h-full rounded-lg overflow-hidden {backgroundColor(item.color)}"
					style="color: {textColor(item.color)};"
				>
					{#if item && item.video && typeof item.video === 'string' && item.video.trim()}
						<video 
							bind:this={mobileVideoElements[index]}
							class="w-full h-full object-cover" 
							autoplay 
							muted 
							loop 
							playsinline
							controls
						>
							{#if !isHls(item.video)}
								<source src={item.video} type="video/mp4">
							{/if}
							Your browser does not support the video tag.
						</video>
					{:else if item && item.image && item.image.url && item.text && typeof item.text === 'string' && item.text.trim()}
						<!-- Image background with text overlay (and optional hover image) -->
						<div class="relative w-full h-full">
							<img 
								src={item.image.url} 
								alt={item.image.alt || ''} 
								class="w-full h-full object-cover {item.image_hover && item.image_hover.url ? 'transition-opacity duration-300 group-hover:opacity-0' : ''}"
							/>
							{#if item.image_hover && item.image_hover.url}
								<img 
									src={item.image_hover.url} 
									alt={item.image_hover.alt || ''} 
									class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								/>
							{/if}
							<div class="absolute inset-0 w-full h-full flex flex-col justify-center py-3 px-8">
								<div class="pb-4 pt-4">
									<h2 class="text-2xl md:text-3xl lg:text-4xl text-center font-bold leading-tight text-white">
										{item.text}
									</h2>
								</div>
							</div>
						</div>
					{:else if item && item.image && item.image.url && item.image_hover && item.image_hover.url}
						<!-- Image with hover effect -->
						<div class="relative w-full h-full">
							<img 
								src={item.image.url} 
								alt={item.image.alt || ''} 
								class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
							/>
							<img 
								src={item.image_hover.url} 
								alt={item.image_hover.alt || ''} 
								class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							/>
						</div>
					{:else if item && item.image && item.image.url}
						<!-- Image only -->
						<img 
							src={item.image.url} 
							alt={item.image.alt || ''} 
							class="w-full h-full object-cover"
						/>
					{:else if item && item.text && typeof item.text === 'string' && item.text.trim()}
						<!-- Text content styled like Cards component -->
						<div class="w-full h-full flex flex-col justify-center py-3 px-8">
							<div class="pb-4 pt-4">
								<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white text-center">
									{item.text}
								</h2>
							</div>
						</div>
					{:else}
						<!-- Fallback for empty items -->
						<div class="w-full h-full bg-gray-100 flex items-center justify-center">
							<p class="text-gray-400">No content</p>
						</div>
					{/if}
					{#if isFilled.link(item.link) && item.image && item.image.url}
						<PrismicLink field={item.link} class="absolute inset-0 z-10" />
					{/if}
				</div>
			</div>
		</div>
	{/each}
</section>
