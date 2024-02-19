import * as uuid from "uuid";
import * as http from "./modules/http.js";
import * as app from "./modules/app.js";

function transactionRequest(type: string, payload: string): string {
    const t = uuid.v4(); // transaction id

    // run on the next tick, to allow the promise to be set up with the
    // transaction ID.
    setTimeout(() => {
        switch (type) {
            case "http:request": http.handleHttpRequest(t, payload); break;
            case "app:info": app.handleAppInfo(t); break;
            default: throw new Error(`unhandled transcation request type ${type}`);
        }
    })

    return t;
}

export function postTransactionResponse(transaction_id: string, payload: string) {
    window.__WNI_NATIVE_TO_WEB.transactionResponse(transaction_id, payload);
}

export function postNativeEvent(type: string, payload: string) {
    window.__WNI_NATIVE_TO_WEB.nativeEvent(type, payload);
}

export function initWebPlatformImpl() {
    window.__WNI_WEB_TO_NATIVE = {
        transactionRequest,
    }
}
