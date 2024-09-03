<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import RelatedProjects from '$lib/components/related-projects.svelte';
	import NextProject from '$lib/components/next-project.svelte';
	import { workStore } from '$lib/stores'; // Import the store

	export let data;

	let work = data.work;

	workStore.set(work);

	console.log(data)
</script>

<Header data={data.navigation_top} />
<SliceZone slices={data.page.data.slices} {components} />
<RelatedProjects />
<NextProject />
<Footer data={data.navigation_bottom} />
