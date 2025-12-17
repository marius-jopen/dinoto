<script>
    import { onMount } from 'svelte';
    import HeaderLogo from '$lib/components/header-logo.svelte';
    import { PrismicLink } from '@prismicio/svelte';
	import { fade } from 'svelte/transition';

    export let items;
    export let style;

    let visible = false;
    let distanceTop = "h-[60px]";
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

    function triggerNav() {
        visible = !visible; // Toggle visibility
    }

    function closeNav() {
        visible = false; // Toggle visibility
    }
</script>

<div class="w-full top-0 left-0 z-50 fixed {distanceTop} ">
    <div class="box flex justify-between pt-2 pb-4">
        <div class="pt-2">
            <HeaderLogo style={visible ? 'black' : style} />
        </div>
    
        <div on:click={triggerNav} class="pt-[4px] cursor-pointer transition-color duration-300 {visible ? 'text-black' : ''}">
            {visible ? 'Menu' : 'Menu'} <!-- Change the button text based on visibility -->
        </div>
    </div>
</div>

<div class="{distanceTop}" />

{#if visible}
    <div transition:fade={{ delay: 250, duration: 300 }} class="fixed top-0 left-0 bg-d_lightGreen z-40 h-screen w-full">
        <div class="flex flex-col justify-center text-black h-full text-center -mt-2">
            {#each items as item}
                <h1 class="py-1" on:click={closeNav}>
                    <PrismicLink field={item.link}>
                        {item.text}
                    </PrismicLink>
                </h1>
            {/each}
        </div>
    </div>
{/if}
