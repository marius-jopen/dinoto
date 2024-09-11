<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from "@prismicio/svelte";

	export let slice: Content.Opener1Slice;
</script>

<section class="box">
	<div class="rounded-3xl relative w-full mb-8">
		<div class="flex justify-end">
			<PrismicImage class="w-7/12 h-auto rounded-3xl" field={slice.primary.image} />
		</div>

		<div class="bg-d_lightGray h-full w-1/2 absolute top-0 left-0 rounded-3xl text-d_black py-4 px-4">
			<PrismicRichText field={slice.primary.text} />
		</div>
	</div>

	<div class="w-full rounded-3xl bg-d_lightGreen text-d_black text-center py-8 px-8">
		<h1>
			{slice.primary.headline}
		</h1>
	</div>
</section>
