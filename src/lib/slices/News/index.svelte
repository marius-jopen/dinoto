<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice: Content.NewsSlice;
	
	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);
</script>

<section data-aos="fade-up" class="box {distanceTop} {distanceBottom}">
	NEWS
</section>

