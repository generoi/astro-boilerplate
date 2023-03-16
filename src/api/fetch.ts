interface Params {
	[key: string]: string | number | undefined;
}

export async function fetchClient(path: string, params?: Params, options?: RequestInit) {
	const url = path.includes('://') ? path : `${import.meta.env.PUBLIC_BACKEND_API_URL}${path}`;
	const endpoint = new URL(url);

	endpoint.search = new URLSearchParams({
		...Object.entries(endpoint.searchParams),
		...params,
	}).toString();

	const headers = {
		'Content-Type':'application/json',
	};

	const response = await fetch(endpoint, {
		headers,
		...options,
	});

	if (response.status >= 400 && response.status < 500) {
		const result = await response.json();
		if (result.code) {
			console.log(result);
			throw new Error(`${result.code}: ${result.message}`);
		}
	}
	if (response.status >= 400) {
		throw new Error(`${response.status} on ${endpoint}: ${response.statusText}`);
	}

	return response;
}

export default async function fetchApi(path: string, params?: Params, options?: RequestInit) {
	const url = path.includes('://') ? path : `${import.meta.env.BACKEND_API_URL}${path}`;
	const endpoint = new URL(url);

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

	if (response.status >= 400 && response.status < 500) {
		const result = await response.json();
		if (result.code) {
			console.log(result);
			throw new Error(`${result.code}: ${result.message}`);
		}
	}
	if (response.status >= 400) {
		throw new Error(`${response.status} on ${endpoint}: ${response.statusText}`);
	}

	return response;
}