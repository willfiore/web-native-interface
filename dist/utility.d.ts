import * as tb from "@sinclair/typebox";
import * as tbv from "@sinclair/typebox/value";
type ParseJsonStringError = {
    type: "json_parse_failed";
} | {
    type: "json_validate_failed";
    errors: tbv.ValueError[];
};
type ParseJsonStringResult<T> = {
    success: true;
    value: T;
} | {
    success: false;
    error: ParseJsonStringError;
};
export declare function parseJsonString<TSchema extends tb.TSchema>(value: string | undefined, schema: TSchema): ParseJsonStringResult<tb.Static<TSchema>>;
export {};
