<script lang="ts">
    import type { Content } from '@prismicio/client';
    import ListItem from '../../components/ListItem.svelte';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

    export let slice: Content.ListSlice;

    let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
    <div class="border-t border-d_black">
        {#each slice.primary.items as item}
            <ListItem item={item} hoverline={slice.primary.hoverline} />
        {/each}
    </div>
</section>
