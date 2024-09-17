<script>
    import { PrismicImage } from "@prismicio/svelte";

    export let data
    export let status
</script>

{#if data.image.url}
    <div class="border border-black bg-white w-full h-full rounded-3xl overflow-hidden">
        <PrismicImage class="h-full w-full object-cover" field={data.image} />
    </div>
{/if}