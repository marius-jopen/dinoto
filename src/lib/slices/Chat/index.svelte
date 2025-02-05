<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicText } from "@prismicio/svelte";

	export let slice: Content.ChatSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

    let currentVideo = 1;
</script>

<section class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="flex-col md:flex-row flex gap-8">
		<div class="md:w-1/2 flex flex-col justify-center">
			<div class="hidden md:block" data-aos="fade-up">
				{#each slice.primary.items as item, index}
					<div class="transition-all duration-300 overflow-hidden"
						class:opacity-0={index + 1 !== currentVideo}
						class:pointer-events-none={index + 1 !== currentVideo}
						class:absolute={index + 1 !== currentVideo}
						class:h-0={index + 1 !== currentVideo}
						class:h-auto={index + 1 === currentVideo}
					>
						{#if item.video_mpg4.url && item.video_webm.url}
							<div class="flex justify-center w-full scale-[1.5]">
								<video width="600" height="100%" poster={item.video_poster.url} autoplay loop muted playsinline>
									<source 
									src={item.video_mpg4.url} 
									type='video/mp4; codecs="hvc1"'>
									<source 
									src={item.video_webm.url} 
									type="video/webm">
								</video>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="block md:hidden">
				{#if slice.primary.items[0].video_mpg4.url && slice.primary.items[0].video_webm.url}
					<div class="flex justify-center w-full scale-[1.5]">
						<video width="600" height="100%" poster={slice.primary.items[0].video_poster.url} autoplay loop muted playsinline>
							<source 
							src={slice.primary.items[0].video_mpg4.url} 
							type='video/mp4; codecs="hvc1"'>
							<source 
							src={slice.primary.items[0].video_webm.url} 
							type="video/webm">
						</video>
					</div>
				{/if}
			</div>
		</div>
		
		<div class="md:w-2/3 flex flex-col justify-end gap-y-4">
			{#each slice.primary.items as item, index}
				<h2 
					data-aos="fade-up" 
					class="text-d_gray hover:text-d_lightGreen py-6"
					on:mouseenter={() => currentVideo = index + 1}
					on:mouseleave={() => currentVideo = 1}
				>
					<PrismicText field={item.text} />
				</h2>
			{/each}
		</div>
	</div>
</section>
