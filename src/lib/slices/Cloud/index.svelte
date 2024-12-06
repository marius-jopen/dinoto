<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { getDistanceTop, getDistanceBottom } from '../../components/distances';
  import { PrismicImage } from "@prismicio/svelte";
  import { onMount } from 'svelte';
	import { workStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import ProjectItem from '$lib/components/project-item.svelte';

  export let slice: Content.CloudSlice;

  let distanceTop = getDistanceTop(slice.primary.distance_top);
  let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
  let work = get(workStore);
  let images = []; // Initialize images array
  let hoveredIndex = null;
  let mouseX = 50;
  let mouseY = 50;
  let container;

  function getProjectById(id) {
    return work.find(project => project.id === id);
  }

  // Start animation loop only on client side
  onMount(() => {
    // Copy and shuffle images
    images = [...slice.primary.items].sort(() => Math.random() - 0.5);

    // Calculate grid dimensions based on the number of images
    let numImages = images.length;
    let columns = Math.ceil(Math.sqrt(numImages));
    let rows = Math.ceil(numImages / columns);

    // Generate positions and sizes for each image
    images = images.map((item, index) => {
      let col = index % columns;
      let row = Math.floor(index / columns);

      let gridX = (col + 0.5) * (100 / columns);
      let gridY = (row + 0.5) * (100 / rows);

      let offsetX = (Math.random() - 0.5) * (50 / columns);
      let offsetY = (Math.random() - 0.5) * (50 / rows);

      let randomX = gridX + offsetX;
      let randomY = gridY + offsetY;

      randomX = Math.max(0, Math.min(100, randomX));
      randomY = Math.max(0, Math.min(100, randomY));

      let randomSize = Math.random() * 15 + 25;

      return {
        ...item,
        randomX,
        randomY,
        randomSize,
        currentOffsetX: 0,
        currentOffsetY: 0,
        targetOffsetX: 0,
        targetOffsetY: 0,
        delayFactor: 2,
      };
    });

    // Start the animation loop
    animate();
  });

  function handleMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    mouseX = (relX / rect.width) * 100;
    mouseY = (relY / rect.height) * 100;

    images.forEach((image) => {
      let dx = mouseX - image.randomX;
      let dy = mouseY - image.randomY;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        dx /= distance;
        dy /= distance;
      }

      let movementStrength = Math.random() * 20 + 5;
      let delay = image.delayFactor;

      image.targetOffsetX = dx * movementStrength * delay;
      image.targetOffsetY = dy * movementStrength * delay;
    });
  }

  function animate() {
    images = images.map((image) => {
      image.currentOffsetX += (image.targetOffsetX - image.currentOffsetX) * 0.02;
      image.currentOffsetY += (image.targetOffsetY - image.currentOffsetY) * 0.02;
      return image;
    });
    requestAnimationFrame(animate);
  }
</script>

<style>
  .image-container {
    position: absolute;
    transition: transform s;
    will-change: transform;
  }

  .image-container img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<section data-aos="fade-up" class="w-full {distanceTop} {distanceBottom}">
  <div class="overflow-x-clip hidden md:block">
    <div
      class="mt-12 mb-3 mx-[15%]"
      style="position: relative; height: 35vw;"
      bind:this={container}
      on:mousemove={handleMouseMove}
    >
      {#each images as image, index}
      <div
        class="image-container"
        style="
        --scale-value: {hoveredIndex === index ? 1.6 : 1.4};
        top: {image.randomY}%;
        left: {image.randomX}%;
        width: {image.randomSize}%;
        height: {image.randomSize}%;
        transform: translate3d(-50%, -50%, 0) translate3d({image.currentOffsetX}%, {image.currentOffsetY}%, 0) ;
        transition: 0.5s;
        z-index: {hoveredIndex === index ? 200 : 1};
        "
        on:mouseenter={() => (hoveredIndex = index)}
        on:mouseleave={() => (hoveredIndex = null)}
      >
      {#if image.image.url}
          <PrismicImage 
          style="
            transform: scale({hoveredIndex === index ? 1.6 : 1.4});
            transition: transform 1s;
          "
          class="rounded-2xl md:rounded-3xl" field={image.image} />
          {:else}
          <div 
          class="rounded-2xl mb-4"
          style="
            transform: scale({hoveredIndex === index ? 1.6 : 1.4});
            transition: transform 1s;
          ">
            <ProjectItem cloud={true} list={true} data={getProjectById(image.project.id)} />
          </div>
        {/if}
      </div>
      {/each}
    </div>
  </div>

  <div class="md:hidden">
    <div class="box">
      {#each images as image, index}
        <div class="">
          {#if image.image.url}
            <PrismicImage class="rounded-2xl mb-4" field={image.image} />
          {:else}
            <div class="rounded-2xl mb-4">
              <ProjectItem cloud={false} list={true} data={getProjectById(image.project.id)} />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
