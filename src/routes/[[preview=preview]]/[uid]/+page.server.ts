import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	const page = await client.getByUID('page', params.uid);
	const navigation_top = await client.getSingle('navigation_top');
	const navigation_bottom = await client.getSingle('navigation_bottom');
	const work = await client.getAllByType('work');

	return {
		page,
		navigation_top,
		navigation_bottom,
		work,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('page');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
