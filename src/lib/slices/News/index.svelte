<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { newsStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import NewsArticle from '$lib/components/news-article.svelte';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.NewsSlice;
	
	let news = get(newsStore);
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

	console.log(news)

	// Create a new array by mapping slice.primary.items to work projects
	let matchedProjects = slice.primary.items
		.map((item) => {
			// Find the project in the workStore by id
			return news.find((news_article) => news_article.id === item.news_article.id);
		})
		// Filter out any null or undefined results
		.filter(Boolean);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<div class="pb-8">
		{#if matchedProjects.length > 0}
			{#each matchedProjects as project, index}
				<NewsArticle data={project} index={index} />
			{/each}
		{:else}
			<p>No matching projects found.</p>
		{/if}
	</div>
</section>
