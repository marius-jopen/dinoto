<script>
    import { onMount } from 'svelte';
    import VideoComponent from '../components/video.svelte'; // Import the VideoComponent

    export let data;
    export let status = false;

    // On mount, ensure video is paused to prevent autoplay
    onMount(() => {
        // You can handle any initial logic here if needed
    });
</script>

{#if data.video_url}
    <div class="bg-white w-full h-full rounded-2xl md:rounded-3xl overflow-hidden">
        <VideoComponent
            videoPoster={data.video_poster.url}
            videoUrl={data.video_url}
            autoplay={data.autoplay} 
            status={status}  
        />
    </div>
{/if}
