<script>
    import { PrismicRichText } from "@prismicio/svelte";

    export let data
    export let index
    export let time
    export let status
    export let type
    export let list

    if (type == "welcome") {
        data = data.data.items[0]
    }
</script>

{#if data.text.length > 0}
    <div class="{type == 'welcome' ? 'aspect-square ' : 'aspect-video'}  w-full">
        <div class="bg-d_lightGreen h-full w-full flex justify-center flex-col px-8 ">
            <div class="text-center {list ? 'p3' : 'p2'}">
                 {data.text && data.text[0].text} {list}
            </div>
        </div>
    </div>
{/if}