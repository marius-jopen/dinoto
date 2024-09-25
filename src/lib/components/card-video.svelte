<script>
    import { onMount } from 'svelte';

    export let data;
    export let status = false;

    // Reference to the video element
    let videoElement;

    // Ensure the video is paused initially if status is false
    $: if (videoElement) {
        if (status) {
            videoElement.play(); // Play the video when status is true
        } else {
            videoElement.pause(); // Ensure the video is paused when status is false
        }
    }

    // On mount, pause the video to prevent autoplay
    onMount(() => {
        if (videoElement) {
            videoElement.pause(); // Ensure video is paused on mount if status is false
        }
    });
</script>

{#if data.video_url}
    <div class="bg-white w-full h-full rounded-3xl overflow-hidden">
        <video
            bind:this={videoElement} 
            class="h-full object-cover w-full"
            poster={data.video_poster.url}
            src={data.video_url}
            muted
            loop
        />
    </div>
{/if}
