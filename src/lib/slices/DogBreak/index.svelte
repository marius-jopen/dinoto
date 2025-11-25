<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";
    import { onMount } from 'svelte';

	export let slice: Content.DogBreakSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

    let videoElement: HTMLVideoElement;
    let hlsInstance: any = null;

    // Check if URL is HLS
    $: isHls = slice.primary.video_mpg4?.url && slice.primary.video_mpg4.url.includes('.m3u8');

    // Initialize HLS
    const initHls = async (videoEl: HTMLVideoElement, url: string) => {
        const { default: Hls } = await import('hls.js');
        
        if (Hls.isSupported()) {
            hlsInstance = new Hls({
                autoStartLoad: true,
                capLevelToPlayerSize: true,
                maxBufferLength: 30,
                enableWorker: true,
            });
            
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(videoEl);
            
            hlsInstance.on(Hls.Events.ERROR, (event: any, data: any) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            hlsInstance.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hlsInstance.recoverMediaError();
                            break;
                        default:
                            hlsInstance.destroy();
                            break;
                    }
                }
            });
        } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
            videoEl.src = url;
        }
    };

    onMount(() => {
        if (videoElement && isHls && slice.primary.video_mpg4?.url) {
            initHls(videoElement, slice.primary.video_mpg4.url);
        }

        return () => {
            if (hlsInstance) hlsInstance.destroy();
        };
    });
</script>

<section class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
    <div data-aos="fade-up"  class="relative mb-[200px]">
        <div class="text-center md:w-[70%] mx-8 md:mx-[15%]">
            <PrismicRichText field={slice.primary.text} />
        </div>
    
        {#if slice.primary.video_mpg4.url && slice.primary.video_webm.url}
            <div class="flex justify-center absolute bottom-0 left-0 w-full mb-[-300px] scale-[1.5]">
                <video bind:this={videoElement} width="600" height="100%" poster={slice.primary.video_poster.url} autoplay loop muted playsinline>
                    {#if !isHls}
                        <source 
                        src={slice.primary.video_mpg4.url} 
                        type='video/mp4; codecs="hvc1"'>
                        <source 
                        src={slice.primary.video_webm.url} 
                        type="video/webm">
                    {/if}
                </video>
            </div>
        {/if}
    </div>
</section>
