<script>
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import CardImage from '$lib/components/card-image.svelte';
	import CardText from '$lib/components/card-text.svelte';
	import CardVideo from '$lib/components/card-video.svelte';
	import { getDistanceTop, getDistanceBottom } from '../../components/distances';

	export let slice;
	
	// Initial settings for card layout
	let orderItemsReverse = slice.primary.order_top_bottom ? true : false;
	let orderCardsTopDown = slice.primary.stacking_top_bottom ? false : true;
	let screenWidth = 1400;
	const screenBreakpoint = 1200;

	let cardHeightPercentage = 0.5;
	let align = "justify-center";

	// Get current screen width
	onMount(() => {
		screenWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			screenWidth = window.innerWidth;
		});
	});

	$: {
		if (slice.primary.height == 's') {
			if (screenWidth >= screenBreakpoint) {
				cardHeightPercentage = 0.3;
			} else {
				cardHeightPercentage = 0.6;
			}
		} else if (slice.primary.height == 'm') {
			if (screenWidth >= screenBreakpoint) {
				cardHeightPercentage = 0.4;
			} else {
				cardHeightPercentage = 0.7;
			}
		} else if (slice.primary.height == 'l') {
			if (screenWidth >= screenBreakpoint) {
				cardHeightPercentage = 0.5;
			} else {
				cardHeightPercentage = 0.8;
			}
		} else if (slice.primary.height == 'xl') {
			if (screenWidth >= screenBreakpoint) {
				cardHeightPercentage = 0.6;
			} else {
				cardHeightPercentage = 0.9;
			}
		} else if (slice.primary.height == 'xxl') {
			if (screenWidth >= screenBreakpoint) {
				cardHeightPercentage = 0.8;
			} else {
				cardHeightPercentage = 1.1;
			}
		}
	}

	// Set offset based on direction
	let offsetY = 60;
	let offsetX = -40; 
	let cardWidthPercentage = 0.6;

	if (slice.primary.direction == 'left_big') {
		align = "justify-start";
		offsetY = 80;
		offsetX = 40;
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'left_small') {
		align = "justify-center";
		offsetY = 80;
		offsetX = -40;
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'center_big') {
		align = "justify-center";
		offsetY = 100;
		offsetX = 0; 
		cardWidthPercentage = 1;  
	} else if (slice.primary.direction == 'center_small') {
		align = "justify-center";
		offsetY = 80;
		offsetX = 0;
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'right_big') {
		align = "justify-end";
		offsetY = 80;
		offsetX = -40;
		cardWidthPercentage = 0.6;  
	} else if (slice.primary.direction == 'right_small') {
		align = "justify-center";
		offsetY = 80;
		offsetX = -40;
		cardWidthPercentage = 0.6;  
	}

	// Map items and assign IDs
	let items = slice.primary.items.map((item, index) => ({ ...item, id: index, status: false }));

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

		window.addEventListener('resize', () => {
			cardWidth = (window.innerWidth * cardWidthPercentage);
			cardHeight = cardWidth * cardHeightPercentage;
			totalHeight = cardHeight + (items.length) * offsetY;
		});
	});

	// Move the clicked card to the front and update `status`
	function handleClick(clickedId) {
		const index = items.findIndex(item => item.id === clickedId);
		const itemsToMove = items.slice(0, index + 1);
		const remainingItems = items.slice(index + 1);
		items = [...remainingItems, ...itemsToMove];

		// Set `status` to `true` for the front card and `false` for all others
		items = items.map((item, idx) => ({
			...item,
			status: idx === items.length - 1 // Only the front card should have `status` as `true`
		}));
	}

	// Function to check if a card is in the visual front (top of the stack)
	function isCardInFront(index) {
		return index === items.length - 1;
	}
</script>


<section data-aos="fade-up" class=" {slice.primary.narrow ? 'box-narrow' : 'box'} {distanceTop} {distanceBottom}">
	<div class="hidden w-full md:flex {align}" style="height: {totalHeight}px;">
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
					<CardImage aos={index * 300} data={card} status={card.status} />
					<CardText aos={index * 300} data={card} status={card.status} />
					<CardVideo aos={index * 300} data={card} status={card.status} />
				</div>
			{/each}
		</div>
	</div>

	<div class="md:hidden">
		{#each items as card, index (card.id)}
			<div class="mb-4">
				<CardImage aos={index * 300} data={card} status={card.status} />
				<CardText aos={index * 300} data={card} status={card.status} />
				<CardVideo aos={index * 300} data={card} status={card.status} />
			</div>
		{/each}
	</div>
</section>
