<script>
    import { PrismicLink } from '@prismicio/svelte'
    export let data
</script>

<div>
    <a href="/">
        Logo
    </a>
    
    {#each data.data.navigation as item}
        <nav>
            <PrismicLink field={item.link}>
                {item.text}
            </PrismicLink>
        </nav>
    {/each}
</div>