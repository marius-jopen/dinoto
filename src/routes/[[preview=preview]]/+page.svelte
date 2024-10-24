<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import Footer from '$lib/components/footer.svelte';
	import { workStore } from '$lib/stores';
	import { backgroundColor, textColor } from '../../lib/components/color-styles';
	import MobileHeader from '$lib/components/mobile-header.svelte';

	export let data;

	let work = data.work;
	let styleClass
	
	$: styleClass = backgroundColor(data.page.data.background);
	$: styleTextClass = textColor(data.page.data.logoColor);
	
	workStore.set(work);

	console.log(data)
</script>

{#key data}
	<div class="{styleClass}">
		<div class="block md:hidden ">
			<MobileHeader style={styleTextClass} items={data.navigation_top.data.navigation} />
		</div>

		<SliceZone slices={data.page.data.slices} {components} />
		<Footer style={styleTextClass} data={data.navigation_bottom} />
	</div>
{/key}
