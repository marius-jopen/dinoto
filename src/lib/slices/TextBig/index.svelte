<script>
    import { PrismicRichText } from "@prismicio/svelte";
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';


    export let slice;

    let style = slice.primary.style;
    let styleClass = '';

    if (style === 'Left') {
        styleClass = 'text-left md:w-[50%]';
    } else if (style === 'Right') {
        styleClass = 'text-right md:w-[50%]';
    } else if (style === 'Center') {
        styleClass = 'text-center md:w-[60%] mx-8 md:mx-[20%]';
    } else if (style === 'Inline') {
        styleClass = 'text-left md:ml-[35%] md:w-[50%]';
    }

    let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>



<section data-aos="fade-up" class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
    <div class="{styleClass}">
        <PrismicRichText field={slice.primary.text} />
    </div>
</section>
