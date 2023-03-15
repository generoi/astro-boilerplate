export default async function fetchApi(path: string, options?: RequestInit) {
	const endpoint = `${import.meta.env.BACKEND_API_URL}${path}`;
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
