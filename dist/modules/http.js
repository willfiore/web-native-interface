import * as tb from "@sinclair/typebox";
import * as Bridge from "../bridge/index.js";
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
export async function request(opts) {
    return Bridge.transact("http:request", JSON.stringify(opts), HTTP_REQUEST_RESULT_SCHEMA);
}
//# sourceMappingURL=http.js.map