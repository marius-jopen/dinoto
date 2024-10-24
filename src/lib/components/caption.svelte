<script>
    import { PrismicRichText } from "@prismicio/svelte";

    export let aos
    export let caption
</script>

<div data-aos="fade-up" data-aos-delay={aos} class="text-center pt-3" >
    <PrismicRichText field={caption} />
</div>