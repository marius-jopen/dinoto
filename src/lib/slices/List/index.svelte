<script lang="ts">
    import type { Content } from '@prismicio/client';
    import { PrismicRichText } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

    export let slice: Content.ListSlice;

    let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
    <div class="border-t border-d_black">
        {#each slice.primary.items as item}
            <div class="flex flex-col text-center md:text-left md:flex-row w-full border-b border-d_black pb-4 pt-4">
                <div class="md:w-1/2">
                    <p>
                        {item.headline}
                    </p>
                </div>
    
                <div class="md:w-1/2">
                    <PrismicRichText field={item.text} />
                </div>
            </div>
        {/each}
    </div>
</section>
