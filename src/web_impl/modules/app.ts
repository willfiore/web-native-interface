import { postTransactionResponse } from "../index.js";

export async function handleAppInfo(t: string): Promise<void> {
    const appInfo = {
        versionName: "0.0",
        versionCode: 1,
    }

    postTransactionResponse(t, JSON.stringify(appInfo));
}
