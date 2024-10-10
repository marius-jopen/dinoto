<script>
    import { workStore } from '$lib/stores';
    import { get } from 'svelte/store';
    import { page } from '$app/stores';

    export let data;

    let work = get(workStore);
    let host = $page.url.origin;
    let workAdjusted = [];
    let workAdjusted2 = [];
    let randomProject = null;

    $: data;

    $: console.log(work);
    $: console.log(data);
    $: console.log(data.page.uid);

    $: if (work && Array.isArray(work)) {
        // Step 1: Filter out the project with the matching UID
        workAdjusted = work.filter(project => project.uid !== data?.page?.uid);
    }

    $: if (workAdjusted && Array.isArray(workAdjusted)) {
        // Step 2: Filter out projects that are not clickable
        workAdjusted2 = workAdjusted.filter(project => project.data?.clickable);
    }

    // Function to select a random project from workAdjusted2
    function getRandomProject(workAdjusted2) {
        if (workAdjusted2.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * workAdjusted2.length);
        return workAdjusted2[randomIndex];
    }

    $: randomProject = getRandomProject(workAdjusted2);
</script>

{#key data}
    <div class="box my-20">
        {#if randomProject}
            <a href="{host}/work/{randomProject.uid}" class="flex gap-8 h-full block">
                <div class="flex flex-col justify-center w-full">
                    <h2>{randomProject.data.client[0].text}</h2>
                    <h2 class="text-d_darkGray">{randomProject.data.title[0].text}</h2>
                </div>

                <div class="w-full">
                    <svg viewBox="0 0 779 641" fill="var(--d-lightGreen)" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.531 363.12C12.8732 364.718 -1.40218e-05 339.785 -1.49195e-05 320.5C-1.58173e-05 301.215 12.0757 277.88 38.6196 277.88L680.229 310.058C594.332 268.291 387.335 141.391 387.335 62.6509C387.335 19.2854 431.993 4.3304e-05 465.486 4.19292e-05C518.802 193.6 683.647 288.429 779 318.902L779 322.098C683.647 351.825 518.802 446.654 465.486 641C431.993 641 387.336 620.862 387.336 577.497C387.336 498.757 594.332 371.857 680.229 330.089L39.531 363.12Z" fill="#9DFF3A"/>
                    </svg>                    
                </div>
            </a>
        {/if}
    </div>
{/key}