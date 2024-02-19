export type TransactionId = string;

declare global {
    interface Window {
        __WNI_WEB_TO_NATIVE: {
            transactionRequest: (type: string, payload: string) => TransactionId,
        },

        __WNI_NATIVE_TO_WEB: {
            transactionResponse: (transactionId: TransactionId, payload: string) => void,
            nativeEvent: (type: string, payload: string) => void,
        }
    }
}

export {}
