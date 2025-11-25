<script lang="ts">
	import { onMount } from "svelte";

    export let data: any;
    export let index: number;
    export let time: number;
    export let status: boolean;
    export let type: string;
    export let list: boolean; // Added list flag

    let welcomeVideoElement: HTMLVideoElement;
    let previewVideoElement: HTMLVideoElement;
    let resetTimeout: any; // Store the timeout reference
    let hlsInstanceWelcome: any = null;
    let hlsInstancePreview: any = null;

    if (type === "welcome") {
        data = data.data.items[0];
    }

    // Detect if URL is HLS
    $: isHls = data?.video_url && data.video_url.includes('.m3u8');

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
            // Native HLS support (Safari)
            videoEl.src = url;
        }
        return null;
    };

    // Correct onMount usage to autoplay the welcome video
    onMount(() => {
        if (welcomeVideoElement && type === "welcome") {
            if (isHls && data?.video_url) {
                initHls(welcomeVideoElement, data.video_url).then((hls) => {
                    hlsInstanceWelcome = hls;
                    welcomeVideoElement.play();
                });
            } else {
                welcomeVideoElement.play();
            }
        }

        if (previewVideoElement && type === "preview" && isHls && data?.video_url) {
            initHls(previewVideoElement, data.video_url).then((hls) => {
                hlsInstancePreview = hls;
            });
        }

        return () => {
            if (hlsInstanceWelcome) hlsInstanceWelcome.destroy();
            if (hlsInstancePreview) hlsInstancePreview.destroy();
        };
    });

    // Reactively control the video playback and reset it on status or list change
    $: {
        // For the "welcome" video
        if ((status || list) && welcomeVideoElement && type === "welcome") {
            clearTimeout(resetTimeout); // Clear any previous reset timeout
            welcomeVideoElement.currentTime = 0; // Reset video to the beginning
            welcomeVideoElement.play(); // Play the video when status is true or list is true
        } else if (welcomeVideoElement && type === "welcome") {
            resetTimeout = setTimeout(() => {
                welcomeVideoElement.pause(); // Pause the video
                welcomeVideoElement.currentTime = 0; // Reset video to the beginning after 1 second
            }, 1000);
        }

        // For the "preview" video
        if ((status || list) && previewVideoElement && type === "preview") {
            clearTimeout(resetTimeout); // Clear any previous reset timeout
            previewVideoElement.currentTime = 0; // Reset video to the beginning
            previewVideoElement.play(); // Play the video when status or list is true
        } else if (previewVideoElement && type === "preview") {
            previewVideoElement.pause(); // Pause the video
        }
    }

    // Function to handle mouse hover for preview video
    function handleMouseEnter() {
        if (type === "preview" && previewVideoElement) {
            clearTimeout(resetTimeout); // Clear any previous reset timeout
            previewVideoElement.play(); // Play video on hover
        }
    }

    function handleMouseLeave() {
        if (type === "preview" && previewVideoElement) {
            previewVideoElement.pause(); // Pause video on mouse leave
        }
    }
</script>

<!-- Render the welcome video with autoplay -->
{#if type === "welcome" && data.video_url}
    <div>
        <video
            bind:this={welcomeVideoElement}
            class="{type == 'welcome' ? 'aspect-square md:aspect-video' : 'aspect-video'}  object-cover w-full"
            poster={data.video_poster.url}
            src={isHls ? undefined : data.video_url}
            muted
            loop
            playsinline
        />
    </div>
{/if}

<!-- Render the preview video controlled by mouse hover or autoplay if list is true -->
{#if type === "preview" && data.video_url}
    <div>
        <video
            bind:this={previewVideoElement}
            class="{type == 'welcome' ? 'aspect-square md:aspect-video' : 'aspect-video'}  object-cover w-full"
            poster={data.video_poster.url}
            src={isHls ? undefined : data.video_url}
            muted
            loop
            playsinline
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}
        />
    </div>
{/if}
