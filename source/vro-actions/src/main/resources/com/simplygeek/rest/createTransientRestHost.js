/**
 * This function creates a transient/dynamic rest host.
 * @param {string} restHostUrl - The Web Service URL.
 * @param {string} [restHostName] - The name of the rest host.
 * @param {number} [connectionTimeout] - The connection timeout in a seconds (default 120).
 * @param {number} [operationTimeout] - The operation timeout in a seconds (default 240).
 * @param {boolean} [hostVerification] - Should verify hostname certificate.
 * @param {string} [authenticationType] - The authentication type (default NONE)
 * @param {string} [basicUsername] - The username if Basic authentication is used.
 * @param {SecureString} [basicPassword] - The password if Basic authentication is used.
 * @param {string} [apiToken] - The API Bearer Token if Oauth2 authentication is used.
 *
 * @returns {REST:RESTHost} - The RESTHost vRO type
 */
(function (
    restHostUrl,
    restHostName,
    connectionTimeout,
    operationTimeout,
    hostVerification,
    authenticationType,
    basicUsername,
    basicPassword,
    apiToken
) {
    var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "VCFAutomationDeploymentService"
    );
    // eslint-disable-next-line no-useless-escape
    var urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\/?$/i;
    var validAuthTypes = ["basic", "oauth2"];

    // Mandatory param check
    if (!restHostUrl || typeof restHostUrl !== "string") {
        throw new ReferenceError("restHostUrl is required and must be of type 'string'");
    } else if (restHostUrl && !restHostUrl.match(urlRegex)) {
        throw new ReferenceError("restHostUrl not a valid URI");
    }
    // Optional param check
    if (restHostName && typeof restHostName !== "string") {
        throw new TypeError("restHostName must be of type 'string'");
    }
    if ((connectionTimeout && connectionTimeout !== 0) && typeof connectionTimeout !== "number") {
        throw new TypeError("connectionTimeout must be of type 'number'");
    }
    if ((operationTimeout && operationTimeout !== 0) && typeof operationTimeout !== "number") {
        throw new TypeError("operationTimeout must be of type 'number'");
    }
    if (hostVerification && typeof hostVerification !== "boolean") {
        throw new TypeError("hostVerification must be of type 'boolean'");
    }
    if (authenticationType && typeof authenticationType !== "string") {
        throw new TypeError("authenticationType must be of type 'string'");
    } else if (authenticationType && validAuthTypes.indexOf(authenticationType.toLowerCase()) < 0) {
        throw new Error("Invalid authentication type '" + authenticationType + "'." +
                " Supported authentication types: " + validAuthTypes.join(", "));
    } else if ((authenticationType && authenticationType.toLowerCase() === "basic") && (!basicUsername || !basicPassword)) {
        throw new Error("A Username and Password must be provided to use Basic authentication");
    } else if ((authenticationType && authenticationType.toLowerCase() === "oauth2") && !apiToken) {
        throw new Error("An API Token must be provided to use OAuth2 authentication");
    }

    this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "createTransientRestHost"
    );

    var name = restHostName || "dynamicHost";
    var authParams;

    log.debug("Creating transient rest host '" + name + "' with url '" + restHostUrl + "'");
    var restHost = RESTHostManager.createTransientHostFrom(
        RESTHostManager.createHost(name)
    );

    restHost.url = restHostUrl.toLowerCase();
    restHost.connectionTimeout = connectionTimeout || 120;
    restHost.operationTimeout = operationTimeout || 240;
    restHost.hostVerification = hostVerification !== false;

    if (authenticationType && authenticationType.toLowerCase() === "basic") {
        log.debug("Setting Baisc Authentication");
        authParams = ["Shared Session", basicUsername, basicPassword];
        restHost.authentication = RESTAuthenticationManager.createAuthentication("Basic", authParams);
    } else if (authenticationType && authenticationType.toLowerCase() === "oauth2") {
        log.debug("Setting OAuth2 Authentication");
        authParams = [apiToken, "Authorization header"];
        restHost.authentication = RESTAuthenticationManager.createAuthentication("OAuth 2.0", authParams);
    }

    return restHost;
});