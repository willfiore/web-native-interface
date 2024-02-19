import * as tb from "@sinclair/typebox";
export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type HttpRequestOpts = {
    url: string;
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: string;
};
declare const HTTP_RESPONSE_SCHEMA: tb.TObject<{
    statusCode: tb.TInteger;
    body: tb.TOptional<tb.TString>;
}>;
declare const HTTP_REQUEST_RESULT_SCHEMA: tb.TUnion<[tb.TObject<{
    type: tb.TLiteral<"success">;
    response: tb.TObject<{
        statusCode: tb.TInteger;
        body: tb.TOptional<tb.TString>;
    }>;
}>, tb.TObject<{
    type: tb.TLiteral<"error">;
}>]>;
export type HttpResponse = tb.Static<typeof HTTP_RESPONSE_SCHEMA>;
export type HttpRequestResult = tb.Static<typeof HTTP_REQUEST_RESULT_SCHEMA>;
export declare function request(opts: HttpRequestOpts): Promise<HttpRequestResult>;
export {};
