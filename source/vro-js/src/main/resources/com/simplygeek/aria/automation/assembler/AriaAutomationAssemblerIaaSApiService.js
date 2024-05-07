/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAssemblerIaaSApiService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     * 
     * @returns {Any} An instance of the AriaAutomationAssemblerIaaSApiService class.
     */

    function AriaAutomationAssemblerIaaSApiService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationAssemblerIaaSApiService"
        );

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
        this.baseUri = "/iaas/api";

        var headers = new Properties();
        this.sessionHeaders = headers;

        // ## Authentication ##
        
        /**
         * Defines the createSession method.
         * @method
         * @public
         * @param {string} refreshToken - The authorization scope.
         * 
         * @returns {Any} The request response object.
         */

        this.createSession = function (refreshToken) {
            if (!refreshToken || typeof refreshToken !== "string") {
                throw new ReferenceError(
                    "refreshToken is required and must " +
                    "be of type 'string'"
                );
            }
 
            this.session = {};
            var uri = this.baseUri + "/login";

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
    }

    return AriaAutomationAssemblerIaaSApiService;
});