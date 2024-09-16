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
</script>

<div 
    on:click={() => getLink() && window.location.assign(getLink())} 
    style="cursor: {data.data.clickable ? 'pointer' : 'default'};"
>
    <div class="rounded-3xl overflow-hidden">
        <Slider clickable={data.data.clickable} type="preview" data={previews} />
    </div>

    <div class="bg-white rounded-b-3xl pb-3 pt-10 px-3 -mt-8">
        {data.data.title[0]?.text}
    </div>
</div>
