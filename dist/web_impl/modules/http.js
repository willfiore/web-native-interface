import { postTransactionResponse } from "../index.js";
async function performRequest(opts) {
    let fetchResponse;
    try {
        fetchResponse = await fetch(opts.url, {
            method: opts.method,
            body: opts.body,
            headers: opts.headers,
            credentials: "include",
        });
    }
    catch (err) {
        return { type: "error" };
    }
    return {
        type: "success",
        response: {
            statusCode: fetchResponse.status,
            body: await fetchResponse.text().catch(() => undefined),
        }
    };
}
export async function handleHttpRequest(t, payload) {
    const opts = JSON.parse(payload);
    const res = await performRequest(opts);
    // post back!
    postTransactionResponse(t, JSON.stringify(res));
}
//# sourceMappingURL=http.js.map