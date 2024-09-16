<script>
    export let data;
    export let index;
    export let time;
    export let status;
    export let type;

    let welcomeVideoElement;
    let previewVideoElement;
    let resetTimeout; // Store the timeout reference

    if (type === "welcome") {
        data = data.data.items[0];
    }

    // Reactively control the welcome video playback
    $: {
        if (status && welcomeVideoElement && type === "welcome") {
            clearTimeout(resetTimeout); // Clear any previous reset timeout
            welcomeVideoElement.play(); // Play the video when status is true
        } else if (welcomeVideoElement) {
            resetTimeout = setTimeout(() => {
                welcomeVideoElement.pause(); // Pause the video
                welcomeVideoElement.currentTime = 0; // Reset video to the beginning after 1 second
            }, 1000);
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
            previewVideoElement.currentTime = 0; // Reset video to the beginning after 1 second
        }
    }
</script>

<!-- Render the welcome video with autoplay -->
{#if type === "welcome" && data.video_url}
    <div>
        <video
            bind:this={welcomeVideoElement}
            class="aspect-video object-cover w-full"
            poster=""
            src={data.video_url}
            muted
            loop
            autoplay
        />
    </div>
{/if}

<!-- Render the preview video controlled by mouse hover -->
{#if type === "preview" && data.video_url}
    <div>
        <video
            bind:this={previewVideoElement}
            class="aspect-video object-cover w-full"
            poster=""
            src={data.video_url}
            muted
            loop
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}
        />
    </div>
{/if}
