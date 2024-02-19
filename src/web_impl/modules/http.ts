import { HttpRequestOpts, HttpRequestResult } from "../../modules/http.js";
import { postTransactionResponse } from "../index.js";

async function performRequest(opts: HttpRequestOpts): Promise<HttpRequestResult> {
    let fetchResponse: Response;

    try {
        fetchResponse = await fetch(opts.url, {
            method: opts.method,
            body: opts.body,
            headers: opts.headers,
            credentials: "include",
        });
    } catch (err: unknown) {
        return { type: "error" };
    }

    return {
        type: "success",
        response: {
            statusCode: fetchResponse.status,
            body: await fetchResponse.text().catch(() => undefined),
        }
    }
}

export async function handleHttpRequest(t: string, payload: string): Promise<void> {
    const opts = JSON.parse(payload) as HttpRequestOpts;
    const res = await performRequest(opts);

    // post back!
    postTransactionResponse(t, JSON.stringify(res));
}