<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { getDistanceTop, getDistanceBottom } from '../../components/distances';
  import { PrismicImage } from "@prismicio/svelte";
  import { onMount } from 'svelte';

  export let slice: Content.CloudSlice;

  let distanceTop = getDistanceTop(slice.primary.distance_top);
  let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

  let images = []; // Initialize images array
  let hoveredIndex = null;
  let mouseX = 50;
  let mouseY = 50;
  let container;

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

      let randomSize = Math.random() * 10 + 30;

      return {
        ...item,
        randomX,
        randomY,
        randomSize,
        currentOffsetX: 0,
        currentOffsetY: 0,
        targetOffsetX: 0,
        targetOffsetY: 0,
        delayFactor: Math.random() * 0.5 + 0.5,
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

      let movementStrength = Math.min(50 / distance, 5);
      let delay = image.delayFactor;

      image.targetOffsetX = dx * movementStrength * delay;
      image.targetOffsetY = dy * movementStrength * delay;
    });
  }

  function animate() {
    images = images.map((image) => {
      image.currentOffsetX += (image.targetOffsetX - image.currentOffsetX) * 0.05;
      image.currentOffsetY += (image.targetOffsetY - image.currentOffsetY) * 0.05;
      return image;
    });
    requestAnimationFrame(animate);
  }
</script>

<style>
  .image-container {
    position: absolute;
    transition: transform s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .image-container img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<section data-aos="fade-up" class="overflow-hidden {distanceTop} {distanceBottom}">
  <div class="box">
    <div
      class="mt-12 mb-10 mx-24"
      style="position: relative; width: 100%; height: 45vw;"
      bind:this={container}
      on:mousemove={handleMouseMove}
    >
      {#each images as image, index}
      <div
        class="image-container"
        style="
        --scale-value: {hoveredIndex === index ? 1.2 : 1};
        top: {image.randomY}%;
        left: {image.randomX}%;
        width: {image.randomSize}%;
        height: {image.randomSize}%;
        transform: translate(-50%, -50%) translate3d({image.currentOffsetX}%, {image.currentOffsetY}%, 0) ;
        transition: scale 1s ease-in-out;
        "
        on:mouseenter={() => (hoveredIndex = index)}
        on:mouseleave={() => (hoveredIndex = null)}
      >
        <PrismicImage 
        style="
          transform: scale({hoveredIndex === index ? 1.2 : 1});
          transition: transform 2s ease-in-out;
        "
        class="rounded-2xl md:rounded-3xl" field={image.image} />
      </div>
      {/each}
    </div>
  </div>
</section>
