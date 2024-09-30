<script lang="ts">
    export let videoPoster: string;
    export let videoUrl: string;
    export let autoplay: boolean = false;

    let isPlaying = autoplay;
    let videoElement: HTMLVideoElement;

    const togglePlayPause = () => {
        if (videoElement.paused) {
            videoElement.play();
            isPlaying = true;
        } else {
            videoElement.pause();
            isPlaying = false;
        }
    };

    import { onMount } from 'svelte';

    onMount(() => {
        if (autoplay) {
            videoElement.play();
        }
        videoElement.addEventListener('play', () => (isPlaying = true));
        videoElement.addEventListener('pause', () => (isPlaying = false));
    });
</script>

<div class="relative group">
    {#if autoplay}
        <video
            bind:this={videoElement}
            poster={videoPoster}
            src={videoUrl}
            autoplay
            muted
            loop
            class="w-full h-auto"
        />
    {:else}
        <video
            bind:this={videoElement}
            poster={videoPoster}
            src={videoUrl}
            class="w-full h-auto"
        />
    {/if}

    <!-- Play/Pause Button -->
    <button
        on:click={togglePlayPause}
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-d_white text-d_black px-4 py-2 rounded-lg transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100 {isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}"
    >
        {isPlaying ? 'Pause' : 'Play'}
    </button>
</div>
