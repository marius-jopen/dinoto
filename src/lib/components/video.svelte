<script lang="ts">
  import { onMount } from 'svelte';

  export let videoPoster: string;
  export let videoUrl: string;
  export let autoplay: boolean = false; // Video-specific autoplay
  export let status: boolean = false; // External control for play/pause, default false

  let videoElement: HTMLVideoElement;
  let isPlaying = false; // Track whether the video is playing
  let isMounted = false; // Track whether the component is mounted
  let isManuallyControlled = false; // Track whether the video is controlled manually
  let hlsInstance: any = null;

  // Detect if URL is HLS
  $: isHls = videoUrl && videoUrl.includes('.m3u8');

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

  // Initialize HLS if needed
  const initHls = async () => {
      if (!isHls || !videoElement) return;
      
      const { default: Hls } = await import('hls.js');
      
      if (Hls.isSupported()) {
          hlsInstance = new Hls({
              autoStartLoad: true,
              capLevelToPlayerSize: true,
              maxBufferLength: 30,
              enableWorker: true,
          });
          
          hlsInstance.loadSource(videoUrl);
          hlsInstance.attachMedia(videoElement);
          
          hlsInstance.on(Hls.Events.ERROR, (event: any, data: any) => {
              if (data.fatal) {
                  switch (data.type) {
                      case Hls.ErrorTypes.NETWORK_ERROR:
                          hlsInstance.startLoad();
                          break;
                      case Hls.ErrorTypes.MEDIA_ERROR:
                          hlsInstance.recoverMediaError();
                          break;
                      default:
                          hlsInstance.destroy();
                          break;
                  }
              }
          });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          // Native HLS support (Safari)
          videoElement.src = videoUrl;
      }
  };

  // On mount, only play automatically if autoplay is true
  onMount(() => {
      isMounted = true; // Set the mounted flag to true

      if (isHls) {
          initHls().then(() => {
              if (autoplay && videoElement) {
                  videoElement.muted = true;
                  videoElement.volume = 0;
                  videoElement.play();
                  isPlaying = true;
              }
          });
      } else {
          if (autoplay) {
              videoElement.muted = true;
              videoElement.volume = 0;
              videoElement.play(); // Play the video automatically if autoplay is true
              isPlaying = true;
          }
      }

      // Attach event listeners to keep track of the play/pause state
      videoElement.addEventListener('play', updatePlayState);
      videoElement.addEventListener('pause', updatePlayState);

      return () => {
          if (hlsInstance) {
              hlsInstance.destroy();
          }
      };
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
      src={isHls ? undefined : videoUrl}
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
        src={isHls ? undefined : videoUrl}
        loop
        class="w-full h-full object-cover"
        playsinline
        controls
    ></video>
  {/if}

  <!-- Play/Pause Button, only if autoplay is false -->
  {#if !autoplay}
      <button
          on:click={togglePlayPause}
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/70 bg-black/40 flex items-center justify-center transition-opacity duration-300 ease-in-out {isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}"
          aria-label={isPlaying ? 'Pause' : 'Play'}
      >
          {#if isPlaying}
              <!-- Pause icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-9 h-9">
                  <rect x="5" y="3" width="4" height="18" rx="1"/>
                  <rect x="15" y="3" width="4" height="18" rx="1"/>
              </svg>
          {:else}
              <!-- Play icon (offset slightly right to visually centre the triangle) -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-9 h-9 translate-x-0.5">
                  <polygon points="6,3 20,12 6,21"/>
              </svg>
          {/if}
      </button>
  {/if}
</div>