<script>
    import Slider from '$lib/components/slider.svelte';

    export let data

    console.log(data)

    let previews = data.data.items
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

    // console.log(previews)

</script>

<div class="w-1/3">
    {#if data.data.clickable == true}
        <a href="work/{data.uid}">
            {data.data.title[0]?.text}

            <Slider clickable={true} type="preview" data={previews} />´
        </a>
    {:else}
        <div>
            {data.data.title[0]?.text}

            <Slider clickable={false} type="preview" data={previews} />´
        </div>
    {/if}
</div>