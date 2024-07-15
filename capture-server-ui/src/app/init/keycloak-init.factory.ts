import { environment } from "environments/environment";
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  const redirectUrl = environment.keycloakRedirectUrl;
  return () =>
    keycloak.init({
      // config: {
      //   // url: 'https://192.168.1.50:8443',
      //   // realm: 'drakerealm',
      //   // clientId: 'minio-client'
      // },
      initOptions: {
        checkLoginIframe: false,
        checkLoginIframeInterval: 25,
        redirectUri: redirectUrl
      },  
      // loadUserProfileAtStartUp: true
    });
}