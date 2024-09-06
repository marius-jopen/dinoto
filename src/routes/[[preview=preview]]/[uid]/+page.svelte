<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { workStore } from '$lib/stores';
	import { backgroundColor } from '../../../lib/components/color-styles';

	export let data;

	let work = data.work;
	let styleClass
	
	$: styleClass = backgroundColor(data.page.data.background);
	
	workStore.set(work);


	console.log(data);
</script>

<div class="{styleClass}">
	<Header data={data.navigation_top} />
	<SliceZone slices={data.page.data.slices} {components} />
	<Footer data={data.navigation_bottom} />
</div>