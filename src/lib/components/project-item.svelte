<script>
    import Slider from '$lib/components/slider.svelte';
    import { page } from '$app/stores';

    export let data;

    export let list = false
    export let cloud = false
    export let hidecaption = false

    let previews = data.data.items;
    let defaultSlideTime = 2000;
    let host = $page.url.origin

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
        return data.data.clickable ? `${host}/work/${data.uid}` : null;
    }
</script>

<div 
    data-aos="fade-up"
    on:click={() => getLink() && window.location.assign(getLink())} 
    style="cursor: {data.data.clickable ? 'pointer' : 'default'};"
>
    <div class="rounded-2xl md:rounded-3xl overflow-hidden">
        <Slider list={list} clickable={data.data.clickable} type="preview" data={previews} />
    </div>

    {#if !cloud && !hidecaption}
        <div class="bg-white rounded-b-2xl md:rounded-b-3xl pb-4 pt-[45px] px-4 md:px-8 -mt-8 p2 text-center flex flex-col justify-center items-center h-[110px]">
            {data.data.client[0]?.text}
            
            <span class="text-d_darkGray">
                {data.data.title[0]?.text}
            </span>
        </div>
    {/if}
</div>
