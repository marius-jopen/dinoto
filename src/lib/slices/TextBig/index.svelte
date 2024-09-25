<script>
    import { PrismicRichText } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

    export let slice;

    let style = slice.primary.style;
    let styleClass = '';

    if (style === 'Left') {
        styleClass = 'text-left w-[65%]';
    } else if (style === 'Right') {
        styleClass = 'text-right w-[65%]';
    } else if (style === 'Center') {
        styleClass = 'text-center w-[60%] mx-[20%]';
    } else if (style === 'Inline') {
        styleClass = 'text-left ml-[35%] w-[65%]';
    }

    let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
    <div class="{styleClass}">
        <PrismicRichText field={slice.primary.text} />
    </div>
</section>
