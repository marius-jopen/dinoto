<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import HeaderLogo from '$lib/components/header-logo.svelte';
    import Navigation from '$lib/components/navigation.svelte';

    export let items;
    export let style;
    export let sticky;
    export let logo = true;
    export let place;

    let distanceTop = "h-[65px]";
    let hideHeader = false;

    onMount(() => {
        console.log('Header mounted:', { sticky, logo });
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const bottomPosition = document.documentElement.scrollHeight;
            hideHeader = scrollPosition >= bottomPosition;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

{#if !hideHeader}
    <div transition:fade={{duration: 200}} 
         class="hidden md:block {!sticky ? 'fixed top-0 left-0 w-full z-50' : ''} {distanceTop}">
        <div class="box {!sticky ? 'relative' : ''}">
            <div class="pt-4 pb-4 flex justify-between">
                {#if !sticky}
                    {#if logo}
                        <HeaderLogo {style} />
                    {:else}
                        <div />
                    {/if}
                {:else}
                    <HeaderLogo {style} />
                {/if}
        
                <Navigation {items} />
            </div>
        </div>
    </div>
{/if}

{#if !sticky && place != 'home'}
    <div class="hidden md:block {distanceTop}" />
{/if}