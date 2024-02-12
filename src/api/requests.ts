import { Response } from "../domains/response";

const baseUrls = {
    local: "http://localhost:8080",
    production: "https://api.authdoc.com.br"
};

export function requests(baseUrl = baseUrls.local) {
    function handleUrl(url: string): string {
        return url.startsWith("/") ? baseUrl + url : url;
    }
    return {
        get: async function <T>(url: string, token: string | undefined = undefined): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            })
            const json = await response.json();
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
        },
        getFile: async function(url: string, token: string | undefined = undefined): Promise<Uint8Array> {
            const response = await fetch(handleUrl(url), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            })
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        },
        put: async function <T>(url: string, body: any, token: string | undefined = undefined): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            })
            const json = await response.json();
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
        },
        putFormData: async function <T>(url: string, body: FormData, token: string | undefined = undefined): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "PUT",
                body: body,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            })
            const json = await response.json();
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
        },
        post: async function <T>(url: string, body: any, token: string | undefined = undefined): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            });
            let json = await response.json()
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
            // .then((response) => response.json());
        },
        postFormData: async function <T>(url: string, body: FormData, token: string | undefined = undefined): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "POST",
                body: body,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
            })
            const json = await response.json();
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
        },
        delete: async function <T>(url: string): Promise<Response<T>> {
            const response = await fetch(handleUrl(url), {
                method: "DELETE",
            })
            const json = await response.json();
            return {
                status: response.status,
                payload: await json.payload,
                message: await json.message
            }
        }
    }
}
