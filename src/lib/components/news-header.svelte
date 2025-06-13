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
		
			<h2 class="px-6 md:px-8">
				{data.title[0].text}
			</h2>

			{#if data.teaser[0].text}
				<div class="pt-8 text-xl pl-6 md:px-8">
					{data.teaser[0].text}
				</div>
			{/if}

			<div class="flex gap-4 pl-6 md:px-8 items-center {data.logo.url ? '' : 'pt-6'}">
				{#if data.logo.url}
					<PrismicImage field={data.logo} class="h-16 w-auto" />
				{/if}
	
				<div class="text-black/50 h-full text-sm flex items-center">
					{data.date}
				</div>
			</div>
		</div>
	</div>
</section>
