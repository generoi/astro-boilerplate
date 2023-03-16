// @see https://developer.wordpress.org/rest-api/reference/pages/
import type Page from "../../types/page.interface";
import fetchApi from "../fetch";
import parseLinkHeader from "parse-link-header";

export async function getPages(lang: string) {
	const response = await fetchApi('/wp-json/wp/v2/pages', {per_page: 100, lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}: ${response.statusText}`);
	}

	let result: Array<Page> = await response.json();
	let links = parseLinkHeader(response.headers.get('link'));

	while (links?.next?.url) {
		const response = await fetchApi(links.next.url);
		result = [
			...result,
			...await response.json(),
		];
		links = parseLinkHeader(response.headers.get('link'));
	}

	return result;
}

export async function getPage(slug: string, lang: string) {
	const response = await fetchApi('/wp-json/wp/v2/pages', {per_page: 1, slug, lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}`);
	}

	const result: Array<Page> = await response.json();
	return result[0] || null;
}

export async function getPreview(id: number) {
	const response = await fetchApi(`/wp-json/wp/v2/pages/${id}/revisions`, {per_page: 1});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}`);
	}

	const result: Array<Page> = await response.json();
	return result[0] || null;
}