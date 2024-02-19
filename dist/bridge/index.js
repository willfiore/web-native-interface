import { parseJsonString } from '../utility.js';
import { initWebPlatformImpl } from '../web_impl/index.js';
const _transactionResolvers = new Map();
const _platformEventListeners = new Map();
function transactionResponse(transactionId, payload) {
    const resolver = _transactionResolvers.get(transactionId);
    if (resolver === undefined) {
        console.warn("received transaction without pending resolver");
        return;
    }
    _transactionResolvers.delete(transactionId);
    resolver(payload);
}
function nativeEvent(type, payload) {
    const listeners = _platformEventListeners.get(type);
    listeners?.forEach(listener => listener(payload));
}
export function send(kind, payload) {
    window.__WNI_WEB_TO_NATIVE.transactionRequest(kind, payload);
}
export async function transact(kind, payload, responseSchema) {
    const transactionId = window.__WNI_WEB_TO_NATIVE.transactionRequest(kind, payload);
    let resolver = () => { };
    const promise = new Promise(r => { resolver = r; });
    _transactionResolvers.set(transactionId, resolver);
    const rawResponse = await promise;
    const response = parseJsonString(rawResponse, responseSchema);
    if (!response.success) {
        console.error("Bridge.transact response did not satisfy schema.");
        console.error(`Response: ${rawResponse}`);
        console.error(`Error: ${JSON.stringify(response.error, null, 2)}`);
        throw new Error("Bridge.transact response did not satisfy schema.");
    }
    return response.value;
}
export function addNativeEventListener(type, listener) {
    const listeners = _platformEventListeners.get(type);
    if (listeners === undefined) {
        _platformEventListeners.set(type, [listener]);
    }
    else {
        listeners.push(listener);
    }
}
export function init() {
    window.__WNI_NATIVE_TO_WEB = { transactionResponse, nativeEvent };
    if (window.__WNI_WEB_TO_NATIVE === undefined) {
        initWebPlatformImpl();
    }
}
//# sourceMappingURL=index.js.map