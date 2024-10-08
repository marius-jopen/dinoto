<script lang="ts">
	import type { Content } from '@prismicio/client';
    import { PrismicLink } from '@prismicio/svelte'

	export let slice: Content.StickyNavigationSlice;
</script>

<section class="box">
	<div class="flex gap-4">
        {#each slice.primary.items as item}
            <nav>
                <PrismicLink field={item.link}>
                    {item.text}
                </PrismicLink>
            </nav>
        {/each}
    </div>
</section>
