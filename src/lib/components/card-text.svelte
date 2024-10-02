<script>
    import { backgroundColor } from '../../lib/components/color-styles';
    import { PrismicRichText } from "@prismicio/svelte";

    export let data
    export let status

    let styleClass
	
	$: styleClass = backgroundColor(data.color);
</script>

{#if data.text.length > 0}
    <div class="{styleClass} w-full h-full rounded-2xl md:rounded-3xl overflow-hidden py-3 px-8">
        {#if data.number}
            <div class="flex justify-between pb-10 pt-2">
                <h2>{data.headline}</h2>
                <h2>{data.number}</h2>
            </div>
        {:else}
            <div class="pb-10 pt-2">
                <h2>{data.headline}</h2>
            </div>
        {/if}

        <div class="p1 pb-4">
            <PrismicRichText field={data.text} />
        </div>
    </div>
{/if}