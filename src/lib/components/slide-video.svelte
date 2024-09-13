<script>
    export let data;
    export let index;
    export let time;
    export let status;
    export let type;

    let videoElement;
    let resetTimeout; // Store the timeout reference

    if (type === "welcome") {
        data = data.data.items[0];
    }

    // Reactively watch `status` and control the video playback
    $: {
        if (status && videoElement) {
            clearTimeout(resetTimeout); // Clear any previous reset timeout
            videoElement.play(); // Play the video when status is true
        } else if (videoElement) {
            resetTimeout = setTimeout(() => {
                videoElement.pause(); // Pause the video
                videoElement.currentTime = 0; // Reset video to the beginning after 1 second
            }, 1000);
        }
    }
</script>

{#if data.video_url}    
    <div>
        <video
            bind:this={videoElement}
            class="aspect-video object-cover w-full"
            poster=""
            src={data.video_url}
            muted
            loop
            autoplay={status}
        />
    </div>
{/if}
