interface Params {
	[key: string]: string | number;
}

export default async function fetchApi(path: string, params?: Params, options?: RequestInit) {
	const endpoint = new URL(`${import.meta.env.BACKEND_API_URL}${path}`);

	endpoint.search = new URLSearchParams({
		...Object.entries(endpoint.searchParams),
		...params,
	}).toString();

	const headers = {
		'Content-Type':'application/json',
		'Authorization': 'Basic ' + btoa(`${import.meta.env.BACKEND_API_USERNAME}:${import.meta.env.BACKEND_API_PASSWORD}`),
	};

	const response = await fetch(endpoint, {
		headers,
		...options,
	});

	if (response.status >= 400) {
		throw new Error(`${response.status}: ${response.statusText}`);
	}

	return response;
}
