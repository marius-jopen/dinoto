<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.HeadlineSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	<h2 class="text-center md:text-left border-d_darkGray border-t border-b py-4 lg:flex gap-4 md:pl-[35%] lg:pl-0 ">
		<div>
			{slice.primary.text_1}
		</div>

		<div class="text-d_darkGray">
			{slice.primary.text_2}
		</div>
	</h2>
</section>
