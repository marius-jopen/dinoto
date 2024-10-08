<script>
    // Import the store and get function
    import { workStore } from '$lib/stores';
    import { get } from 'svelte/store';
    import { page } from '$app/stores';

    export let data;

    console.log(data.page.id); // Log the current project ID

    let work = get(workStore);
    let host = $page.url.origin;

    $: data = data.page.data;

    // Get the selected project ID (if any) from the data
    let selectedProjectId = data ? data.id : null; // Current project ID

    // Function to select a random project except the current one
    function getRandomProject(exceptId) {
        // Filter out the current project and ensure the project is clickable
        const availableProjects = work.filter(project => project.id !== exceptId && project.data.clickable);
        if (availableProjects.length === 0) return null; // No projects left
        const randomIndex = Math.floor(Math.random() * availableProjects.length);
        return availableProjects[randomIndex];
    }

    // Function to find a clickable project that is not the current project
    function findClickableProject() {
        let project = null;
        let attempts = 0; // Initialize attempts counter
        const maxAttempts = 10; // Set a maximum number of attempts

        // Keep looking for a random project until we find one that is clickable and not the current project
        do {
            project = getRandomProject(selectedProjectId);
            attempts++;

            // If a valid project is found, return it immediately
            if (project) {
                return project;
            }
        } while (attempts < maxAttempts); // Loop until a valid project is found or max attempts reached

        // Return null if no valid project is found after max attempts
        return null;
    }

    // Attempt to find the next project, if any
    let nextProject = data.next_project ? work.find(project => project.id === data.next_project.id) : null;

    // If the next project is the current one or not clickable, find a new one
    if (!nextProject || nextProject.id === selectedProjectId || !nextProject.data.clickable) {
        nextProject = findClickableProject(); // Loop until a valid project is found
    }

</script>

<div class="box my-20">
    {#if nextProject}
        <a href="{host}/work/{nextProject.uid}" class="flex gap-8 h-full block">
            <div class="flex flex-col justify-center w-full">
                <h2>{nextProject.data.client[0].text}</h2>
                <h2 class="text-d_darkGray">{nextProject.data.title[0].text}</h2>
            </div>

            <div class="w-full">
                <svg viewBox="0 0 779 641" fill="var(--d-lightGreen)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.531 363.12C12.8732 364.718 -1.40218e-05 339.785 -1.49195e-05 320.5C-1.58173e-05 301.215 12.0757 277.88 38.6196 277.88L680.229 310.058C594.332 268.291 387.335 141.391 387.335 62.6509C387.335 19.2854 431.993 4.3304e-05 465.486 4.19292e-05C518.802 193.6 683.647 288.429 779 318.902L779 322.098C683.647 351.825 518.802 446.654 465.486 641C431.993 641 387.336 620.862 387.336 577.497C387.336 498.757 594.332 371.857 680.229 330.089L39.531 363.12Z" fill="#9DFF3A"/>
                </svg>                    
            </div>
        </a>
    {/if}
</div>
