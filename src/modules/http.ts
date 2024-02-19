import * as tb from "@sinclair/typebox";
import * as Bridge from "../bridge/index.js";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type HttpRequestOpts = {
    url: string,
    method?: HttpMethod,
    headers?: Record<string, string>,
    body?: string,
}

const HTTP_RESPONSE_SCHEMA = tb.Type.Object({
    statusCode: tb.Type.Integer({ minimum: 0 }),
    body: tb.Type.Optional(tb.Type.String()),
});

const HTTP_REQUEST_RESULT_SCHEMA = tb.Type.Union([
    // Success
    tb.Type.Object({
        type: tb.Type.Literal("success"),
        response: HTTP_RESPONSE_SCHEMA,
    }),

    // Error
    tb.Type.Object({
        type: tb.Type.Literal("error"),
    })
]);

export type HttpResponse = tb.Static<typeof HTTP_RESPONSE_SCHEMA>;
export type HttpRequestResult = tb.Static<typeof HTTP_REQUEST_RESULT_SCHEMA>;

export async function request(opts: HttpRequestOpts): Promise<HttpRequestResult> {
    return Bridge.transact("http:request", JSON.stringify(opts), HTTP_REQUEST_RESULT_SCHEMA);
}