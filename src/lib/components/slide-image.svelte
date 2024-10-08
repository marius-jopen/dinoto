<script>
    import { PrismicImage } from "@prismicio/svelte";

    export let data
    export let index
    export let time
    export let status
    export let type

    if (type == "welcome") {
        data = data.data.items[0]
    }
</script>

{#if data.image.url}    
    <div class="w-full h-full">
        <PrismicImage class="aspect-square md:aspect-video w-full object-cover" field={data.image} />
    </div>
{/if}
