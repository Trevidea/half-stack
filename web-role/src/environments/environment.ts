// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  apiUrl: 'http://localhost:4000',
  cpServerBaseUrl: 'http://drake.in:1437/api',
  hlsUrl: "http://drake.in:59919", //for play Dump m3u8
  spRelayUrl: "http://drake.in:3001", //for web socket 
  rtmpUrl: "rtmp://drake.in:1935",
  playerUrl: "https://drake.in:3334",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
