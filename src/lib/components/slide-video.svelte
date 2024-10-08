<script lang="ts">
	import { onMount } from "svelte";

    export let data;
    export let index;
    export let time;
    export let status;
    export let type;
    export let list; // Added list flag

    let welcomeVideoElement;
    let previewVideoElement;
    let resetTimeout; // Store the timeout reference

    if (type === "welcome") {
        data = data.data.items[0];
    }

    // Correct onMount usage to autoplay the welcome video
    onMount(() => {
        if (welcomeVideoElement && type === "welcome") {
            welcomeVideoElement.play();
        }
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
            src={data.video_url}
            muted
            loop
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
            src={data.video_url}
            muted
            loop
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}
        />
    </div>
{/if}
