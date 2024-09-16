<script>
    import Slider from '$lib/components/slider.svelte';

    export let data;

    let previews = data.data.items;
    let defaultSlideTime = 2000;

    // Function to get the slide times
    function getSlideTimes(previews) {
        return previews.map(item =>
            item?.slide_time ?? defaultSlideTime
        );
    }

    // Update matched projects with their corresponding slide_time
    previews = previews.map((item, index) => ({
        ...item,
        slide_time: getSlideTimes(previews)[index]
    }));

    // Function to get link if clickable
    function getLink() {
        return data.data.clickable ? `work/${data.uid}` : null;
    }

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let parentElement; // Ref to the parent element to calculate offsets

    // Function to handle mouse movement
    function handleMouseMove(event) {
        const rect = parentElement.getBoundingClientRect();
        mouseX = event.clientX - rect.left; // Calculate mouse X relative to the parent element
        mouseY = event.clientY - rect.top;  // Calculate mouse Y relative to the parent element
    }

    // Function to set hover state
    function handleMouseEnter() {
        isHovering = true;
    }

    function handleMouseLeave() {
        isHovering = false;
    }
</script>

<style>
    .slider-follow {
        position: absolute;
        pointer-events: none; /* Prevent the slider from blocking clicks */
        transition: opacity 0.2s ease-in-out;
    }

    .hidden {
        opacity: 0;
    }

    .visible {
        opacity: 1;
    }
</style>

<div
    bind:this={parentElement}
    on:click={() => getLink() && window.location.assign(getLink())}
    on:mousemove={handleMouseMove}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    style="cursor: {data.data.clickable ? 'pointer' : 'default'};"
    class="relative py-8 hover:bg-white transition-color duration-200"
>
    <div class="box">
        <h2>
            {data.data.client[0]?.text}
    
            <span class="text-d_darkGray">
                {data.data.title[0]?.text}
            </span>
        </h2>
    </div>

    <div
        class="slider-follow -ml-10 -mt-10 z-50 {isHovering ? 'visible' : 'hidden'}"
        style="top: {mouseY}px; left: {mouseX}px;"
    >
        <div class="rounded-3xl overflow-hidden w-[350px]">
            <Slider list={true} clickable={data.data.clickable} type="preview" data={previews} />
        </div>
    </div>
</div>
