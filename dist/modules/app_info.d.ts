import * as tb from "@sinclair/typebox";
declare const APP_INFO_SCHEMA: tb.TObject<{
    versionName: tb.TString;
    versionCode: tb.TNumber;
}>;
export type AppInfo = tb.Static<typeof APP_INFO_SCHEMA>;
export declare function getAppInfo(): Promise<AppInfo>;
export {};
