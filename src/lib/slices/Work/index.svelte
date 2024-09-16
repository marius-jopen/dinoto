<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { workStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import ProjectItem from '$lib/components/project-item.svelte';

	export let slice: Content.WorkSlice;

	let work = get(workStore);

	console.log(work)

	// Create a new array by mapping slice.primary.items to work projects
	let matchedProjects = slice.primary.items
		.map((item) => {
			// Find the project in the workStore by id
			return work.find((project) => project.id === item.project.id);
		})
		// Filter out any null or undefined results
		.filter(Boolean);
</script>

<section class="box">
	<div class="grid grid-cols-2 gap-4">
		{#if matchedProjects.length > 0}
			{#each matchedProjects as project}
				<ProjectItem data={project} />
			{/each}
		{:else}
			<p>No matching projects found.</p>
		{/if}
	</div>
</section>
