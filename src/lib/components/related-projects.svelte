<script>
    // Import the store and get function
    import { workStore } from '$lib/stores';
    import { get } from 'svelte/store';
    import ProjectItem from '$lib/components/project-item.svelte';

    // Props and variables
    export let data;

    console.log(data);

    let currentId = data.page.id;  // Use id instead of uid
    let work = get(workStore);
    data = data.page.data;

    // Function to select a random project except the current one
    function getRandomProject(exceptId) {
        const availableProjects = work.filter(project => project.id !== exceptId && project.id !== currentId);
        if (availableProjects.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableProjects.length);
        return availableProjects[randomIndex];
    }

    // Get the selected project (if any) from the data
    let selectedProjectId = data ? data.id : null;

    // Find the related projects
    let relatedProject1 = data.related_work_1 ? work.find(project => project.id === data.related_work_1.id) : null;
    let relatedProject2 = data.related_work_2 ? work.find(project => project.id === data.related_work_2.id) : null;

    // If no related projects are found, pick random ones excluding the current one
    if (!relatedProject1) {
        relatedProject1 = getRandomProject(selectedProjectId);
    }

    if (!relatedProject2) {
        relatedProject2 = getRandomProject(relatedProject1 ? relatedProject1.id : selectedProjectId);
    }
</script>

<div class="box mt-8 mb-8">
    <div class="flex-col lg:flex-row flex gap-8">
        {#if relatedProject1}
            <div class="w-full">
                <ProjectItem data={relatedProject1} />
            </div>
        {/if}
    
        {#if relatedProject2}
            <div class="w-full">
                <ProjectItem data={relatedProject2} />
            </div>
        {/if}
    </div>
</div>
