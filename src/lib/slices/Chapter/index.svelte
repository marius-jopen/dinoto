<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { textColor } from '../../components/color-styles';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.ChapterSlice;
	
	let styleClass = textColor(slice.primary.color);
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

    function scrollToTop(event: MouseEvent) {
        const section = (event.target as Element).closest('section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<section data-aos="fade-up" class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="flex justify-between w-full border-b pb-8 mb-4" style="border-color: {styleClass}">
		<div class="flex flex-col justify-end" style="color: {styleClass}">
			<p>
				{slice.primary.text}
			</p>
		</div>
	
		<svg 
			on:click={scrollToTop}
			class="mt-2 md:mt-0 h-6 md:h-10 w-auto cursor-pointer" 
			viewBox="0 0 61 69" 
			fill="{styleClass}" 
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M26.08 3.47C25.93 1.13 28.27 0 30.08 0C31.89 0 34.08 1.06 34.08 3.39L31.06 59.71C34.98 52.17 46.89 34 54.28 34C58.35 34 60.16 37.92 60.16 40.86C41.99 45.54 33.09 60.01 30.23 68.38H29.93C27.14 60.01 18.24 45.54 0 40.86C0 37.92 1.89 34 5.96 34C13.35 34 25.26 52.17 29.18 59.71L26.08 3.47Z" fill="{styleClass}"/>
		</svg>
	</div>
</section>
