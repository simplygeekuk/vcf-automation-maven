/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the InfobloxBackendService class.
     * @class
     *
     * @returns {Any} An instance of the InfobloxBackendService class.
     */

    function InfobloxBackendService() {
        this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(
            this.restHost
        );
    }

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

    InfobloxBackendService.prototype.get = function (
        uri,
        expectedResponseCodes,
        throwOnNotFound
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.debug("uri has not been defined or not of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        // Default throwOnNotFound to true, unless explicitly set to false.
        throwOnNotFound = throwOnNotFound !== false;

        var pageSize = 100;
        var result;

        // Check if existing parameters are defined in the URI.
        if (uri.indexOf("?") > -1) {
            uri += "&";
        } else {
            uri += "?";
        }

        // Get the initial response
        uri = this.wapiUrl + uri +
            "_return_as_object=1&_paging=1&_max_results=" +
            pageSize;

        var response = this.rest.get(
            uri,
            this.mediaType,
            expectedResponseCodes
        );
        var responseContent = JSON.parse(response.contentAsString);

        // Check for collection
        if (responseContent.next_page_id) {
            var results = responseContent.result;
            var numResults = results.length;

            this.log.d("Found " + numResults + " results.");

            // Get additional pages
            do {
                this.log.d("Getting additional results");
                var uriParam1 = "_paging=1&_return_as_object=1";
                var uriParam2 = "_page_id=" + responseContent.next_page_id;
                var uriWithParams = this.wapiUrl +
                                    uri +
                                    uriParam1 + "&" +
                                    uriParam2;

                response = this.rest.get(
                    uriWithParams,
                    this.mediaType,
                    expectedResponseCodes
                );

                responseContent = JSON.parse(response.contentAsString);

                results = results.concat(responseContent.result);
                this.log.d("Found " + results.length + " results.");
            } while (responseContent.next_page_id);

            responseContent = results;
        } else {
            if (responseContent.result.length > 1) {
                result = responseContent.result;
            } else if (responseContent.result.length > 0) {
                result = responseContent.result[0];
            } else {
                if (throwOnNotFound) throw new Error("No results found");
                this.log.warn("No results found.");
            }
        }

        return result;
    };

    /**
   * Defines the POST method.
   * @method
   * @param {string} uri - The request uri.
   * @param {string} [content] - The request content.
   * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
   *
   * @returns {Any} The response content object.
   */

    InfobloxBackendService.prototype.post = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.debug("uri has not been defined or not of type 'string'");
        }
        if (!content) {
            content = "{}";
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [201];
        }

        var result;
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes
        );

        if (response.statusCode !== 204) result = JSON.parse(response.contentAsString);

        return result;
    };

    /**
   * Defines the PUT method.
   * @method
   * @param {string} uri - The request uri.
   * @param {string} content - The request content.
   * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
   *
   * @returns {Any} The response content object.
   */

    InfobloxBackendService.prototype.put = function (
        uri,
        content,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.debug("uri has not been defined or not of type 'string'");
        }
        if (!content || typeof content !== "string") {
            this.log.debug("content has not been defined or not of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        var result;
        var response = this.rest.put(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes
        );

        result = JSON.parse(response.contentAsString);

        return result;
    };

    /**
   * Defines the PATCH method.
   * @method
   * @param {string} uri - The request uri.
   * @param {string} content - The request content.
   * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
   *
   * @returns {Any} The response content object.
   */

    InfobloxBackendService.prototype.patch = function (
        uri,
        content,
        expectedResponseCodes
    ) {

        if (!uri || typeof uri !== "string") {
            this.log.debug("uri has not been defined or not of type 'string'");
        }
        if (!content || typeof content !== "string") {
            this.log.debug("content has not been defined or not of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [200];
        }

        var result;
        var response = this.rest.patch(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            expectedResponseCodes
        );

        result = JSON.parse(response.contentAsString);

        return result;
    };

    /**
   * Defines the DELETE method.
   * @method
   * @param {string} uri - The request uri.
   * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
   */

    InfobloxBackendService.prototype.delete = function (
        uri,
        expectedResponseCodes
    ) {
        if (!uri || typeof uri !== "string") {
            this.log.debug("uri has not been defined or not of type 'string'");
        }
        if (!expectedResponseCodes || (Array.isArray(expectedResponseCodes) &&
            expectedResponseCodes.length < 1)) {
            expectedResponseCodes = [204];
        }

        this.rest.delete(
            uri,
            this.mediaType,
            expectedResponseCodes
        );
    };

    return InfobloxBackendService;
});