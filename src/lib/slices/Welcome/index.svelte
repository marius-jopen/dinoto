<script lang="ts">
	console.log("WELCOME LOADED")

    import type { Content } from '@prismicio/client';
    import Slider from '$lib/components/slider.svelte';
    import { workStore } from '$lib/stores';
    import { get } from 'svelte/store';

    export let slice: Content.WelcomeSlice;

    let distance = 330;
    let work = get(workStore);
    let defaultSlideTime = 2000;

    // Get matched projects from the slice and work store
    let matchedProjects = slice.primary.items
        .map(item => work.find(project => project.id === item.project?.id))
        .filter(Boolean);

    // Function to get the slide times
    function getSlideTimes(matchedProjects) {
        return matchedProjects.map(item =>
            item?.data?.slide_time ?? defaultSlideTime
        );
    }

    // Update matched projects with their corresponding slide_time
    matchedProjects = matchedProjects.map((item, index) => ({
        ...item,
        slide_time: getSlideTimes(matchedProjects)[index]
    }));

    // Create a new array that contains all matchedProjects and items with images/videos
    let newArray = slice.primary.items.map(item => {
        let matchedProject = work.find(project => project.id === item.project?.id);
        if (matchedProject) {
            // If a matched project is found, return the matched project with slide_time
            return {
                ...matchedProject,
                slide_time: matchedProject?.data?.slide_time ?? defaultSlideTime
            };
        } else {
            // If no matched project is found, return the item itself (images/videos) nested in 'data' -> 'items' -> '0'
            return {
                slide_time: 3000,
                data: {
                    clickable: false,
                    items: {
                        0: item
                    }
                }
            };
        }
    });

    $: console.log(newArray);
    $: console.log(matchedProjects);

    // Add this to destructure logo_hidden from the slice
    const { logo_hidden = false } = slice.primary;
</script>

<section class="{!logo_hidden ? 'md:z-[1000] md:relative ' : ''}">
    <div class="aspect-square md:aspect-video h-full relative ">
        <Slider type="welcome" data={newArray} />

        {#if !logo_hidden}
            <div class="absolute w-full bottom-0 left-0 ">
                <div class="box">
                    <svg class="w-full h-auto pb-4 md:pb-6" viewBox="0 0 1588 424" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_68_3172)">
                        <path d="M144.354 16.3383H0V415.555H143.802C264.005 415.555 344.331 339.545 344.331 216.223C344.331 92.9006 264.005 16.3383 144.354 16.3383ZM140.428 331.652H88.7516V100.219H140.428C201.654 100.219 251.654 136.256 251.654 216.201C251.654 296.146 201.654 331.63 140.428 331.63V331.652Z" fill="white"/>
                        <path d="M403.153 0C376.201 0 353.727 22.5287 353.727 50.1203C353.727 77.712 376.201 100.241 403.153 100.241C430.105 100.241 453.704 77.712 453.704 50.1203C453.704 22.5287 431.252 0 403.153 0Z" fill="white"/>
                        <path d="M446.404 135.703H361.027V415.555H446.404V135.703Z" fill="white"/>
                        <path d="M735.287 259.003L585.883 16.3383H478.031V415.555H566.209V153.147L730.237 415.555H824.039V16.3383H735.287V259.003Z" fill="white"/>
                        <path d="M988.485 127.258C905.358 127.258 840.184 188.631 840.184 275.341C840.184 362.052 905.336 424 988.485 424C1071.63 424 1136.79 362.052 1136.79 275.341C1136.79 188.631 1072.19 127.258 988.485 127.258ZM988.485 345.16C956.46 345.16 925.583 322.079 925.583 275.341C925.583 228.604 956.483 206.075 988.485 206.075C1020.49 206.075 1051.41 228.029 1051.41 275.341C1051.41 322.654 1021.08 345.16 988.485 345.16Z" fill="white"/>
                        <path d="M1241 315.314V210.585H1295.5V135.703H1241V54.0557H1164.6V90.0928C1164.6 116.004 1150.55 135.703 1121.35 135.703H1107.87C1105.49 135.703 1104.61 138.798 1106.59 140.08C1112.9 144.126 1118.72 148.836 1124 154.186C1128.05 158.32 1132.38 162.72 1134.8 166.058C1150.59 187.813 1154.5 210.541 1156.75 237.336V330.525C1156.75 386.26 1192.13 420.617 1250 420.617C1276.95 420.617 1291 414.427 1294.37 412.725V341.778C1289.32 342.905 1280.9 344.608 1271.9 344.608C1253.37 344.608 1241 338.417 1241 315.336V315.314Z" fill="white"/>
                        <path d="M1439.7 127.258C1356.57 127.258 1291.4 188.631 1291.4 275.341C1291.4 362.052 1356.55 424 1439.7 424C1522.85 424 1588 362.052 1588 275.341C1588 188.631 1523.4 127.258 1439.7 127.258ZM1439.7 345.16C1407.67 345.16 1376.8 322.079 1376.8 275.341C1376.8 228.604 1407.7 206.075 1439.7 206.075C1471.7 206.075 1502.62 228.029 1502.62 275.341C1502.62 322.654 1472.3 345.16 1439.7 345.16Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_68_3172">
                        <rect width="1588" height="424" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        {/if}
    </div>
</section>