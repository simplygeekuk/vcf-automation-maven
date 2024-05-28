/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the GitlabService class.
     * @class
     *
     * @returns {Any} An instance of the GitlabService class.
     */

    function GitlabService(
        restHost,
        accessToken
    ) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationDeploymentService"
        );
        this.baseUri = "/api/v4";
        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(
            restHost
        );
        this.mediaType = "application/json";
        this.sessionHeaders = new Properties();
        this.sessionHeaders.put("PRIVATE-TOKEN", accessToken);
    }

    // ## Main Methods ##

    /**
     * Defines the getGroups method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of Groups.
     */

    GitlabService.prototype.getGroups = function () {
        var uri = this.baseUri + "/groups";
        var results;

        this.log.debug("Getting a list of Groups");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Groups");

        return results;
    };

    /**
     * Defines the getGroupById method.
     * @method
     * @public
     * @param {string} groupId - The group id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The group object.
     */

    GitlabService.prototype.getGroupById = function (
        groupId,
        throwOnNotFound
    ) {
        if (!groupId || typeof groupId !== "string") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/groups/" + groupId;
        var groupObj;

        this.log.debug("Getting group with ID '" + groupId + "'");
        groupObj = this.get(uri, null, throwOnNotFound);

        if (groupObj) {
            var groupName = groupObj.name;

            this.log.debug(
                "Found group with name '" + groupName +
                "' and id '" + groupId + "'"
            );
        }

        return groupObj;
    };

    /**
     * Defines the getGroupByName method.
     * @method
     * @public
     * @param {string} groupName - The group name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The group object.
     */

    GitlabService.prototype.getGroupByName = function (
        groupName,
        throwOnNotFound
    ) {
        if (!groupName || typeof groupName !== "string") {
            throw new ReferenceError(
                "groupName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/groups?search=" + groupName;
        var groupObj;
        var groupId;

        this.log.debug(
            "Getting group with name '" + groupName + "'");

        var results = this.get(uri);
        var groupMatchesByName = results.filter(
            function(group) {
                return group.name === groupName;
            }
        );

        if (groupMatchesByName.length > 1) {
            throw new Error(
                "More than one group found. Unable to determine correct " +
                "group with name '" + groupName + "'"
            );
        } else if (groupMatchesByName.length > 0) {
            groupObj = results[0];
            groupId = groupObj.id;

            this.log.debug(
                "Found group '" + groupName + "' with " +
                "id '" + groupId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Group not found with name '" +
                    groupName + "'"
                );
            } else {
                this.log.warn(
                    "Group not found with name '" +
                    groupName + "'"
                );
            }
        }

        return groupObj;
    };

    // ## Backend Methods ##

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

    GitlabService.prototype.get = function (
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
        var pageSize = 100;

        // Check if existing parameters are defined in the URI.
        if (uri.indexOf("?") > -1) {
            uri += "&";
        } else {
            uri += "?";
        }

        var initialUri = uri + "per_page=" + pageSize;
        var response = this.rest.get(
            initialUri,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        var responseContent = JSON.parse(response.contentAsString);
        var numTotalResults = response.getHeaderValues("X-Total")[0];

        // Check if we have a collection.
        if (numTotalResults || numTotalResults === 0) {
            var results = responseContent;
            var numResultsOnPage = results.length;

            this.log.debug(
                "Found " + numResultsOnPage + " of " +
                numTotalResults + " results"
            );

            if (numResultsOnPage > 0) {
                if (numResultsOnPage < numTotalResults) {
                    // Get additional pages
                    var nextPage = 2;

                    do {
                        this.log.debug("Getting additional results");
                        var uriParam1 = "per_page=" + pageSize;
                        var uriParam2 = "page=" + nextPage;
                        var uriWithParams = uri + uriParam1 + "&" + uriParam2;
                        var extraResponse = this.rest.get(
                            uriWithParams,
                            this.mediaType,
                            expectedResponseCodes,
                            this.sessionHeaders
                        );
                        var extraResponseContent = JSON.parse(extraResponse.contentAsString);

                        results = results.concat(extraResponseContent);
                        this.log.debug(
                            "Found " + results.length + " of " +
                            numTotalResults + " results"
                        );
                        nextPage++;
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

    GitlabService.prototype.post = function (
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

    GitlabService.prototype.put = function (
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

    GitlabService.prototype.patch = function (
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

    GitlabService.prototype.delete = function (
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

    return GitlabService;
});