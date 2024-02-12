export function getQueryString (obj: any) {
    let objects = Object.keys(obj).filter(key => obj[key] !== undefined);
    return `?${objects.map((key) => `${key}=${obj[key]}`).join('&')}`;
}