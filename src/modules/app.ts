import * as tb from "@sinclair/typebox";
import * as Bridge from "../bridge/index.js";

const APP_INFO_SCHEMA = tb.Type.Object({
    versionName: tb.Type.String(),
    versionCode: tb.Type.Number(),
})

export type AppInfo = tb.Static<typeof APP_INFO_SCHEMA>;

export async function getAppInfo(): Promise<AppInfo> {
    return Bridge.transact("app:info", "", APP_INFO_SCHEMA);
}
