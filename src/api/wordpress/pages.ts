// @see https://developer.wordpress.org/rest-api/reference/pages/
import type Page from "../../types/page.interface";
import fetchApi from "../fetch";

export async function getPages(lang: string) {
	const response = await fetchApi('/wp-json/wp/v2/pages', {per_page: 100, lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}: ${response.statusText}`);
	}

	const result: Array<Page> = await response.json();
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
  