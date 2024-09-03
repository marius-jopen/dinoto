<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import RelatedProjects from '$lib/components/related-projects.svelte';
	import NextProject from '$lib/components/next-project.svelte';

	export let data;

	console.log(data)
</script>

<Header data={data.navigation_top} />
<SliceZone slices={data.page.data.slices} {components} />
<RelatedProjects />
<NextProject />
<Footer data={data.navigation_bottom} />
