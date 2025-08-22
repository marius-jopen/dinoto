<script>
    import { PrismicImage } from "@prismicio/svelte";
	import Caption from "./caption.svelte";

    export let data
    export let status
    export let aos = 0
</script>

{#if data.image.url}
    <div data-aos="fade-up" data-aos-delay={aos} class="bg-white w-full h-full rounded-2xl md:rounded-3xl overflow-hidden">
        <div class="relative w-full h-full group">
            <PrismicImage 
                class="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
                field={data.image} 
            />
            {#if data.image_hover && data.image_hover.url}
                <PrismicImage 
                    class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                    field={data.image_hover} 
                />
            {/if}
        </div>
    </div>

    <Caption aos caption={data.caption} />
{/if}
