/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAssemblerBackendService class.
     * @class
     * 
     * @returns {Any} An instance of the AriaAutomationAssemblerBackendService class.
     */

    function AriaAutomationAssemblerBackendService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
        this.baseUri = "/iaas/api";
        this.apiVersion = "2021-07-15";

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

    AriaAutomationAssemblerBackendService.prototype.createSession = function (refreshToken) {
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
        this.sessionHeaders.put("apiVersion", this.apiVersion);
        this.sessionHeaders.put("Authorization", "Bearer " + this.session.token);
    }

    // ## Methods ##

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

    AriaAutomationAssemblerBackendService.prototype.get = function (
        uri,
        expectedResponseCodes,
        throwOnNotFound
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            var expectedResponseCodes = [200];
        }

        // Default throwOnNotFound to true, unless explicitly set to false.
        throwOnNotFound = throwOnNotFound != false;

        if (!throwOnNotFound) {
            expectedResponseCodes.push(404);
        }

        var result;
        var uriVersion = "apiVersion=" + this.apiVersion;
        var initialUri;

        // Check if existing parameters are defined in the URI.
        if (uri.indexOf('?') > -1) {
            initialUri = uri + "&";
        } else {
            initialUri = uri + "?";
        }

        var response = this.rest.get(
            initialUri + uriVersion,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        var responseContent = JSON.parse(response.contentAsString);

        // Check if we have a collection.
        if (responseContent.totalElements) {
            var numTotalResults = responseContent.totalElements;
            var results = responseContent.content;
            var numResultsOnPage = responseContent.numberOfElements;
            this.log.debug(
                "Found " + numResultsOnPage + " of " +
                numTotalResults + " results"
            );

            if (numResultsOnPage > 0) {
                if (numResultsOnPage < numTotalResults) {
                    // Get additional pages

                    // Check if existing parameters are defined in the URI.
                    if (uri.indexOf('?') > -1) {
                        uri += "&";
                    } else {
                        uri += "?";
                    }

                    do {
                        this.log.debug("Getting additional results");
                        var uriParam1 = "$skip=" + numResultsOnPage;
                        
                        var uriWithParams = uri + uriParam1 + "&" + uriVersion;

                        var response = this.rest.get(uriWithParams,
                                                    this.mediaType,
                                                    expectedResponseCodes,
                                                    this.sessionHeaders);

                        var responseContent = JSON.parse(response.contentAsString);
                        results = results.concat(responseContent.content);
                        this.log.debug(
                            "Found " + numResultsOnPage + " of " +
                            numTotalResults + " results"
                        );
                    } while (results.length < numTotalResults)
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
    }

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

    AriaAutomationAssemblerBackendService.prototype.post = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            var expectedResponseCodes = [201];
        }

        var responseContent;
        var uriVersion = "?apiVersion=" + this.apiVersion;

        var response = this.rest.post(
            uri + uriVersion,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        
        if (response.statusCode !== 204) responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    }

    /**
     * Defines the PUT method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * 
     * @returns {Any} The response content object.
     */

    AriaAutomationAssemblerBackendService.prototype.put = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== 'string') {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!content || typeof content !== 'object') {
            throw new ReferenceError("content is required and must be of type 'object'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            var expectedResponseCodes = [200];
        }

        var responseContent;
        var uriVersion = "?apiVersion=" + this.apiVersion;

        var response = this.rest.put(
            uri + uriVersion,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    }

    /**
     * Defines the PATCH method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * 
     * @returns {Any} The response content object.
     */

    AriaAutomationAssemblerBackendService.prototype.patch = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== 'string') {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!content || typeof content !== 'object') {
            throw new ReferenceError("content is required and must be of type 'object'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            var expectedResponseCodes = [200];
        }

        var responseContent;
        var uriVersion = "?apiVersion=" + this.apiVersion;

        var response = this.rest.patch(
            uri + uriVersion,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    }

    /**
     * Defines the DELETE method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     */

    AriaAutomationAssemblerBackendService.prototype.delete = function (
        uri,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== 'string') {
            this.log.e("uri has not been defined or not of type 'string'");
        }

        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            var expectedResponseCodes = [204];
        }

        var uriVersion = "apiVersion=" + this.apiVersion;

        // Check if existing parameters are defined in the URI.
        if (uri.indexOf('?') > -1) {
            uri += "&";
        } else {
            uri += "?";
        }

        this.rest.delete(
            uri + uriVersion,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
    }
    
    return AriaAutomationAssemblerBackendService;
});