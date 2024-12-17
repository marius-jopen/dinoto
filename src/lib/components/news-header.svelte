<script lang="ts">
	import { PrismicImage, PrismicRichText } from "@prismicio/svelte";

	export let data;
</script>

<section data-aos="fade-up" class="box pt-4 pb-16">
	<div class="flex gap-4 flex-col md:flex-row">
		<div class="w-full">
			<PrismicImage class="h-full w-full object-cover rounded-2xl md:rounded-3xl overflow-hidden" field={data.image} />
		</div>

		<div class="w-full flex flex-col justify-center bg-white rounded-2xl md:rounded-3xl overflow-hidden py-8 md:py-0">
		
			<h1 class="text-center">
				{data.title[0].text}
			</h1>


			<div class="text-center pt-4">
				{data.teaser[0].text}
			</div>


			<div class="text-center text-black/50 pb-2 pt-6 text-sm">
				{data.date}
			</div>

		</div>
	</div>
</section>
