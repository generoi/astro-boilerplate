import type Menu from "../../types/menu.interface";
import fetchApi from "../fetch";

export async function getMenu(location: string, lang: string) {
	const response = await fetchApi(`/wp-json/menus/v1/locations/${location}`, {lang});
	if (response.status !== 200) {
		throw new Error(`Unexpected status code ${response.status}`);
	}

	const result: Menu = await response.json();

	for (const item of result.items) {
		item.url = item.url.replace(import.meta.env.BACKEND_API_URL, '');
	}

	return result;
}
  