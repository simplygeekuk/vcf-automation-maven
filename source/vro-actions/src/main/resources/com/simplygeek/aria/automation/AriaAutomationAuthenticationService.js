/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAuthenticationService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     *
     * @returns {Any} An instance of the AriaAutomationAuthenticationService class.
     */

    function AriaAutomationAuthenticationService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationAuthenticationService"
        );

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
        this.iaasBaseUri = "/iaas/api";
        this.cspBaseUri = "/csp/gateway/am/api";

        var headers = new Properties();

        this.sessionHeaders = headers;
    }

    /**
     * Defines the createAuthenticatedSession method.
     * @method
     * @public
     * @param {string} refreshToken - The refresh token.
     *
     */

    AriaAutomationAuthenticationService.prototype.createAuthenticatedSession = function (
        refreshToken
    ) {
        if (!refreshToken || typeof refreshToken !== "string") {
            throw new ReferenceError(
                "refreshToken is required and must " +
                "be of type 'string'"
            );
        }

        var session;

        session = this.createSession(
            refreshToken
        );
        this.sessionHeaders.put("Authorization", "Bearer " + session.token);
    };

    /**
     * Defines the createSession method.
     * @method
     * @public
     * @param {string} refreshToken - The refresh token.
     *
     * @returns {Any} The session object.
     */

    AriaAutomationAuthenticationService.prototype.createSession = function (
        refreshToken
    ) {
        if (!refreshToken || typeof refreshToken !== "string") {
            throw new ReferenceError(
                "refreshToken is required and must " +
                "be of type 'string'"
            );
        }

        var session;
        var uri = this.iaasBaseUri + "/login";
        var content = {
            refreshToken: refreshToken
        };

        this.log.debug("Creating API session.");
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType
        );

        session = JSON.parse(response.contentAsString);
        this.log.debug("API session created.");

        return session;
    };

    /**
     * Defines the getRefreshToken method.
     * @method
     * @public
     * @param {string} username - CSP username.
     * @param {SecureString} password - CSP password.
     * @param {string} [domain] - CSP domain.
     *
     * @returns {string} The refresh token
     */

    AriaAutomationAuthenticationService.prototype.getRefreshToken = function (
        username,
        password,
        domain
    ) {
        if (!username || typeof username !== "string") {
            throw new ReferenceError(
                "username is required and must " +
                "be of type 'string'"
            );
        }

        var refreshTokenResponse;
        var refreshToken;
        var uri = this.cspBaseUri + "/login?access_token";
        var content = {
            username: username,
            password: password,
            domain: domain || "System Domain"
        };

        this.log.debug("Creating Refresh token.");
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType
        );

        refreshTokenResponse = JSON.parse(response.contentAsString);
        refreshToken = refreshTokenResponse.refresh_token;
        this.log.debug("Refresh token created.");

        return refreshToken;
    };

    return AriaAutomationAuthenticationService;
});