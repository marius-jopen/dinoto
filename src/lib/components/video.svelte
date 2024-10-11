<script lang="ts">
  export let videoPoster: string;
  export let videoUrl: string;
  export let autoplay: boolean = false; // Video-specific autoplay
  export let status: boolean = false; // External control for play/pause, default false

  let videoElement: HTMLVideoElement;
  let isPlaying = false; // Track whether the video is playing
  let isMounted = false; // Track whether the component is mounted
  let isManuallyControlled = false; // Track whether the video is controlled manually

  // Play/pause toggle inside the Video component
  const togglePlayPause = () => {
      isManuallyControlled = true; // Indicate that the user manually interacted with the video
      if (videoElement.paused) {
          videoElement.play();
      } else {
          videoElement.pause();
      }
  };

  // Reactively control play/pause from outside using the status prop,
  // but only after the component is mounted and autoplay is false.
  $: if (isMounted && videoElement ) {
      if (status) {
          videoElement.play();
          
      } else {
          videoElement.pause();
      }
  }

 

  // Update isPlaying state when the video starts playing or pauses
  const updatePlayState = () => {
      isPlaying = !videoElement.paused;
  };

  import { onMount } from 'svelte';

  // On mount, only play automatically if autoplay is true
  onMount(() => {
      isMounted = true; // Set the mounted flag to true

      if (autoplay) {
        videoElement.muted = true;
        videoElement.volume = 0;
        videoElement.play(); // Play the video automatically if autoplay is true
        isPlaying = true;
      }

      // Attach event listeners to keep track of the play/pause state
      videoElement.addEventListener('play', updatePlayState);
      videoElement.addEventListener('pause', updatePlayState);
  });

</script>

<div class="relative group h-full w-full">
  <!-- Video Element -->
  <!-- <p>
    status: {status}
  </p> 
  <p>
    autoplay: {autoplay}
  </p>  -->
  {#if autoplay}
  <video
      bind:this={videoElement}
      poster={videoPoster}
      src={videoUrl}
      autoplay
      muted
      loop
      class="w-full h-full object-cover"
      playsinline
  ></video>
  {:else}
    <video
        bind:this={videoElement}
        poster={videoPoster}
        src={videoUrl}
        loop
        class="w-full h-full object-cover"
        playsinline
        controls
    ></video>
  {/if}

  <!-- Play/Pause Button, only if autoplay is false -->
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