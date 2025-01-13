<script lang="ts">
	console.log("PROJECT MOUSEOVER LOADED")

	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';
	import ProjectItem from '$lib/components/project-item.svelte';
	import { workStore } from '$lib/stores';
	import { get } from 'svelte/store';

	export let slice: Content.ProjectMouseoverSlice;
	
	let work = get(workStore);
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	function getProjectById(id) {
		return work.find(project => project.id === id);
	}

	let mouseX = 0;
	let mouseY = 0;
	let isHovering = false;
	let parentElement;

	function handleMouseMove(event) {
		const rect = parentElement.querySelector('.hover-area').getBoundingClientRect();
		const parentRect = parentElement.getBoundingClientRect();
		
		// Check if mouse is within the hover area
		if (event.clientX >= rect.left && event.clientX <= rect.right &&
			event.clientY >= rect.top && event.clientY <= rect.bottom) {
			mouseX = event.clientX - parentRect.left;
			mouseY = event.clientY - parentRect.top;
			isHovering = true;
		} else {
			isHovering = false;
			mouseX = 0;
			mouseY = 0;
		}
	}

	function handleMouseLeave() {
		isHovering = false;
	}
</script>

<section
    bind:this={parentElement}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    data-aos="fade-up"
    class="box {distanceTop} {distanceBottom} relative"
>
    <div class="hover-area">
		{#if slice.primary.text}
			<div class="box-narrow">
				<div class="hxl" >
					{slice.primary.text}
				</div>
			</div>
		{/if}
    </div>

	{#if slice.primary.project.id}
		<div
			class="hidden md:block absolute -ml-10 -mt-10 z-50 w-1/3 lg:w-1/4 opacity-0 "
			class:opacity-100={isHovering}
			style="top: {mouseY}px; left: {mouseX}px; pointer-events: none;"
		>
			<ProjectItem hidecaption={true} cloud={false} list={true} data={getProjectById(slice.primary.project.id)} />
		</div>

		<div class="md:hidden pt-10">
			<ProjectItem hidecaption={true} cloud={false} list={true} data={getProjectById(slice.primary.project.id)} />
		</div>
	{/if}
</section>