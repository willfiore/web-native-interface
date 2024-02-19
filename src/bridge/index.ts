import * as tb from '@sinclair/typebox'
import { TransactionId } from '../bridge.declarations.js';
import { parseJsonString } from '../utility.js';
import { initWebPlatformImpl } from '../web_impl/index.js';

type TransactionResolver = (payload: string) => void;
const _transactionResolvers: Map<string, TransactionResolver> = new Map();

type PlatformEventListener = (payload: string) => void;
const _platformEventListeners: Map<string, PlatformEventListener[]> = new Map();

function transactionResponse(transactionId: TransactionId, payload: string) {
    const resolver = _transactionResolvers.get(transactionId);

    if (resolver === undefined) {
        console.warn("received transaction without pending resolver");
        return;
    }

    _transactionResolvers.delete(transactionId);
    resolver(payload);
}

function nativeEvent(type: string, payload: string) {
    const listeners = _platformEventListeners.get(type);
    listeners?.forEach(listener => listener(payload));
}

export function send(kind: string, payload: string) {
    window.__WNI_WEB_TO_NATIVE.transactionRequest(kind, payload);
}

export async function transact<
    TResponseSchema extends tb.TAnySchema
>(
    kind: string,
    payload: string,
    responseSchema: TResponseSchema,
): Promise<tb.Static<TResponseSchema>> {
    const transactionId = window.__WNI_WEB_TO_NATIVE.transactionRequest(kind, payload);

    let resolver: TransactionResolver = () => {};
    const promise = new Promise<string>(r => { resolver = r; });
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

export function addNativeEventListener(type: string, listener: PlatformEventListener) {
    const listeners = _platformEventListeners.get(type);

    if (listeners === undefined) {
        _platformEventListeners.set(type, [listener]);
    } else {
        listeners.push(listener);
    }
}

export function init() {
    window.__WNI_NATIVE_TO_WEB = { transactionResponse, nativeEvent };

    if (window.__WNI_WEB_TO_NATIVE === undefined) {
        initWebPlatformImpl();
    }
}