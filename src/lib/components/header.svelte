<script>
    import { onMount } from 'svelte';
    import HeaderLogo from '$lib/components/header-logo.svelte';
    import Navigation from '$lib/components/navigation.svelte';

    export let items;
    export let style;
    export let sticky;
    export let logo = true;

    let distanceTop = "h-[65px]";
    let background = false;
    let lastScrollY = 0;

    // Listen to the scroll event and update the background based on scroll direction
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            // At the top of the page, set background to false
            background = false;
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            background = true;
        } else {
            // Scrolling down
            background = false;
        }

        lastScrollY = currentScrollY;
    };

    // Attach scroll event listener on mount
    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup listener on component destroy
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="{!sticky && 'fixed top-0 left-0 w-full z-50'} transition duration-200 {background ? 'bg-white/10 backdrop-blur-xl' : 'bg-white/0'} {distanceTop}">
    <div class="box {!sticky && 'relative'}">
        <div class="pt-4 pb-4 flex justify-between">
            {#if logo}
                <HeaderLogo {style} />
            {:else}
                <div />
            {/if}
    
            <Navigation {items} />
        </div>
    </div>
</div>

{#if !sticky}
    <div class="{distanceTop}" />
{/if}