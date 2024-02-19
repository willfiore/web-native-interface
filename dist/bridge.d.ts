import * as tb from '@sinclair/typebox';
type PlatformEventListener = (payload: string) => void;
export declare function send(kind: string, payload: string): void;
export declare function transact<TResponseSchema extends tb.TAnySchema>(kind: string, payload: string, responseSchema: TResponseSchema): Promise<tb.Static<TResponseSchema>>;
export declare function addNativeEventListener(type: string, listener: PlatformEventListener): void;
export declare function initWni(): void;
export {};
