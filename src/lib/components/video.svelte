<script lang="ts">
    export let videoPoster: string;
    export let videoUrl: string;
    export let autoplay: boolean = false;
    export let status: boolean = true; // External control for play/pause

    let videoElement: HTMLVideoElement;
    let isPlaying = false; // Track whether the video is playing

    // Play/pause toggle inside the Video component
    const togglePlayPause = () => {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    };

    // Reactively control play/pause from outside using the `status` prop
    $: if (videoElement && status) {
        videoElement.play();
    } else if (videoElement && !status) {
        videoElement.pause();
    }

    // Update `isPlaying` state when the video starts playing or pauses
    const updatePlayState = () => {
        isPlaying = !videoElement.paused;
    };

    import { onMount } from 'svelte';

    // Automatically play or pause based on the autoplay prop
    onMount(() => {
        if (autoplay) {
            videoElement.play();
            isPlaying = true;
        }

        // Attach event listeners to keep track of the play/pause state
        videoElement.addEventListener('play', updatePlayState);
        videoElement.addEventListener('pause', updatePlayState);
    });
</script>

<div class="relative group h-full">
    {#if autoplay}
        <video
            bind:this={videoElement}
            poster={videoPoster}
            src={videoUrl}
            autoplay
            muted
            loop
            class="w-full h-full object-cover"
        />
    {:else}
        <video
            bind:this={videoElement}
            poster={videoPoster}
            src={videoUrl}
            class="w-full h-full object-cover"
        />
    {/if}

    <!-- Play/Pause Button -->
    {#if !autoplay}
        {#if !isPlaying}
            <!-- Play Button (always visible when video is paused) -->
            <button
                on:click={togglePlayPause}
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-d_white text-d_black px-4 py-2 rounded-lg transition-opacity duration-300 ease-in-out opacity-100"
            >
                Play
            </button>
        {:else}
            <!-- Pause Button (fades in/out on hover when video is playing) -->
            <button
                on:click={togglePlayPause}
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-d_white text-d_black px-4 py-2 rounded-lg transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
            >
                Pause
            </button>
        {/if}
    {/if}
</div>
