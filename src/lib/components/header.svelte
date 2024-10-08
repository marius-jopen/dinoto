<script>
    import HeaderLogo from '$lib/components/header-logo.svelte'
    import Navigation from '$lib/components/navigation.svelte'

    export let items
    export let style
    export let logo = true
</script>

<div class="box">
    <div class="pt-4 pb-4 flex justify-between">
        {#if logo}
            <HeaderLogo {style} />
        {:else}
        <div></div>
        {/if}

        <Navigation {items} />
    </div>
</div>