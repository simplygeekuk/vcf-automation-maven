/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAssemblerIaasAuthenticationService class.
     * @class
     * 
     * @returns {Any} An instance of the AriaAutomationAssemblerIaasAuthenticationService class.
     */

    function AriaAutomationAssemblerIaasAuthenticationService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
        this.iaasBaseUri = "/iaas/api";

        var headers = new Properties();
        this.sessionHeaders = headers;
    }

    // ## Authentication ##
    
    /**
     * Defines the createSession method.
     * @method
     * @public
     * @param {string} refreshToken - The authorization scope.
     * 
     * @returns {Any} The request response object.
     */

    AriaAutomationAssemblerIaasAuthenticationService.prototype.createSession = function (refreshToken) {
        if (!refreshToken || typeof refreshToken !== "string") {
            throw new ReferenceError(
                "refreshToken is required and must " +
                "be of type 'string'"
            );
        }

        this.session = {};
        var uri = this.iaasBaseUri + "/login";

        var content = {
            refreshToken: refreshToken
        }

        this.log.debug("Creating API session.");
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType
        );

        this.session = JSON.parse(response.contentAsString);
        this.sessionHeaders.put("Authorization", "Bearer " + this.session.token);
    }

    return AriaAutomationAssemblerIaasAuthenticationService;
});