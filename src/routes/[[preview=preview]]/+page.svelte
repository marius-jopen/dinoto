<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Footer from '$lib/components/footer.svelte';
	import { workStore, newsStore } from '$lib/stores';
	import { backgroundColor, textColor } from '../../lib/components/color-styles';
	import MobileHeader from '$lib/components/mobile-header.svelte';
	import Header from '$lib/components/header.svelte';

	export let data;

	let work = data.work;
	let news = data.news;
	
	let styleClass
	
	$: styleClass = backgroundColor(data.page.data.background);
	$: styleTextClass = textColor(data.page.data.logoColor);
	
	workStore.set(work);
	newsStore.set(news);
	console.log(data)

	let showHeader = false;

	// Set a timeout to show the header after 1 second
	setTimeout(() => {
		showHeader = true;
	}, 1000);
</script>

{#key data}
	<div class="{styleClass}">
		{#if showHeader}
			<div class="hidden md:block ">
				<Header style={styleTextClass} place="home" items={data.navigation_top.data.navigation} />
			</div>
		{/if}

		<div class="block md:hidden ">
			<MobileHeader style={styleTextClass} items={data.navigation_top.data.navigation} />
		</div>

		<SliceZone slices={data.page.data.slices} {components} />
		<Footer style={styleTextClass} data={data.navigation_bottom} />
	</div>
{/key}
