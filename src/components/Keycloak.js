import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://lemur-17.cloud-iam.com/auth/",
 realm: "frenchbet",
 clientId: "frenchbet",
});

export default keycloak;