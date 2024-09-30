<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.HeadlineSlice;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section class="box {distanceTop} {distanceBottom}">
	<h2 class="border-d_darkGray border-t border-b py-4">
		{slice.primary.text_1}

		<span class="text-d_darkGray">
			{slice.primary.text_2}
		</span>
	</h2>
</section>
