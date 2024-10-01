<script>
  import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import SlideImage from './slide-image.svelte';
  import SlideVideo from './slide-video.svelte';
  import SlideText from './slide-text.svelte';
  import { workStore } from '$lib/stores';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data;
  export let type;
  export let clickable;
  export let list = false

  let clickableProject = (type == "preview" && clickable == false) ? true : false;
  let hover = clickableProject ? false : true;
  let work = get(workStore);
  let host = $page.url.origin

  $: hover ? playSlider() : pauseSlider();

  let splideOptions = {
    rewind: true,
    arrows: false,
    pagination: false,
    pauseOnHover: false,
    type: "fade"
  };

  let slider;

  // Dynamic array with each slide having a number and a specific time for display
  let slides = data;

  let numberOfSlides = slides.length;
  let progressBars = writable(new Array(numberOfSlides).fill(0)); // Manage progress bar widths
  let lastSlideIndex = numberOfSlides - 1; // Index of the last slide
  let intervalId; // Interval ID to control the timer
  let currentSlideIndex = 0;
  let progress = 0; // Store current progress for pausing/resuming

  // Function to manually autoplay each slide according to its specific slide_time
  const playSlide = (splide) => {
    const slide = slides[currentSlideIndex]; // Get current slide

    const progressInterval = 10; // Frequency to update the progress bar (in ms)
    const progressStep = (100 / (slide.slide_time / progressInterval)); // How much the progress bar moves per update

    progressBars.update(bars => {
      bars[currentSlideIndex] = progress; // Start progress where it left off
      return [...bars];
    });

    clearInterval(intervalId); // Clear the previous timer
    intervalId = setInterval(() => {
      progressBars.update(bars => {
        bars[currentSlideIndex] = progress >= 99 ? 100 : Math.min(progress, 100);
        return [...bars];
      });

      progress += progressStep;
      if (progress >= 100) {
        clearInterval(intervalId);
        progress = 0;

        if (currentSlideIndex === lastSlideIndex) {
          progressBars.set(new Array(numberOfSlides).fill(0)); // Reset all progress bars
        }

        // Move to the next slide
        currentSlideIndex = (currentSlideIndex + 1) % numberOfSlides;
        splide.go(currentSlideIndex); // Move to the next slide
        playSlide(splide); // Restart autoplay for the next slide
      }
    }, progressInterval);
  };

  // Jump to a specific slide and adjust progress bars
  const jumpToSlide = (index) => {
    clearInterval(intervalId); // Stop the current autoplay
    progress = 0; // Reset progress for the current slide

    // Update progress bars:
    // - Slides before the selected one should be full (100%)
    // - The selected slide should start animating (0%)
    // - Slides after the selected one should be empty (0%)
    progressBars.update(bars => {
      return bars.map((_, i) => {
        if (i < index) return 100; // Full for slides before
        if (i === index) return 0; // Start animating for selected slide
        return 0; // Empty for slides after
      });
    });

    currentSlideIndex = index; // Set the current slide index to the clicked one
    slider.splide.go(currentSlideIndex); // Navigate to the selected slide
    playSlide(slider.splide); // Restart autoplay for the clicked slide
  };

  // Move to the next slide when the slideshow is clicked
  const nextSlide = () => {
    let nextIndex = (currentSlideIndex + 1) % numberOfSlides; // Determine the next slide
    jumpToSlide(nextIndex); // Jump to the next slide
  };

  onMount(() => {
    if (slider && slider.splide) {
      if (!clickableProject || list) {
        playSlide(slider.splide); // Start autoplay when mounted
      }
    }
  });

  onDestroy(() => {
    clearInterval(intervalId); // Clear the timer when the component is destroyed
  });

  // Function for mouse enter (only for preview)
  function mouseEnter() {
    if (type === "preview") {
      hover = true; // Resume progress
    }
  }

  // Function for mouse leave (only for preview)
  function mouseLeave() {
    if (type === "preview") {
      hover = false; // Pause progress
    }
  }

  function pauseSlider() {
    if (slider && slider.splide) {
      clearInterval(intervalId); // Pause the progress
    }
  }

  function playSlider() {
    if (slider && slider.splide) {
      playSlide(slider.splide); // Resume from where it was paused
    }
  }

  const clickTop = (index) => {
    if (type == "welcome") {
      if (slides[index].data.clickable) {
        goto(`${host}/work/${slides[index].uid}`);
      } else {
        jumpToSlide(index)
      }
    } else {
      jumpToSlide(index)
    }
  }
</script>

<div class="relative h-full" on:click={nextSlide} on:mouseenter={mouseEnter} on:mouseleave={mouseLeave}>
  {#if !clickable }
    <div class="gap-4 flex px-6 pt-4 absolute top-0 left-0 w-full z-10">
      {#each $progressBars as barWidth, index}
        <div class="w-full {hover || list ? "" : "hidden"}">
          <div class="my-slide-progress rounded-full" on:click|stopPropagation={() => clickTop(index)}>
            <div class="my-slide-progress-bar rounded-full" style="width: {barWidth}%"></div>
          </div>
          {#if type == "welcome"}
            <p class="pt-2 px-1 text-white">
              {slides[index].data.client[0].text}

              <span class="opacity-50">
                {slides[index].data.title[0].text}
              </span>
            </p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  
  <Splide class="h-full" options={splideOptions} bind:this={slider} hasTrack={false} aria-label="...">
    <SplideTrack>
      {#each slides as slide, i}
        <SplideSlide>
          <SlideVideo list={list}  type={type} data={slide} index={i} time={slide.slide_time} status={i === currentSlideIndex ? true : false} />
          <SlideText type={type} data={slide} index={i} time={slide.slide_time} status={i === currentSlideIndex ? true : false} />
          <SlideImage type={type} data={slide} index={i} time={slide.slide_time} status={i === currentSlideIndex ? true : false} />
        </SplideSlide>
      {/each}
    </SplideTrack>
  </Splide>
</div>

<style>
  .my-slide-progress {
    border: 1px solid white;
    width: 100%;
    height: 10px;
    margin-top: 5px;
    cursor: pointer; /* Add pointer cursor to indicate clickability */
  }

  .my-slide-progress-bar {
    background-color: white;
    height: 100%;
    width: 0;
  }
</style>
