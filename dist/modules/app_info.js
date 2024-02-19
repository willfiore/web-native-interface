import * as tb from "@sinclair/typebox";
import * as Bridge from "../bridge/index.js";
const APP_INFO_SCHEMA = tb.Type.Object({
    versionName: tb.Type.String(),
    versionCode: tb.Type.Number(),
});
export async function getAppInfo() {
    return Bridge.transact("app:info", "", APP_INFO_SCHEMA);
}
//# sourceMappingURL=app_info.js.map