<script>
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte'; // Import onMount to handle client-side logic
	import CardImage from '$lib/components/card-image.svelte';
	import CardText from '$lib/components/card-text.svelte';
	import CardVideo from '$lib/components/card-video.svelte';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice;
	
	// Change values here
	let orderItemsReverse = slice.primary.order_top_bottom ? true : false;
	let orderCardsTopDown = slice.primary.stacking_top_bottom ? false : true;

	let cardHeightPercentage = 0.5; 
	let align = "justify-center"

	if (slice.primary.height == 's') {
		cardHeightPercentage = 0.2; 
	} else if (slice.primary.height == 'm') {
		cardHeightPercentage = 0.4; 
	} else if (slice.primary.height == 'l') {
		cardHeightPercentage = 0.5; 
	} else if (slice.primary.height == 'xl') {
		cardHeightPercentage = 0.6; 
	} else if (slice.primary.height == 'xxl') {
		cardHeightPercentage = 0.8; 
	}

	let offsetY = 60;
	let offsetX = -40; 
	let cardWidthPercentage = 0.6;  

	if (slice.primary.direction == 'left_big') {
		align = "justify-start"
		offsetY = 60;
		offsetX = 40; 
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'left_small') {
		align = "justify-center"
		offsetY = 60;
		offsetX = -40; 
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'center_big') {
		align = "justify-center"
		offsetY = 100;
		offsetX = 0; 
		cardWidthPercentage = 1;  
	} else if (slice.primary.direction == 'center_small') {
		align = "justify-center"
		offsetY = 60;
		offsetX = 0; 
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'right_big') {
		align = "justify-end"
		offsetY = 60;
		offsetX = -40; 
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'right_small') {
		align = "justify-center"
		offsetY = 60;
		offsetX = -40; 
		cardWidthPercentage = 0.6;  
	}

	// Add an id to each item and reverse if necessary
	let items = slice.primary.items.map((item, index) => ({ ...item, id: index }));

	// Reverse the items array if the reverse flag is set
	if (orderItemsReverse) {
		items = items.reverse();
	}

	let cardWidth = 0;
	let cardHeight = 0;
	let totalHeight = 0;

	let distanceTop = getDistanceTop(slice.primary.distance_top);
    let distanceBottom = getDistanceBottom(slice.primary.distance_bottom);

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

<section class="box {distanceTop} {distanceBottom}">
	<div class="w-full flex {align}" style="height: {totalHeight}px;">
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
					<CardImage data={card} status={isCardInFront(index) ? true : false} />
					<CardText data={card} status={isCardInFront(index) ? true : false} />
					<CardVideo data={card} status={isCardInFront(index) ? true : false} />
				</div>
			{/each}
		</div>
	</div>
</section>