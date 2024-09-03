<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let data;

	console.log(data)
</script>

<Header data={data.navigation_top} />
<SliceZone slices={data.page.data.slices} {components} />
<Footer data={data.navigation_bottom} />
