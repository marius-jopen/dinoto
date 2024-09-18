<script>
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte'; // Import onMount to handle client-side logic
	import CardImage from '$lib/components/card-image.svelte';
	import CardText from '$lib/components/card-text.svelte';
	import CardVideo from '$lib/components/card-video.svelte';
	
	export let slice;
	
	// Change values here
	let offsetY = 60;
	let offsetX = -40; // -40, 0, 40
	let cardWidthPercentage = 0.5;  // Card width is 20% of the viewport
	let cardHeightPercentage = 0.5; // Card height is 40% of the card width
	let orderItemsReverse = true;
	let orderCardsTopDown = true;

	// Add an id to each item and reverse if necessary
	let items = slice.primary.items.map((item, index) => ({ ...item, id: index }));

	// Reverse the items array if the reverse flag is set
	if (orderItemsReverse) {
		items = items.reverse();
	}

	let cardWidth = 0;
	let cardHeight = 0;
	let totalHeight = 0;

	// Calculate dimensions only on the client side
	onMount(() => {
		cardWidth = (window.innerWidth * cardWidthPercentage);
		cardHeight = cardWidth * cardHeightPercentage;
		totalHeight = cardHeight + (items.length) * offsetY;

		// Recalculate dimensions on window resize
		window.addEventListener('resize', () => {
			cardWidth = (window.innerWidth * cardWidthPercentage);
			cardHeight = cardWidth * cardHeightPercentage;
			totalHeight = cardHeight + (items.length) * offsetY;
		});
	});

	function handleClick(clickedId) {
		// Find the index of the clicked card
		const index = items.findIndex(item => item.id === clickedId);
		// Move the items before the clicked item to the end of the stack
		const itemsToMove = items.slice(0, index + 1); // include clicked item
		const remainingItems = items.slice(index + 1);
		items = [...remainingItems, ...itemsToMove]; // Reorder the items
	}

	// Function to check if a card is in the visual front (top of the stack)
	function isCardInFront(index) {
		return index === items.length - 1; // The top card has the highest z-index
	}
</script>

<section class="box">
	<div class="w-full flex justify-center" style="height: {totalHeight}px;">
		<div 
		class="relative"
		style="width: {cardWidth}px;"
		>
			{#each items as card, index (card.id)}
				<div 
				on:click={() => handleClick(card.id)}
				animate:flip={{
					delay: 0,
					duration: 300
				}}
				style="
					transform: translate({offsetX * index}px, {offsetY * index}px); 
					z-index: {items.length + (orderCardsTopDown ? index : -index)};
					height: {cardHeight}px;
				"
				class="{isCardInFront(index) ? '' : 'cursor-pointer'} left-0 top-0 absolute w-full"
				>
					<CardImage data={card} status={isCardInFront(index) ? 'true' : 'false'} />
					<CardText data={card} status={isCardInFront(index) ? 'true' : 'false'} />
					<CardVideo data={card} status={isCardInFront(index) ? 'true' : 'false'} />
				</div>
			{/each}
		</div>
	</div>
</section>