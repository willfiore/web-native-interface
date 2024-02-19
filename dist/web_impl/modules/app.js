import { postTransactionResponse } from "../index.js";
export async function handleAppInfo(t) {
    const appInfo = {
        versionName: "0.0",
        versionCode: 1,
    };
    postTransactionResponse(t, JSON.stringify(appInfo));
}
//# sourceMappingURL=app.js.map