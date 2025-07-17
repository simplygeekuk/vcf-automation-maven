/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines The VCFAutomationBackend class.
     * @class
     * @returns {Any} An instance of The VCFAutomationBackend class.
     */
    function VCFAutomationBackend() {
        VCFAutomationAuthenticationService.call(this, this.restHost);

        this.mediaType = "application/json";
    }

    var VCFAutomationAuthenticationService = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationAuthenticationService();

    VCFAutomationBackend.prototype = Object.create(
        VCFAutomationAuthenticationService.prototype
    );
    VCFAutomationBackend.prototype.constructor = VCFAutomationBackend;

    // ## Methods ##

    /**
     * Defines the about method.
     * @returns {Any} The API About object.
     */

    VCFAutomationBackend.prototype.about = function () {
        var response = this.get(this.baseUri + "/about");

        return response;
    };

    /**
     * Defines the IaaS about method.
     * @returns {Any} The API About object.
     */

    VCFAutomationBackend.prototype.iaasAbout = function () {
        var response = this.get(this.iaasBaseUri + "/about");

        return response;
    };

    /**
     * Defines the GET method.
     * @function
     * @private
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     * @returns {Any||Array/Any} The response result or results.
     */

    VCFAutomationBackend.prototype.get = function (uri, expectedResponseCodes) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError(
                "uri is required and must be of type 'string'"
            );
        }

        if (
            !expectedResponseCodes ||
            (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)
        ) {
            expectedResponseCodes = [200, 201, 204];
        }

        var result;
        var response = this.httpGet(
            uri,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
        var responseContent = JSON.parse(response.contentAsString);

        // Check if we have a collection.
        if (
            responseContent.totalElements ||
            responseContent.totalElements === 0
        ) {
            var numTotalResults = responseContent.totalElements;
            var results = responseContent.content;
            var numResultsOnPage = responseContent.numberOfElements; // || responseContent.size;

            this.log.debug(
                "Found " +
                    numResultsOnPage +
                    " of " +
                    numTotalResults +
                    " results"
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
                        var extraResponse = this.httpGet(
                            uriWithParams,
                            this.mediaType,
                            expectedResponseCodes,
                            this.sessionHeaders
                        );
                        var extraResponseContent = JSON.parse(
                            extraResponse.contentAsString
                        );

                        results = results.concat(extraResponseContent.content);
                        this.log.debug(
                            "Found " +
                                results.length +
                                " of " +
                                numTotalResults +
                                " results"
                        );
                        numResultsOnPage += pageSize;
                    } while (results.length < numTotalResults);
                }
            }
        } else {
            if (response.statusCode === 404) {
                result = null;
            } else {
                result = responseContent;
            }
        }

        return result || results;
    };

    /**
     * Defines the POST method.
     * @function
     * @private
     * @param {string} uri - The request uri.
     * @param {Any} [content] - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * @returns {Any} The response content object.
     */

    VCFAutomationBackend.prototype.post = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError(
                "uri is required and must be of type 'string'"
            );
        }

        if (
            !expectedResponseCodes ||
            (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)
        ) {
            expectedResponseCodes = [200, 201];
        }

        var responseContent;
        var response = this.httpPost(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );

        if (response.statusCode !== 204)
            responseContent = JSON.parse(response.contentAsString);

        return responseContent;
    };

    /**
     * Defines the PUT method.
     * @function
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * @returns {Any} The response content object.
     */

    VCFAutomationBackend.prototype.put = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError(
                "uri is required and must be of type 'string'"
            );
        }

        if (!content || typeof content !== "object") {
            throw new ReferenceError(
                "content is required and must be of type 'object'"
            );
        }

        if (
            !expectedResponseCodes ||
            (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)
        ) {
            expectedResponseCodes = [200, 201];
        }

        var responseContent;
        var response = this.httpPut(
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
     * @function
     * @param {string} uri - The request uri.
     * @param {Any} content - The request content.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     * @returns {Any} The response content object.
     */

    VCFAutomationBackend.prototype.patch = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            throw new ReferenceError(
                "uri is required and must be of type 'string'"
            );
        }

        if (!content || typeof content !== "object") {
            throw new ReferenceError(
                "content is required and must be of type 'object'"
            );
        }

        if (
            !expectedResponseCodes ||
            (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)
        ) {
            expectedResponseCodes = [200, 201];
        }

        var responseContent;
        var response = this.httpPatch(
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
     * @function
     * @param {string} uri - The request uri.
     * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
     */

    VCFAutomationBackend.prototype.delete = function (
        uri,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.e("uri has not been defined or not of type 'string'");
        }

        if (
            !expectedResponseCodes ||
            (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)
        ) {
            expectedResponseCodes = [204];
        }

        this.httpDelete(
            uri,
            this.mediaType,
            expectedResponseCodes,
            this.sessionHeaders
        );
    };

    return VCFAutomationBackend;
});
