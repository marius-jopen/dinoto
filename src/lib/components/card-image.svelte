<script>
    import { PrismicImage } from "@prismicio/svelte";

    export let data
    export let status
    export let aos = 0
</script>

{#if data.image.url}
    <div data-aos="fade-up" data-aos-delay={aos} class="bg-white w-full h-full rounded-2xl md:rounded-3xl overflow-hidden">
        <PrismicImage class="h-full w-full object-cover" field={data.image} />
    </div>
{/if}