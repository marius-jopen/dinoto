<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicText } from "@prismicio/svelte";
    import { onMount } from 'svelte';

	export let slice: Content.ChatSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

    let currentVideo = 1;
    let videoElements: HTMLVideoElement[] = [];
    let mobileVideoElement: HTMLVideoElement;
    let hlsInstances: any[] = [];

    // Check if a URL is HLS
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

    onMount(() => {
        // Initialize HLS for desktop videos
        slice.primary.items.forEach((item, index) => {
            const videoEl = videoElements[index];
            const videoUrl = item.video_mpg4?.url;
            if (videoEl && videoUrl && isHls(videoUrl)) {
                initHls(videoEl, videoUrl).then((hls) => {
                    if (hls) hlsInstances.push(hls);
                });
            }
        });

        // Initialize HLS for mobile video
        const mobileVideoUrl = slice.primary.items[0]?.video_mpg4?.url;
        if (mobileVideoElement && mobileVideoUrl && isHls(mobileVideoUrl)) {
            initHls(mobileVideoElement, mobileVideoUrl).then((hls) => {
                if (hls) hlsInstances.push(hls);
            });
        }

        return () => {
            hlsInstances.forEach(hls => hls?.destroy());
        };
    });
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
								<video bind:this={videoElements[index]} width="600" height="100%" poster={item.video_poster.url} autoplay loop muted playsinline>
									{#if !isHls(item.video_mpg4.url)}
										<source 
										src={item.video_mpg4.url} 
										type='video/mp4; codecs="hvc1"'>
										<source 
										src={item.video_webm.url} 
										type="video/webm">
									{/if}
								</video>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="block md:hidden">
				{#if slice.primary.items[0].video_mpg4.url && slice.primary.items[0].video_webm.url}
					<div class="flex justify-center w-full scale-[1.5]">
						<video bind:this={mobileVideoElement} width="600" height="100%" poster={slice.primary.items[0].video_poster.url} autoplay loop muted playsinline>
							{#if !isHls(slice.primary.items[0].video_mpg4.url)}
								<source 
								src={slice.primary.items[0].video_mpg4.url} 
								type='video/mp4; codecs="hvc1"'>
								<source 
								src={slice.primary.items[0].video_webm.url} 
								type="video/webm">
							{/if}
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
