// @see https://woocommerce.github.io/woocommerce-rest-api-docs/?php#products

import parseLinkHeader from "parse-link-header";
import type Product from "../../types/product.interface";
import fetchApi from "../fetch";

export async function getProducts(lang: string) {
	const response = await fetchApi('/wp-json/wc/v3/products', {per_page: 100, lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}`);
	}

	let result: Array<Product> = await response.json();
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
  
export async function getProduct(slug: string, lang: string) {
	const response = await fetchApi('/wp-json/wc/v3/products', {per_page: 1, slug, lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}`);
	}

	const result: Array<Product> = await response.json();
	return result[0] || null;
}
  