const isClientSide = typeof document !== 'undefined';

export function getCookie(name: string) {
	if (!isClientSide) {
		return '';
	}
	const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
	return value;
}

export function setCookie(name: string, value: string, maxAge: number) {
	if (!isClientSide) {
		return '';
	}
	name = encodeURIComponent(name);
	value = encodeURIComponent(value);
	document.cookie = `${name}=${value}; path=/; expires=${maxAge}`
}

