<script>
    import { onMount } from 'svelte';
    import VideoComponent from '../components/video.svelte'; // Import the VideoComponent
	import Caption from "./caption.svelte";

    export let data;
    export let status = false;
    export let aos = 0

    // On mount, ensure video is paused to prevent autoplay
    onMount(() => {
        // You can handle any initial logic here if needed
    });
</script>

{#if data.video_url}
    <div data-aos="fade-up" data-aos-delay={aos} class="bg-white w-full h-full rounded-2xl md:rounded-3xl overflow-hidden">
        <VideoComponent
            videoPoster={data.video_poster.url}
            videoUrl={data.video_url}
            autoplay={data.autoplay} 
            status={false}  
        />
    </div>

    <Caption aos caption={data.caption} />
{/if}
