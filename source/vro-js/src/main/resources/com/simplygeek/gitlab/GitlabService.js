/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the GitlabService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     * @param {string} accessToken -  Personal Access Token for authentication.
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
            "GitlabService"
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
     * @param {number} groupId - The group id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The group object.
     */

    GitlabService.prototype.getGroupById = function (
        groupId,
        throwOnNotFound
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var groupObj = this.getResourceById(
            groupId,
            "groups",
            throwOnNotFound
        );

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

        var groupObj = this.getResourceByName(
            groupName,
            "groups",
            throwOnNotFound
        );

        return groupObj;
    };

    /**
     * Defines the createGroup method.
     * @method
     * @public
     * @param {Any} groupSpecification - The group specification.
     *
     * @returns {Any} The new group object.
     */

    GitlabService.prototype.createGroup = function (
        groupSpecification
    ) {
        if (!groupSpecification || typeof groupSpecification !== "object") {
            throw new ReferenceError(
                "groupSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/groups";
        var groupObject;
        var parentId;
        var parentGroup;

        if (groupSpecification.parent_id) {
            parentId = groupSpecification.parent_id;
            parentGroup = this.getGroupById(parentId);
            if (parentGroup.parent_id !== null) {
                throw new Error(
                    "Group specification references parent with id '" + parentId.toString() +
                    "' but is not a valid parent group"
                );
            }
        }

        groupObject = this.post(
            uri,
            groupSpecification
        );

        return groupObject;
    };

    /**
     * Defines the createSamlGroupLink method.
     * @method
     * @public
     * @param {number} groupId - The group id.
     * @param {Any} samlGroupLinkSpecification - The SAML group spec.
     *
     * @returns {Any} The SAML group link object.
     */

    GitlabService.prototype.createSamlGroupLink = function (
        groupId,
        samlGroupLinkSpecification
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }
        if (!samlGroupLinkSpecification || typeof samlGroupLinkSpecification !== "object") {
            throw new ReferenceError(
                "samlGroupLinkSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/groups/" + groupId + "/saml_group_links";
        var samlGroupLinkObject;

        samlGroupLinkObject = this.post(
            uri,
            samlGroupLinkSpecification
        );

        return samlGroupLinkObject;
    };

    /**
     * Defines the getGroupAccessTokens method.
     * @method
     * @public
     * @param {number} groupId - The group id.
     *
     * @returns {Array/Any} The list of group access tokens.
     */

    GitlabService.prototype.getGroupAccessTokens = function (
        groupId
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }

        var uri = this.baseUri + "/groups/" + groupId + "/access_tokens";
        var results;

        this.log.debug("Getting a list of Group Access Tokens");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Group Access Tokens");

        return results;
    };

    /**
     * Defines the getGroupAccessTokenById method.
     * @method
     * @public
     * @param {number} groupId - The group id.
     * @param {number} accessTokenId - The Access Token id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The access token object.
     */

    GitlabService.prototype.getGroupAccessTokenById = function (
        groupId,
        accessTokenId,
        throwOnNotFound
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }
        if ((!accessTokenId && accessTokenId !== 0) || typeof accessTokenId !== "number") {
            throw new ReferenceError(
                "accessTokenId is required and must " +
                "be of type 'number'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var accessTokenObj = this.getResourceById(
            accessTokenId,
            "groups/" + groupId.toString(),
            throwOnNotFound
        );

        return accessTokenObj;
    };

    /**
     * Defines the getAccessTokenByName method.
     * @method
     * @public
     * @param {number} groupId - The group id.
     * @param {string} accessTokenName - The access token name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The access token object.
     */

    GitlabService.prototype.getAccessTokenByName = function (
        groupId,
        accessTokenName,
        throwOnNotFound
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }
        if (!accessTokenName || typeof accessTokenName !== "string") {
            throw new ReferenceError(
                "accessTokenName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var accessTokenObj = this.getResourceByName(
            accessTokenName,
            "groups/" + groupId.toString(),
            throwOnNotFound
        );

        return accessTokenObj;
    };

    /**
     * Defines the createGroupAccessToken method.
     * @method
     * @public
     * @param {number} groupId - The group id.
     * @param {Any} accessTokenSpecification - The Access Token spec.
     *
     * @returns {Any} The SAML group link object.
     */

    GitlabService.prototype.createGroupAccessToken = function (
        groupId,
        accessTokenSpecification
    ) {
        if ((!groupId && groupId !== 0) || typeof groupId !== "number") {
            throw new ReferenceError(
                "groupId is required and must " +
                "be of type 'number'"
            );
        }
        if (!accessTokenSpecification || typeof accessTokenSpecification !== "object") {
            throw new ReferenceError(
                "accessTokenSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/groups/" + groupId.toString() + "/access_tokens";
        var accessTokenObject;

        accessTokenObject = this.post(
            uri,
            accessTokenSpecification
        );

        return accessTokenObject;
    };

    /**
     * Defines the getProjects method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of Projects.
     */

    GitlabService.prototype.getProjects = function () {
        var uri = this.baseUri + "/projects";
        var results;

        this.log.debug("Getting a list of Projects");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Projects");

        return results;
    };

    /**
     * Defines the getProjectById method.
     * @method
     * @public
     * @param {number} projectId - The project id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The project object.
     */

    GitlabService.prototype.getProjectById = function (
        projectId,
        throwOnNotFound
    ) {
        if ((!projectId && projectId !== 0) || typeof projectId !== "number") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'number'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var projectObj = this.getResourceById(
            projectId,
            "projects",
            throwOnNotFound
        );

        return projectObj;
    };

    /**
     * Defines the getProjectByName method.
     * @method
     * @public
     * @param {number} projectName - The project name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The project object.
     */

    GitlabService.prototype.getProjectByName = function (
        projectName,
        throwOnNotFound
    ) {
        if (!projectName || typeof projectName !== "string") {
            throw new ReferenceError(
                "projectName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var projectObj = this.getResourceByName(
            projectName,
            "projects",
            throwOnNotFound
        );

        return projectObj;
    };

    /**
     * Defines the createProject method.
     * @method
     * @public
     * @param {Any} projectSpecification - The Project spec.
     *
     * @returns {Any} The project object.
     */

    GitlabService.prototype.createProject = function (
        projectSpecification
    ) {
        if (!projectSpecification || typeof projectSpecification !== "object") {
            throw new ReferenceError(
                "projectSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/projects";
        var projectObject;

        projectObject = this.post(
            uri,
            projectSpecification
        );

        return projectObject;
    };

    // ## Backend Methods ##

    /**
     * Defines the getResourceById method.
     * @method
     * @public
     * @param {string} resourceId - The resource id.
     * @param {string} resource - The resource URI.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The resource object.
     */

    GitlabService.prototype.getResourceById = function (
        resourceId,
        resource,
        throwOnNotFound
    ) {
        var uri = this.baseUri + "/" + resource + "/" + resourceId.toString();
        var resourceObj;

        this.log.debug("Getting resource with ID '" + resourceId.toString() + "'");
        resourceObj = this.get(uri, null, throwOnNotFound);

        if (resourceObj) {
            var resourceName = resourceObj.name;

            this.log.debug(
                "Found resource with name '" + resourceName +
                "' and id '" + resourceId.toString() + "'"
            );
        }

        return resourceObj;
    };

    /**
     * Defines the getResourceByName method.
     * @method
     * @public
     * @param {string} resourceName - The resource name.
     * @param {string} resource - The resource URI.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The resource object.
     */

    GitlabService.prototype.getResourceByName = function (
        resourceName,
        resource,
        throwOnNotFound
    ) {
        var uri = this.baseUri + "/" + resource + "?search=" + resourceName;
        var resourceObj;
        var resourceId;

        this.log.debug(
            "Getting resource with name '" + resourceName + "'");

        var results = this.get(uri);
        var groupMatchesByName = results.filter(
            function(resource) {
                return resource.name === resourceName;
            }
        );

        if (groupMatchesByName.length > 1) {
            throw new Error(
                "More than one resource found. Unable to determine correct " +
                "resource with name '" + resourceName + "'"
            );
        } else if (groupMatchesByName.length > 0) {
            resourceObj = groupMatchesByName[0];
            resourceId = resourceObj.id;

            this.log.debug(
                "Found resource '" + resourceName + "' with " +
                "id '" + resourceId.toString() + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Resource not found with name '" +
                    resourceName + "'"
                );
            } else {
                this.log.warn(
                    "Resource not found with name '" +
                    resourceName + "'"
                );
            }
        }

        return resourceObj;
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
            if (response.statusCode === "404") {
                if (throwOnNotFound) {
                    throw new Error("No results found");
                } else {
                    result = null;
                }
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