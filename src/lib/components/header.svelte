<script>
    import { onMount } from 'svelte';
    import HeaderLogo from '$lib/components/header-logo.svelte';
    import Navigation from '$lib/components/navigation.svelte';

    export let items;
    export let style;
    export let sticky;
    export let logo = true;

    let distanceTop = "h-[65px]";
</script>

<div class="hidden md:block {!sticky && 'fixed top-0 left-0 w-full z-50'} {distanceTop}">
    <div class="box {!sticky && 'relative'}">
        <div class="pt-4 pb-4 flex justify-between">
            {#if !sticky}
                {#if logo}
                    <HeaderLogo {style} />
                {:else}
                    <div />
                {/if}
            {:else}
                <div>
                </div>
            {/if}
    
            <Navigation {items} />
        </div>
    </div>
</div>

{#if !sticky}
    <div class="hidden md:block {distanceTop}" />
{/if}