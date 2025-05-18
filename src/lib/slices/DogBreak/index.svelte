<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
    import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.DogBreakSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
    <div data-aos="fade-up"  class="relative mb-[200px]">
        <div class="text-center md:w-[70%] mx-8 md:mx-[15%]">
            <PrismicRichText field={slice.primary.text} />
        </div>
    
        {#if slice.primary.video_mpg4.url && slice.primary.video_webm.url}
            <div class="flex justify-center absolute bottom-0 left-0 w-full mb-[-300px] scale-[1.5]">
                <video width="600" height="100%" poster={slice.primary.video_poster.url} autoplay loop muted playsinline>
                    <source 
                    src={slice.primary.video_mpg4.url} 
                    type='video/mp4; codecs="hvc1"'>
                    <source 
                    src={slice.primary.video_webm.url} 
                    type="video/webm">
                </video>
            </div>
        {/if}
    </div>
</section>
