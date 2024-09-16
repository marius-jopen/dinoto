<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from "@prismicio/svelte";

	export let slice: Content.TextBigSlice;

	let style = slice.primary.style
	let styleClass = ''
	
	if (style === 'Left') {
		styleClass = 'text-left w-[65%]'
	} else if (style === 'Right') {
		styleClass = 'text-right w-[65%]'
	} else if (style === 'Center') {
		styleClass = 'text-center w-[60%] mx-[20%]'
	} else if (style === 'Inline') {
		styleClass = 'text-left ml-[35%] w-[65%]'
	}
</script>

<section class="box">
	<div class="{styleClass} py-8 pb-12">
		<PrismicRichText field={slice.primary.text} />
	</div>
</section>