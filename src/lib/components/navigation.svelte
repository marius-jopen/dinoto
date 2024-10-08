<script>    
    import { PrismicLink } from '@prismicio/svelte'

    export let items
</script>

<div class="flex gap-4">
    {#each items as item}
        <nav>
            <PrismicLink field={item.link}>
                {item.text}
            </PrismicLink>
        </nav>
    {/each}
</div>