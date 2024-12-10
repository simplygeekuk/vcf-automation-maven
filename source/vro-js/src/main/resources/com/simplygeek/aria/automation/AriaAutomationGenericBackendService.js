/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationGenericBackendService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     *
     * @returns {Any} An instance of the AriaAutomationGenericBackendService class.
     */

    function AriaAutomationGenericBackendService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        AriaAutomationAuthenticationService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationGenericBackendService"
        );

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
    }

    var AriaAutomationAuthenticationService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationAuthenticationService();

    AriaAutomationGenericBackendService.prototype = Object.create(
        AriaAutomationAuthenticationService.prototype
    );
    AriaAutomationGenericBackendService.prototype.constructor = AriaAutomationGenericBackendService;

    // ## Methods ##

    /**
     * Defines the about method.
     *
     * @returns {Any} The API About object.
     */

    AriaAutomationGenericBackendService.prototype.about = function () {
        var response = this.get(
            this.baseUri + "/about"
        );

        return response;
    };

    /**
     * Defines the IaaS about method.
     *
     * @returns {Any} The API About object.
     */

    AriaAutomationGenericBackendService.prototype.iaasAbout = function () {
        var response = this.get(
            this.iaasBaseUri + "/about"
        );

        return response;
    };

    /**
     * Defines the GET method.
     * @method
     * @private
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any||Array/Any} The response result or results.
     */

    AriaAutomationGenericBackendService.prototype.get = function (
        uri,
        expectedResponseCodes,
        throwOnNotFound
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        // Default throwOnNotFound to true, unless explicitly set to false.
        throwOnNotFound = throwOnNotFound !== false;

        if (!throwOnNotFound) {
            expectedResponseCodes.push(404);
        }

        var result;
        var response = this.rest.get(
            uri,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        var responseContent = JSON.parse(response.contentAsString);

        // Check if we have a collection.
        if (responseContent.totalElements || responseContent.totalElements === 0) {
            var numTotalResults = responseContent.totalElements;
            var results = responseContent.content;
            var numResultsOnPage = responseContent.numberOfElements || responseContent.size;

            this.log.debug(
                "Found " + numResultsOnPage + " of " +
                numTotalResults + " results"
            );

            if (numResultsOnPage > 0) {
                if (numResultsOnPage < numTotalResults) {
                    // Get additional pages

                    // Check if existing parameters are defined in the URI.
                    if (uri.indexOf("?") > -1) {
                        uri += "&";
                    } else {
                        uri += "?";
                    }

                    var pageSize = numResultsOnPage;

                    do {
                        this.log.debug("Getting additional results");
                        var uriParam1 = "$skip=" + numResultsOnPage;
                        var uriWithParams = uri + uriParam1;
                        var extraResponse = this.rest.get(
                            uriWithParams,
                            this.mediaType,
                            expectedResponseCodes,
                            this.sessionHeaders
                        );
                        var extraResponseContent = JSON.parse(extraResponse.contentAsString);

                        results = results.concat(extraResponseContent.content);
                        this.log.debug(
                            "Found " + results.length + " of " +
                            numTotalResults + " results"
                        );
                        numResultsOnPage += pageSize;
                    } while (results.length < numTotalResults);
                }
            } else {
                if (throwOnNotFound) throw new Error("No results found");
            }
        } else {
            if (response.statusCode === "404" && !throwOnNotFound) {
                result = null;
            } else {
                result = responseContent;
            }
        }

        return result || results;
    };

    /**
     * Defines the POST method.
     * @method
     * @private
     * @param {string} uri - The request uri.
     * @param {Any} [content] - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     *
     * @returns {Any} The response content object.
     */

    AriaAutomationGenericBackendService.prototype.post = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [201];
        }

        var responseContent;
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        if (response.statusCode !== 204) responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    };

    /**
     * Defines the PUT method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     *
     * @returns {Any} The response content object.
     */

    AriaAutomationGenericBackendService.prototype.put = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!content || typeof content !== "object") {
            throw new ReferenceError("content is required and must be of type 'object'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        var responseContent;
        var response = this.rest.put(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    };

    /**
     * Defines the PATCH method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     *
     * @returns {Any} The response content object.
     */

    AriaAutomationGenericBackendService.prototype.patch = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!content || typeof content !== "object") {
            throw new ReferenceError("content is required and must be of type 'object'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        var responseContent;
        var response = this.rest.patch(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    };

    /**
     * Defines the DELETE method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     */

    AriaAutomationGenericBackendService.prototype.delete = function (
        uri,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.e("uri has not been defined or not of type 'string'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [204];
        }

        this.rest.delete(
            uri,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
    };

    return AriaAutomationGenericBackendService;
});