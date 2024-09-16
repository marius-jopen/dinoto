<script>
    import { PrismicRichText } from "@prismicio/svelte";

    export let data
    export let index
    export let time
    export let status
    export let type

    if (type == "welcome") {
        data = data.data.items[0]
    }
</script>

{#if data.text.length > 0}
    <div class="aspect-video w-full">
        <div class="bg-d_lightGreen h-full w-full flex justify-center flex-col px-8">
            <div class="text-center">
                <PrismicRichText field={data.text} />
            </div>
        </div>
    </div>
{/if}