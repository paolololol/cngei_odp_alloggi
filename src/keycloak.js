import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
    url: 'https://auth.cngei.it/auth',
    realm: 'cngei',
    clientId: 'alloggi',
});

export default keycloak;