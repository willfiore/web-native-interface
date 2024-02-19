import * as tbv from "@sinclair/typebox/value";
export function parseJsonString(value, schema) {
    if (value === undefined) {
        return { success: false, error: { type: "json_parse_failed" } };
    }
    let obj;
    try {
        obj = JSON.parse(value);
    }
    catch (err) {
        return { success: false, error: { type: "json_parse_failed" } };
    }
    if (!tbv.Value.Check(schema, obj)) {
        const errors = [...tbv.Value.Errors(schema, obj)];
        return { success: false, error: { type: "json_validate_failed", errors } };
    }
    return { success: true, value: obj };
}
//# sourceMappingURL=utility.js.map