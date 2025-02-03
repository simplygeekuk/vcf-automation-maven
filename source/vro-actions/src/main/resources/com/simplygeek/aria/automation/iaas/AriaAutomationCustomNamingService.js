/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationCustomNamingService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     * @param {string} apiToken - The Aria Automation API Token.
     *
     * @returns {Any} An instance of the AriaAutomationCustomNamingService class.
     */

    function AriaAutomationCustomNamingService(
        restHost,
        apiToken
    ) {
        AriaAutomationGenericBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationCustomNamingService"
        );

        this.baseUri = "/iaas/api";
        this.apiVersion = this.about().latestApiVersion;
        this.apiVersionParam = "apiVersion=" + this.apiVersion;

        this.createAuthenticatedSession(apiToken);
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationGenericBackendService();

    AriaAutomationCustomNamingService.prototype = Object.create(
        AriaAutomationGenericBackendService.prototype
    );
    AriaAutomationCustomNamingService.prototype.constructor = AriaAutomationCustomNamingService;

    /**
     * Defines the getCustomNames method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of custom names.
     */

    AriaAutomationCustomNamingService.prototype.getCustomNames = function () {
        var uri = this.baseUri + "/naming?" + this.apiVersionParam;
        var results;

        this.log.debug("Getting a list of Custom Names");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Custom Names");

        return results;
    };

    /**
     * Defines the getCustomNamingById method.
     * @method
     * @public
     * @param {string} customNamingId - The custom naming uuid.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The custom naming object.
     */

    AriaAutomationCustomNamingService.prototype.getCustomNamingById = function (
        customNamingId,
        throwOnNotFound
    ) {
        if (!customNamingId || typeof customNamingId !== "string") {
            throw new ReferenceError(
                "customNamingId is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/naming/" + customNamingId + "?" + this.apiVersionParam;
        var customNamingObject;

        this.log.debug("Getting custom naming with ID '" + customNamingId + "'");
        customNamingObject = this.get(uri, null, throwOnNotFound);
        if (customNamingObject) {
            var customNamingName = customNamingObject.name;

            this.log.debug(
                "Found custom naming with name '" + customNamingName +
                "' and id '" + customNamingId + "'"
            );
        }

        return customNamingObject;
    };

    /**
     * Defines the getCustomNamingByName method.
     * @method
     * @public
     * @param {string} customNamingName - The custom naming name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The custom naming object.
     */

    AriaAutomationCustomNamingService.prototype.getCustomNamingByName = function (
        customNamingName,
        throwOnNotFound
    ) {
        if (!customNamingName || typeof customNamingName !== "string") {
            throw new ReferenceError(
                "customNamingName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;
        var uri = this.baseUri + "/naming?$filter=name eq '" + customNamingName + "'" +
                                 "&" + this.apiVersionParam;
        var customNamingObject;
        var customNamingFullObject;

        this.log.debug(
            "Getting custom naming profile with name '" +
            customNamingName + "'"
        );
        var results = this.get(
            uri,
            null,
            false
        );

        if (results && results.length > 1) {
            throw new Error(
                "More than one custom naming profile found. Unable to determine correct custom" +
                " naming profile with name '" + customNamingName + "'"
            );
        } else if (results && results.length > 0) {
            customNamingObject = results[0];
            customNamingFullObject = this.getCustomNamingById(customNamingObject.id);
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Custom naming profile not found with name '" +
                    customNamingName + "'"
                );
            } else {
                this.log.warn(
                    "Custom naming profile not found with name '" +
                    customNamingName + "'"
                );
            }
        }

        return customNamingFullObject;
    };

    /**
     * Defines the updateCustomNaming method.
     * @method
     * @public
     * @param {string} customNamingId - The custom naming uuid.
     * @param {Any} updatedObject - The custom naming object to update.
     *
     * @returns {Any} The updated custom naming object.
     */

    AriaAutomationCustomNamingService.prototype.updateCustomNaming = function (
        customNamingId,
        updatedObject
    ) {
        if (!customNamingId || typeof customNamingId !== "string") {
            throw new ReferenceError(
                "customNamingId is required and must " +
                "be of type 'string'"
            );
        }
        if (!updatedObject || typeof updatedObject !== "object") {
            throw new ReferenceError(
                "updatedObject is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/naming?" + this.apiVersionParam;
        var updatedCustomNamingObject;

        updatedCustomNamingObject = this.put(
            uri,
            updatedObject
        );

        return updatedCustomNamingObject;
    };

    /**
     * Defines the checkCustomNamingPrefixExists method.
     * @method
     * @public
     * @param {string} customNamingId - The custom naming uuid.
     * @param {string} prefix - The static pattern to find.
     *
     * @returns {boolean} Whether the prefix was found.
     */

    AriaAutomationCustomNamingService.prototype.checkCustomNamingPrefixExists = function (
        customNamingId,
        prefix
    ) {
        if (!customNamingId || typeof customNamingId !== "string") {
            throw new ReferenceError(
                "customNamingId is required and must " +
                "be of type 'string'"
            );
        }
        if (!prefix || typeof prefix !== "string") {
            throw new ReferenceError(
                "prefix is required and must " +
                "be of type 'string'"
            );
        }

        var prefixFound = false;
        var customNamingObject = this.getCustomNamingById(customNamingId);

        this.log.debug("Checking if prefix '" + prefix + "' exists in custom naming profile");
        if (customNamingObject.templates) {
            this.log.debug("Found " + customNamingObject.templates.length + " naming templates");
            var customNamingTemplates = customNamingObject.templates;
            var templatesWithPrefix = customNamingTemplates.filter(
                function(template) {
                    var staticPattern = template.staticPattern.toLowerCase();

                    return staticPattern === prefix.toLowerCase();
                }
            );

            this.log.debug("Found " + templatesWithPrefix.length + " templates matching prefix");
            if (templatesWithPrefix.length > 0) prefixFound = true;
            this.log.debug("prefixFound: " + prefixFound);
        }

        return prefixFound;
    };

    /**
     * Defines the addCustomNamingPrefixToTemplate method.
     * @method
     * @public
     * @param {string} customNamingId - The custom naming uuid.
     * @param {string} prefix - The static pattern to find.
     * @param {string} resourceType - The custom naming resource type.
     * @param {number} [startCounter] - The number to start incrementing from.
     * @param {number} [incrementStep] - The increment step to increase by.
     *
     * @returns {Any} The updated Custom Naming object.
     */

    AriaAutomationCustomNamingService.prototype.addCustomNamingPrefixToTemplate = function (
        customNamingId,
        prefix,
        resourceType,
        startCounter,
        incrementStep
    ) {
        if (!customNamingId || typeof customNamingId !== "string") {
            throw new ReferenceError(
                "customNamingId is required and must " +
                "be of type 'string'"
            );
        }
        if (!prefix || typeof prefix !== "string") {
            throw new ReferenceError(
                "prefix is required and must " +
                "be of type 'string'"
            );
        }
        var validResourceTypes = [
            "COMPUTE",
            "NETWORK",
            "COMPUTE_STORAGE",
            "LOAD_BALANCER",
            "RESOURCE_GROUP",
            "GATEWAY",
            "NAT",
            "SECURITY_GROUP",
            "GENERIC"
        ];

        if (!resourceType || typeof resourceType !== "string") {
            throw new ReferenceError(
                "resourceType is required and must " +
                "be of type 'string'"
            );
        } else if (resourceType && validResourceTypes.indexOf(resourceType.toUpperCase()) < 0) {
            throw new ReferenceError(
                "Unsupported resource type '" + resourceType + "'." +
                " Supported resource types: " + validResourceTypes.join(", "));
        }

        var customNamingObject = this.getCustomNamingById(customNamingId);
        var customNamingName = customNamingObject.name;

        this.log.debug(
            "Adding prefix '" + prefix + "' to custom naming '" +
            customNamingName + "'"
        );

        if (!customNamingObject.templates) {
            throw new Error(
                "No existing templates were found. A template must already exist" +
                " for the resource type before a prefix can be added"
            );
        }

        this.log.debug("Get default template for resource type '" + resourceType + "'");
        var customNamingTemplates = customNamingObject.templates;
        var defaultTemplates = customNamingTemplates.filter(
            function(template) {
                return template.resourceType === resourceType.toUpperCase() &&
                        template.resourceDefault === true;
            }
        );

        if (defaultTemplates.length === 0) {
            throw new Error(
                "No default template found for resource type '" +
                resourceType.toUpperCase() + "'");
        }
        var pattern = defaultTemplates[0].pattern;
        var newNamingTemplate = {};

        newNamingTemplate.resourceType = resourceType.toUpperCase();
        newNamingTemplate.incrementStep = (incrementStep || incrementStep === 0) ? incrementStep : 1;
        newNamingTemplate.startCounter = (startCounter || startCounter === 0) ? startCounter : 1;
        newNamingTemplate.pattern = pattern;
        newNamingTemplate.staticPattern = prefix;

        customNamingObject.templates.push(newNamingTemplate);
        var updatedCustomNamingObject = this.updateCustomNaming(
            customNamingId,
            customNamingObject
        );

        this.log.debug("The prefix '" + prefix + "' has been successfully added");

        return updatedCustomNamingObject;
    };

    return AriaAutomationCustomNamingService;
});