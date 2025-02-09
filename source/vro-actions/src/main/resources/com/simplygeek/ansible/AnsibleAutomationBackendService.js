/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AnsibleAutomationBackendService class.
     * @class
     * @param {REST:RESTHost} restHost - The Ansible HTTP REST host.
     *
     * @returns {Any} An instance of the AnsibleAutomationBackendService class.
     */

    function AnsibleAutomationBackendService(
        restHost
    ) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
            "Action",
            "AnsibleAutomationBackendService"
        );

        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
        this.mediaType = "application/json";
        this.baseUri = "/api/v2";

        var headers = new Properties();

        this.sessionHeaders = headers;
    }

    /**
     * Defines the getResourceById method.
     * @method
     * @public
     * @param {number} resourceId - The resource ID.
     * @param {string} resourceType - The resource type.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The resource object.
     */

    AnsibleAutomationBackendService.prototype.getResourceById = function (
        resourceId,
        resourceType,
        throwOnNotFound
    ) {
        if ((!resourceId && resourceId !== 0) || typeof resourceId !== "number") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'number'"
            );
        }
        if (!resourceType || typeof resourceType !== "string") {
            throw new ReferenceError(
                "resourceType is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true, unless explicitly set to false.
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/" + resourceType.toLowerCase() + "/" + resourceId.toString() + "/";
        var resourceObject;

        this.log.info("Get resource '" + resourceType + "' with id '" + resourceId + "'");
        resourceObject = this.get(
            uri,
            [200, 404]
        );

        if (resourceObject.id) {
            var resourceName = resourceObject.name;

            this.log.info(
                "Found resource '" + resourceType + "' with name '" + resourceName +
                "' and id '" + resourceId + "'"
            );
        } else {
            var errMsg = "No resource found for '" + resourceType + "' with id '" + resourceId + "'";

            if (throwOnNotFound) {
                throw new Error(errMsg);
            } else {
                this.log.warn(errMsg);
            }
        }

        return resourceObject;
    };

    /**
     * Defines the getResourceByName method.
     * @method
     * @public
     * @param {string} resourceName - The resource name.
     * @param {string} resourceType - The resource type.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The resource object.
     */

    AnsibleAutomationBackendService.prototype.getResourceByName = function (
        resourceName,
        resourceType,
        throwOnNotFound
    ) {
        if (!resourceName || typeof resourceName !== "string") {
            throw new ReferenceError(
                "resourceName is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceType || typeof resourceType !== "string") {
            throw new ReferenceError(
                "resourceType is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true, unless explicitly set to false.
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/" + resourceType + "/?search=" + resourceName;
        var resourceObject;

        this.log.info("Get resource '" + resourceType + "' with name '" + resourceName + "'");
        var results = this.get(
            uri,
            [200, 404]
        );

        if (results.length > 1) {
            throw new Error(
                "More than one resource found. Unable to determine correct resource '" +
                resourceType + "' with name '" + resourceName + "'"
            );
        } else if (results.length > 0) {
            resourceObject = results[0];
            var resourceId = resourceObject.id;

            this.log.info(
                "Found resource '" + resourceType + "' with name '" + resourceName +
                "' and id '" + resourceId + "'"
            );
        } else {
            var errMsg = "No resource found for '" + resourceType + "' with name '" + resourceName + "'";

            if (throwOnNotFound) {
                throw new Error(errMsg);
            } else {
                this.log.warn(errMsg);
            }
        }

        return resourceObject;
    };

    /**
     * Defines the GET method.
     * @method
     * @private
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     *
     * @returns {Any||Array/Any} The response result or results.
     */

    AnsibleAutomationBackendService.prototype.get = function (
        uri,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError("uri is required and must be of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
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
        if (responseContent.count) {
            var numTotalResults = responseContent.count;
            var results = responseContent.results;
            var numResultsOnPage = results.length;

            this.log.debug("Found " + numResultsOnPage + " of " + numTotalResults + " results");

            if (numResultsOnPage > 0) {
                if (numResultsOnPage < numTotalResults) {
                    // Get additional pages
                    var nextPage = 2;
                    var pageSize = numResultsOnPage; // 100;

                    // Check if existing parameters are defined in the URI.
                    if (uri.indexOf("?") > -1) {
                        uri += "&";
                    } else {
                        uri += "?";
                    }

                    do {
                        this.log.debug("Getting additional results");
                        var uriParam1 = "page_size=" + pageSize;
                        var uriParam2 = "page=" + nextPage;
                        var uriWithParams = uri + uriParam1 + "&" + uriParam2;

                        response = this.rest.get(
                            uriWithParams,
                            this.mediaType,
                            expectedResponseCodes,
                            this.sessionHeaders
                        );
                        responseContent = JSON.parse(response.contentAsString);
                        results = results.concat(responseContent.results);
                        this.log.debug(
                            "Found " + results.length + " of " +
                            numTotalResults + " results"
                        );
                        nextPage++;
                    } while (results.length < numTotalResults);
                }
            }
        } else {
            result = responseContent;
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

    AnsibleAutomationBackendService.prototype.post = function (
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

    AnsibleAutomationBackendService.prototype.put = function (
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

        var response = this.rest.put(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        var responseContent = JSON.parse(response.contentAsString);

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

    AnsibleAutomationBackendService.prototype.patch = function (
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

        var response = this.rest.patch(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        var responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    };

    /**
     * Defines the DELETE method.
     * @method
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     */

    AnsibleAutomationBackendService.prototype.delete = function (
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

    return AnsibleAutomationBackendService;
});