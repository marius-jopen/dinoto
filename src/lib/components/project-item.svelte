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

    <div class="bg-white rounded-b-3xl pb-4 pt-11 px-8 -mt-8">
        {data.data.client[0]?.text}
        
        <span class="text-d_darkGray">
            {data.data.title[0]?.text}
        </span>
    </div>
</div>
