<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { workStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import ProjectItem from '$lib/components/project-item.svelte';
	import ProjectItemList from '$lib/components/project-item-list.svelte';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.WorkSlice;

	let work = get(workStore);
	let showList1 = true; // Boolean variable to toggle between lists
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	console.log(work)

	// Create a new array by mapping slice.primary.items to work projects
	let matchedProjects = slice.primary.items
		.map((item) => {
			// Find the project in the workStore by id
			return work.find((project) => project.id === item.project.id);
		})
		// Filter out any null or undefined results
		.filter(Boolean);

	// Toggle between the two lists
	function toggleList() {
		showList1 = !showList1;
	}
</script>

<section class="box {distanceTop} {distanceBottom}">
	<!-- Toggle Button -->
	<div class="w-full justify-center pb-16 hidden md:flex">
		<button on:click={toggleList} class="text-black flex gap-12 rounded-full bg-d_mediumGray px-8 py-3 relative">
			<div class="z-20">
				Grid
			</div>

			<div class="z-20">
				List
			</div>

			<div class="absolute z-10 top-0 left-0 h-full w-full flex {showList1 ? "justify-start" : "justify-end"}">
				<div class="w-[calc(50%+10px)] bg-white rounded-full h-full">
				</div>
			</div>
		</button>
	</div>

	<!-- Show List 1 -->
	{#if showList1}
		<div>
			{#if matchedProjects.length > 0}
				<!-- First item, full width -->
				<div class="full-width mb-8">
					<ProjectItem data={matchedProjects[0]} />
				</div>
		
				<!-- Two-column grid for remaining items -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
					{#each matchedProjects.slice(1) as project}
						<ProjectItem data={project} />
					{/each}
				</div>
			{:else}
				<p>No matching projects found.</p>
			{/if}
		</div>
	{:else}
		<!-- Show List 2 -->
		<div class="flex flex-col divide-d_darkGray divide-y border-y border-d_darkGray">
			{#if matchedProjects.length > 0}
				{#each matchedProjects as project}
					<ProjectItemList data={project} />
				{/each}
			{:else}
				<p>No matching projects found.</p>
			{/if}
		</div>
	{/if}
</section>
