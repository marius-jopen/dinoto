<script>
    // Import the store and get function
    import { workStore } from '$lib/stores';
    import { get } from 'svelte/store';
    import { page } from '$app/stores';

    export let data;

    let work = get(workStore);
    let host = $page.url.origin

    data = data.page.data;

    // Function to select a random project except the current one
    function getRandomProject(exceptId) {
        const availableProjects = work.filter(project => project.id !== exceptId);
        if (availableProjects.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableProjects.length);
        return availableProjects[randomIndex];
    }

    // Get the selected project ID (if any) from the data
    let selectedProjectId = data ? data.id : null;

    // Attempt to find the next project, if any
    let nextProject = data.next_project ? work.find(project => project.id === data.next_project.id) : null;

    // If no next project is found, get a random one (excluding the current project)
    if (!nextProject) {
        nextProject = getRandomProject(selectedProjectId);
    }
</script>

<div class="box my-20">
    {#if nextProject}
        <a href="{host}/work/{nextProject.uid}">
            <h2>{nextProject.data.client[0].text}</h2>
            <h2 class="text-d_darkGray">{nextProject.data.title[0].text}</h2>
        </a>
    {/if}
</div>
