/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the HttpRestClient class.
     * @class
     * @param {REST:RESTHost} restHost - The HTTP REST host.
     * @param {number} retryMaxAttempts - The maximum number attempts to retry a failed request.
     * @param {number} retryDelay - The delay (in seconds) between retry attempts.
     * @param {boolean} retryOn500 - Should retry the request if HTTP Status 500 is received.
     * 
     * @returns {Any} An instance of the HttpRestClient class.
     */

    function HttpRestClient(
        restHost,
        retryMaxAttempts,
        retryDelay,
        retryOn500
    ) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "HttpRestClient"
        );

        this.restHost = restHost;
        this.retryMaxAttempts = retryMaxAttempts || 5;
        this.retryDelay = retryDelay || 10;
        this.retryOn500 = retryOn500 !== false;

        /**
         * Defines the GET method.
         * @method
         * @public
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        this.get = function (
            uri,
            acceptType,
            expectedResponseCodes,
            headers
        ) {
            var response = invokeRequest.call(
                this,
                "GET",
                uri,
                acceptType,
                null,
                null,
                expectedResponseCodes,
                headers
            );

            return response;
        }

        /**
         * Defines the POST method.
         * @method
         * @public
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Any} [content] - The request content.
         * @param {string} [contentType] - The encoding for content.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        this.post = function (
            uri,
            acceptType,
            content,
            contentType,
            expectedResponseCodes,
            headers
        ) {
            content = content || {};

            var response = invokeRequest.call(
                this,
                "POST",
                uri,
                acceptType,
                content,
                contentType,
                expectedResponseCodes,
                headers
            );

            return response;
        }

        /**
         * Defines the PUT method.
         * @method
         * @public
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Any} content - The request content.
         * @param {string} [contentType] - The encoding for content.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        this.put = function (
            uri,
            acceptType,
            content,
            contentType,
            expectedResponseCodes,
            headers
        ) {
            var response = invokeRequest.call(
                this,
                "PUT",
                uri,
                acceptType,
                content,
                contentType,
                expectedResponseCodes,
                headers
            );

            return response;
        }

        /**
         * Defines the PATCH method.
         * @method
         * @public
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Any} content - The request content.
         * @param {string} [contentType] - The encoding for content.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        this.patch = function (
            uri,
            acceptType,
            content,
            contentType,
            expectedResponseCodes,
            headers
        ) {
            var response = invokeRequest.call(
                this,
                "PATCH",
                uri,
                acceptType,
                content,
                contentType,
                expectedResponseCodes,
                headers
            );

            return response;
        }

        /**
         * Defines the DELETE method.
         * @method
         * @public
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        this.delete = function (
            uri,
            acceptType,
            expectedResponseCodes,
            headers
        ) {
            var response = invokeRequest.call(
                this,
                "DELETE",
                uri,
                acceptType,
                null,
                null,
                expectedResponseCodes,
                headers
            );

            return response;
        }

        /**
         * A function that invokes the request.
         * @function
         * @param {string} restMethod - The request method.
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Any} content - The request content.
         * @param {string} [contentType] - The encoding for content.
         * @param {Array/number} [expectedResponseCodes] - A list of expected response codes.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        var invokeRequest = function (
            restMethod,
            uri,
            acceptType,
            content,
            contentType,
            expectedResponseCodes,
            headers
        ) {
            var uriRegex = /^[-a-zA-Z0-9()@:%_$,.~#?&\|\'\"\+\/\/=\s]*$/i;
            var validAcceptTypes = [
                "*/*",
                "application/json",
                "application/xml",
                "text/plain"
            ];

            var validContentTypes = [
                "application/json",
                "application/xml",
                "text/plain",
                "application/x-www-form-urlencoded"
            ];
        
            if (!uri || typeof uri !== "string") {
                throw new ReferenceError("uri is required and must be of type 'string'");
            } else if (uri && !uri.match(uriRegex)) {
                throw new ReferenceError("uri not a valid URI");
            }
            if (acceptType && typeof acceptType !== "string") {
                throw new TypeError("acceptType must be of type 'string'");
            } else if (acceptType && validAcceptTypes.indexOf(acceptType.toLowerCase()) < 0) {
                throw new ReferenceError("Invalid Accept type '" + acceptType + "'." + 
                " Supported Accept types: " + validAcceptTypes.join(', '));
            }
            if (contentType && typeof contentType !== "string") {
                throw new TypeError("contentType must be of type 'string'");
            } else if (contentType && validContentTypes.indexOf(contentType.toLowerCase()) < 0) {
                throw new ReferenceError("Invalid Content type '" + contentType + "'." + 
                " Supported Content types: " + validContentTypes.join(', '));
            }
            if (content && typeof content !== 'object') {
                throw new TypeError("content must be of type 'object'");
            }
            if (expectedResponseCodes && !Array.isArray(expectedResponseCodes)) {
                throw new TypeError("expectedResponseCodes must be of type 'Array/number'");
            } else if (expectedResponseCodes && expectedResponseCodes.length > 0) {
                expectedResponseCodes.forEach(
                    function(code) {
                        if (typeof code !== 'number') {
                            throw new TypeError("expectedResponseCodes must be of type 'Array/number'");
                        }
                    }
                );
            }
            if (headers && System.getObjectType(headers) !== "Properties") {
                throw new TypeError("headers must be of type 'Properties'");
            }

            var response;
            var statusCode;
            var retryAttempt = 1;

            // Default to status code '200' if no expected status codes have been defined.
            if (!expectedResponseCodes ||
                (Array.isArray(expectedResponseCodes) &&
                expectedResponseCodes.length < 1)) {
                expectedResponseCodes = [200];
            }

            createRequest.call(
                this,
                restMethod,
                uri,
                acceptType,
                content,
                contentType,
                headers
            );

            this.log.debug("Invoking request...");
            this.log.debug("URL: " + this.request.fullUrl);
            this.log.debug("Method: " + restMethod);

            if (content) {
                var regex = new RegExp('(password|secret/i)', 'i');
                var contentString = JSON.stringify(content);
                var matches = contentString.match(regex);
                if (matches) {
                    content[matches[1]] = "*******";
                    contentString = JSON.stringify(content);
                }
                this.log.debug("Content: " + contentString);
            }

            do {
                try {
                    response = this.request.execute();
                    statusCode = response.statusCode;
                    var responseString = response.contentAsString;
                    if (statusCode === 500 && this.retryOn500) {
                        response = null;
                        throw new Error(responseString)
                    }
                } catch (e) {
                    this.log.warn(
                        "Request failed: " + e + " retrying..." +
                        retryAttempt + " of " + this.retryMaxAttempts
                    );
                    if (retryAttempt < this.retryMaxAttempts) System.sleep(this.retryDelay * 1000);
                }
                retryAttempt++
            } while (!response && (retryAttempt <= this.retryMaxAttempts));
       
            if (!response) {
                throw new Error(
                    "Request failed after " + this.retryMaxAttempts.toString() +
                    " attempts. Aborting."
                );
            }

            if (expectedResponseCodes.indexOf(statusCode) > -1) {
                this.log.debug(
                    "Request completed successfully with status: " +
                    statusCode
                            );
            } else {
                throw new Error(
                    "Request failed, incorrect response code received: '" +
                    statusCode + "' expected one of: '" +
                    expectedResponseCodes.join(",") +
                    "'\n" + response.contentAsString
                );
            }

            return response;
        }

        /**
         * A function that creates the request.
         * @function
         * @param {string} restMethod - The request method.
         * @param {string} uri - The request uri.
         * @param {string} [acceptType] - The encoding format to accept.
         * @param {Any} [content] - The request content.
         * @param {string} [contentType] - The encoding for content.
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         * 
         * @returns {Any} The request response object.
         */

        var createRequest = function (
            restMethod,
            uri,
            acceptType,
            content,
            contentType,
            headers
        ) {
            // Perform URL encoding.
            if (contentType === 'application/x-www-form-urlencoded') {
                this.log.debug("x-www-form-urlencoded will be used for URL encoding.");
            } else {
                if (uri.indexOf('%') > -1) {
                    this.log.debug("Possible encoding detected in URI, encoder will not be used.");
                } else {
                    this.log.debug("Performing URL encoding.");
                    var uri = encodeURI(uri);
                    this.log.debug("Encoded URL: " + uri);
                }
            }

            // Set default media types if not defined.
            this.acceptType = acceptType || "application/json"
            this.contentType = contentType || this.acceptType;

            // Create request
            this.log.debug("Creating REST request...");
            this.log.debug("Setting Content-Type to '" + this.contentType + "'");

            if (!content ) {
                this.request = this.restHost.createRequest(restMethod,
                                                        uri);
                this.request.contentType = this.contentType;
            } else {
                if (contentType === 'application/x-www-form-urlencoded') {
                    this.request = this.restHost.createRequest(restMethod,
                                                            uri,
                                                            xwwwformurlencoder.call(this, content));
                    this.request.contentType = this.contentType;
                } else {
                    this.request = this.restHost.createRequest(restMethod,
                                                            uri,
                                                            JSON.stringify(content));
                    this.request.contentType = this.contentType;
                }
            }

            this.log.debug("Setting headers...");
            setHeaders.call(this, headers);
        }

        /**
         * function that sets the request headers.
         * @function
         * @param {Properties} [headers] - A key/value set of headers to include in the request.
         */

        var setHeaders = function (
            headers
        ) {
            this.log.debug("Adding Header: Accept: " + this.acceptType);
            this.request.setHeader("Accept", this.acceptType);
            this.log.debug("Adding Header: Content-Type: " + this.contentType);
            this.request.setHeader("Content-Type", this.contentType);
            if (headers) {
                headers.keys.forEach(
                    function (headerKey) {
                        var headerValue = headers.get(headerKey);
                        this.log.debug("Adding Header: '" + headerKey + ": " + headerValue + "'");
                        this.request.setHeader(headerKey, headerValue);
                    }, this
                );
            }
        }

        /**
         * A function that converts a JSON body to a form-url-encoded string
         * @function
         * @param {Any} [content] - The request content.
         */

        var xwwwformurlencoder = function (
            content
        ) {
            this.log.debug("Performing Form URL Encoding");
            var contentUrlEncoded = "";
            var keys = Object.keys(content);
                
            for (var i=0; i <keys.length; i++){
                var key = keys[i];
                if (key.toLowerCase() === 'password' || key.toLowerCase() === 'secret') {
                    var value = content[keys[i]];
                } else {
                    var value = encodeURIComponent(content[keys[i]]);
                }
                contentUrlEncoded += encodeURIComponent(key) + "=" + value;
                if (i < (keys.length -1 )) contentUrlEncoded += "&";
            }

            return contentUrlEncoded;
        }
    }

    return HttpRestClient;
});