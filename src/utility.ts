import * as tb from "@sinclair/typebox";
import * as tbv from "@sinclair/typebox/value";

type ParseJsonStringError =
| { type: "json_parse_failed" }
| { type: "json_validate_failed", errors: tbv.ValueError[] }

type ParseJsonStringResult<T> =
| { success: true, value: T }
| { success: false, error: ParseJsonStringError };

export function parseJsonString<TSchema extends tb.TSchema>(value: string | undefined, schema: TSchema): ParseJsonStringResult<tb.Static<TSchema>> {
    if (value === undefined) {
        return { success: false, error: { type: "json_parse_failed" }};
    }

    let obj: unknown;

    try {
        obj = JSON.parse(value);
    } catch (err: unknown) {
        return { success: false, error: { type: "json_parse_failed" } };
    }

    if (!tbv.Value.Check(schema, obj)) {
        const errors = [...tbv.Value.Errors(schema, obj)];
        return { success: false, error: { type: "json_validate_failed", errors } };
    }

    return { success: true, value: obj };
}
