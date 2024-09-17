<script>
    export let data
    export let status
</script>

{#if data.text.length > 0}
    <div class="border border-black bg-white w-full h-full rounded-3xl overflow-hidden">
        {#if data.number}
            <div class="flex justify-between">
                <h2>{data.headline}</h2>
                <h2>{data.number}</h2>
            </div>
        {:else}
            <h2>{data.headline}</h2>
        {/if}
    </div>
{/if}