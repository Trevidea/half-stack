// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  spModelUrl: "http://drake.in:1437/api",
  spRelayUrl: "http://drake.in:3001",
  spFSUrl: "http://drake.in:1337/api",
  spHLSUrl: "http://drake.in:59919",
  logUrl: "http://localhost:8283/api/",
  rtmpUrl: "rtmp://drake.in:1935",
  playerUrl: "https://drake.in:3334",
  keycloakUrl: 'https://keycloak.drake.in:5555',
  strapiServerUrl: "http://drake.in:1337",
  keycloakRedirectUrl: 'http://localhost:4200',
  minioUrl: 'http://192.168.1.50:9002/event'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
