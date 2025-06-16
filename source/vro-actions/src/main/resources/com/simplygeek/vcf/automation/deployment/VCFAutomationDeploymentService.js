/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the VCFAutomationDeploymentService class.
     * @class
     * @param {REST:RESTHost} restHost - The VCF Automation HTTP REST host.
     * @param {string} apiToken - The VCF Automation API Token.
     *
     * @returns {Any} An instance of the VCFAutomationDeploymentService class.
     */

    function VCFAutomationDeploymentService(
        restHost,
        apiToken
    ) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }
        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError(
                "apiToken is required and must " +
                "be of type 'string'"
            );
        }

        this.restHost = restHost;

        VCFAutomationGenericBackendService.call(this);

        this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
            "Action",
            "VCFAutomationDeploymentService"
        );

        this.baseUri = "/deployment/api";

        this.createAuthenticatedSession(apiToken);
    }

    var VCFAutomationGenericBackendService = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationGenericBackendService();

    VCFAutomationDeploymentService.prototype = Object.create(
        VCFAutomationGenericBackendService.prototype
    );
    VCFAutomationDeploymentService.prototype.constructor = VCFAutomationDeploymentService;

    // ─────────────────────────────────────────────────────────────────────────────
    // Deployments
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get a list of deployments.
     * @method
     * @public
     * @param {Array/string} statuses - Results must be associated with one of these statuses.
     * @param {Array/string} projects - Results must be associated with one of these project IDs.
     * @param {Array/string} resourceTypes - Results must be associated with one of these resourceType Names.
     * @param {Array/string} cloudAccounts - Results must be associated with one of these cloud accounts.
     * @param {Array/string} cloudTypes - Results must be associated with one of these endpoint Types.
     * @param {Array/string} requestedBy - Results must be associated with one of these requesters.
     * @param {Array/string} ownedBy - Results must be associated with one of these owners.
     * @param {Array/string} tags - Results must be associated with one of these tags.
     *
     * @returns {Array/Any} The list of deployments.
     */

    VCFAutomationDeploymentService.prototype.getDeployments = function (
        statuses,
        projects,
        resourceTypes,
        cloudAccounts,
        cloudTypes,
        requestedBy,
        ownedBy,
        tags
    ) {
        var validStatuses = [
            "ABORTED",
            "APPROVAL_PENDING",
            "APPROVAL_REJECTED",
            "FAILED",
            "INPROGRESS",
            "PENDING",
            "SUCCESSFUL"
        ];

        if (statuses && !Array.isArray(statuses)) {
            throw new TypeError("statuses not of type 'Array/string'");
        } else if (statuses && statuses.length > 0) {
            if (!statuses.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("statuses not of type 'Array/string'");
            } else if (!statuses.every(function(x) {return validStatuses.indexOf(x.toUpperCase()) > -1})) {
                throw new ReferenceError("Unsupported statuses '" + statuses.join(", ") + "'." +
                                        " Supported statuses: " + validStatuses.join(", "));
            }
        }
        if (projects && !Array.isArray(projects)) {
            throw new TypeError("projects not of type 'Array/string'");
        } else if (projects && projects.length > 0) {
            if (!projects.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("projects not of type 'Array/string'");
            }
        }
        if (resourceTypes && !Array.isArray(resourceTypes)) {
            throw new TypeError("resourceTypes not of type 'Array/string'");
        } else if (resourceTypes && resourceTypes.length > 0) {
            if (!resourceTypes.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("resourceTypes not of type 'Array/string'");
            }
        }
        if (cloudAccounts && !Array.isArray(cloudAccounts)) {
            throw new TypeError("cloudAccounts not of type 'Array/string'");
        } else if (cloudAccounts && cloudAccounts.length > 0) {
            if (!cloudAccounts.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("cloudAccounts not of type 'Array/string'");
            }
        }
        if (cloudTypes && !Array.isArray(cloudTypes)) {
            throw new TypeError("cloudTypes not of type 'Array/string'");
        } else if (cloudTypes && cloudTypes.length > 0) {
            if (!cloudTypes.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("cloudTypes not of type 'Array/string'");
            }
        }
        if (requestedBy && !Array.isArray(requestedBy)) {
            throw new TypeError("requestedBy not of type 'Array/string'");
        } else if (requestedBy && requestedBy.length > 0) {
            if (!requestedBy.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("requestedBy not of type 'Array/string'");
            }
        }
        if (ownedBy && !Array.isArray(ownedBy)) {
            throw new TypeError("ownedBy not of type 'Array/string'");
        } else if (ownedBy && ownedBy.length > 0) {
            if (!ownedBy.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("ownedBy not of type 'Array/string'");
            }
        }
        if (tags && !Array.isArray(tags)) {
            throw new TypeError("ownedBy not of type 'Array/string'");
        } else if (tags && tags.length > 0) {
            if (!tags.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("tags not of type 'Array/string'");
            }
        }

        var uri = this.baseUri + "/deployments?expand=blueprint,catalog," +
                                 "lastRequest,project,resources,inprogressRequests," +
                                 "metadata,user";
        var results;

        if (statuses && statuses.length > 0) {
            uri += "&projects=" + statuses.join(",");
        }
        if (projects && projects.length > 0) {
            uri += "&projects=" + projects.join(",");
        }
        if (resourceTypes && resourceTypes.length > 0) {
            uri += "&resourceTypes=" + resourceTypes.join(",");
        }
        if (cloudAccounts && cloudAccounts.length > 0) {
            uri += "&cloudAccounts=" + cloudAccounts.join(",");
        }
        if (cloudTypes && cloudTypes.length > 0) {
            uri += "&cloudTypes=" + cloudTypes.join(",");
        }
        if (requestedBy && requestedBy.length > 0) {
            uri += "&requestedBy=" + requestedBy.join(",");
        }
        if (ownedBy && ownedBy.length > 0) {
            uri += "&ownedBy=" + ownedBy.join(",");
        }
        if (tags && tags.length > 0) {
            uri += "&tags=" + tags.join(",");
        }

        this.log.debug("Getting a list of Deployments");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Deployments");

        return results;
    };

    /**
     * get a deployment by its ID.
     * @method
     * @public
     * @param {string} deploymentId - The deployment id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The deployment object.
     */

    VCFAutomationDeploymentService.prototype.getDeploymentById = function (
        deploymentId,
        throwOnNotFound
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/deployments/" + deploymentId +
                                 "?expand=blueprint,catalog,project," +
                                 "lastRequest,resources,inprogressRequests," +
                                 "metadata,user";
        var deploymentObject;

        this.log.debug("Getting deployment with id '" + deploymentId + "'");
        deploymentObject = this.get(uri, [200, 404]);

        if (deploymentObject) {
            var deploymentName = deploymentObject.name;

            this.log.debug(
                "Found deployment with name '" + deploymentName +
                "' and id '" + deploymentId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Deployment with id '" + deploymentId + "' not found"
                );
            } else {
                this.log.warn(
                    "Deployment with id '" + deploymentId + "' not found"
                );
            }

        }

        return deploymentObject;
    };

    /**
     * Get a deployment by its name.
     * @method
     * @public
     * @param {string} deploymentName - The deployment name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The deployment object.
     */

    VCFAutomationDeploymentService.prototype.getDeploymentByName = function (
        deploymentName,
        throwOnNotFound
    ) {
        if (!deploymentName || typeof deploymentName !== "string") {
            throw new ReferenceError(
                "deploymentName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/deployments?$filter=name eq '" + deploymentName + "'" +
                                 "&expand=blueprint,catalog,project," +
                                 "lastRequest,resources,inprogressRequests," +
                                 "metadata,user";
        var deploymentId;
        var deploymentObject;

        this.log.debug(
            "Getting deployment with name '" + deploymentName + "'"
        );

        var results = this.get(uri);

        if (results.length > 1) {
            throw new Error(
                "More than one deployment found. Unable to determine correct " +
                "deployment with name '" + deploymentName + "'"
            );
        } else if (results.length > 0) {
            deploymentObject = results[0];
            deploymentId = deploymentObject.id;

            this.log.debug(
                "Found deployment '" + deploymentName + "' with " +
                "id '" + deploymentId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Deployment not found with name '" + deploymentName + "'"
                );
            } else {
                this.log.warn(
                    "Deployment not found with name '" + deploymentName + "'"
                );
            }
        }

        return deploymentObject;
    };

    /**
     * Updates a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment id.
     * @param {object} updatedDeploymentObject - The deployment object to update.
     *
     * @returns {Any} The updated deployment object.
     */

    VCFAutomationDeploymentService.prototype.updateDeployment = function (
        deploymentId,
        updatedDeploymentObject
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!updatedDeploymentObject || typeof updatedDeploymentObject !== "object") {
            throw new ReferenceError(
                "updatedDeploymentObject is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId;
        var deploymentObject;

        this.log.debug("Updating deployment with id '" + deploymentId + "'");
        deploymentObject = this.patch(uri, updatedDeploymentObject);
        this.log.debug("Deployment with id '" + deploymentId + "' updated with success");

        return deploymentObject;
    };

    /**
     * Deletes a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {boolean} [wait=true] - If true, waits for the action to complete.
     * @param {number} [intervalSeconds=10] - Polling interval.
     * @param {number} [timeoutSeconds=300] - Timeout.
     *
     * @returns {object} The final or initial request object.
     */
    VCFAutomationDeploymentService.prototype.deleteDeployment = function (
        deploymentId,
        wait,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId;
        var request;

        // Default wait to true, unless explicitly set to false.
        wait = wait !== false;

        this.log.debug("Deleting deployment with id '" + deploymentId + "'");
        request = this.delete(uri);
        this.log.debug("Deployment delete request submitted with id '" + request.id + "'");

        if (wait) {
            return this.pollRequestStatus(
                request.id,
                intervalSeconds || 10,
                timeoutSeconds || 300
            );
        }

        return request;
    };

    /**
     * Gets available Day-2 actions for a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     *
     * @returns {Array} The list of available actions.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentActions = function (
        deploymentId
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/actions";
        var actions;

        this.log.debug("Getting actions for deployment '" + deploymentId + "'");
        actions = this.get(uri);
        this.log.debug("Found " + actions.length + " actions");

        return actions;
    };

    /**
     * Gets a specific Day-2 action by its ID for a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} actionId - The action ID.
     *
     * @returns {object} The deployment action.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentActionById = function (
        deploymentId,
        actionId
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/actions/" + actionId;
        var action;

        this.log.debug("Getting deployment action with ID '" + actionId + "'");
        action = this.get(uri, [200, 404]);
        if (action) {
            var actionName = action.name;

            this.log.debug(
                "Found action with name '" + actionName +
                "' and id '" + actionId + "'"
            );
        } else {
            throw new Error(
                "Action with id '" + actionId + "' not found"
            );
        }

        return action;
    };

    /**
     * Runs a Day-2 action on a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} actionId - The action ID.
     * @param {object} [inputs] - Optional inputs.
     * @param {boolean} [wait=true] - If true, waits for the action to complete.
     * @param {number} [intervalSeconds=10] - Polling interval.
     * @param {number} [timeoutSeconds=300] - Timeout.
     *
     * @returns {object} The final or initial request object.
     */
    VCFAutomationDeploymentService.prototype.runDeploymentAction = function (
        deploymentId,
        actionId,
        inputs,
        wait,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/requests";
        var payload = {
            actionId: actionId,
            inputs: inputs || {}
        };
        var request;

        // Default wait to true, unless explicitly set to false.
        wait = wait !== false;

        this.log.debug("Running action '" + actionId + "' on deployment '" + deploymentId + "'");
        request = this.post(uri, payload);
        this.log.debug("Request submitted with ID '" + request.id + "'");

        if (wait) {
            return this.pollRequestStatus(
                request.id,
                intervalSeconds || 10,
                timeoutSeconds || 300
            );
        }

        return request;
    };

    /**
     * Lists all request records for a deployment (Day-1 and Day-2).
     * @param {string} deploymentId - The deployment ID.
     *
     * @returns {Array} List of request objects.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentRequests = function (deploymentId) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/requests";
        var requests;

        this.log.debug("Getting request history for deployment '" + deploymentId + "'");
        requests = this.get(uri);
        this.log.debug("Found " + requests.length + " requests");

        return requests;
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Deployment Resources
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Lists resources within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     *
     * @returns {Array/Any} List of resources for the deployment.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentResources = function (deploymentId) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources";
        var resources;

        this.log.debug("Getting resources for deployment '" + deploymentId + "'");
        resources = this.get(uri);
        this.log.debug("Found " + resources.length + " resources");

        return resources;
    };

    /**
     * Gets a specific resource by ID within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} resourceId - The resource ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw if not found.
     *
     * @returns {object|null} The resource object or null if not found.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentResourceById = function (
        deploymentId,
        resourceId,
        throwOnNotFound
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources/" + resourceId;
        var resourceObject;

        this.log.debug("Getting resource with ID '" + resourceId + "' from deployment '" + deploymentId + "'");
        resourceObject = this.get(uri, [200, 404]);

        if (resourceObject) {
            var resourceName = resourceObject.name;

            this.log.debug(
                "Found resource with name '" + resourceName +
                "' and id '" + resourceId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Resource with id '" + resourceId + "' not found"
                );
            } else {
                this.log.warn(
                    "Resource with id '" + resourceId + "' not found"
                );
            }
        }

        return resourceObject;
    };

    /**
     * Deletes a resource within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} resourceId - The resource ID.
     * @param {boolean} [wait=true] - If true, waits for the action to complete.
     * @param {number} [intervalSeconds=10] - Polling interval.
     * @param {number} [timeoutSeconds=300] - Timeout.
     *
     * @returns {object} The final or initial request object.
     */
    VCFAutomationDeploymentService.prototype.deleteDeploymentResource = function (
        deploymentId,
        resourceId,
        wait,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources/" + resourceId;
        var request;

        // Default wait to true, unless explicitly set to false.
        wait = wait !== false;

        this.log.debug("Deleting deployment resource with id '" + resourceId + "'");
        request = this.delete(uri);
        this.log.debug("Deployment resource delete request submitted with id '" + request.id + "'");

        if (wait) {
            return this.pollRequestStatus(
                request.id,
                intervalSeconds || 10,
                timeoutSeconds || 300
            );
        }

        return request;
    };

    /**
     * Gets available Day-2 actions for a resource within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} resourceId - The deployment resource ID.
     *
     * @returns {Array} The list of available actions.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentResourceActions = function (
        deploymentId,
        resourceId
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources/" + resourceId + "/actions";
        var actions;

        this.log.debug("Getting actions for resource with ID '" + resourceId + "' in deployment '" + deploymentId + "'");
        actions = this.get(uri);
        this.log.debug("Found " + actions.length + " actions");

        return actions;
    };

    /**
     * Gets a specific Day-2 action by its ID for a resource within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} resourceId - The deployment resource ID.
     * @param {string} actionId - The action ID.
     *
     * @returns {object} The deployment action.
     */
    VCFAutomationDeploymentService.prototype.getDeploymentResourceActionById = function (
        deploymentId,
        resourceId,
        actionId
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources/" + resourceId + "/actions/" + actionId;
        var action;

        this.log.debug("Getting deployment resource action with ID '" + actionId + "'");
        action = this.get(uri, [200, 404]);
        if (action) {
            var actionName = action.name;

            this.log.debug(
                "Found action with name '" + actionName +
                "' and id '" + actionId + "'"
            );
        } else {
            throw new Error(
                "Action with id '" + actionId + "' not found"
            );
        }

        return action;
    };

    /**
     * Runs a Day-2 action on a resource within a deployment.
     * @method
     * @public
     * @param {string} deploymentId - The deployment ID.
     * @param {string} resourceId - The deployment resource ID.
     * @param {string} actionId - The action ID.
     * @param {object} [inputs] - Optional inputs.
     * @param {boolean} [wait=true] - If true, waits for the action to complete.
     * @param {number} [intervalSeconds=10] - Polling interval.
     * @param {number} [timeoutSeconds=300] - Timeout.
     *
     * @returns {object} The final or initial request object.
     */
    VCFAutomationDeploymentService.prototype.runDeploymentResourceAction = function (
        deploymentId,
        resourceId,
        actionId,
        inputs,
        wait,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!deploymentId || typeof deploymentId !== "string") {
            throw new ReferenceError(
                "deploymentId is required and must " +
                "be of type 'string'"
            );
        }
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/deployments/" + deploymentId + "/resources/" + resourceId + "/requests";
        var payload = {
            actionId: actionId,
            inputs: inputs || {}
        };
        var request;

        // Default wait to true, unless explicitly set to false.
        wait = wait !== false;

        this.log.debug("Running action '" + actionId + "' on resource '" + resourceId + "' in deployment '" + deploymentId + "'");
        request = this.post(uri, payload);
        this.log.debug("Request submitted with ID '" + request.id + "'");

        if (wait) {
            return this.pollRequestStatus(
                request.id,
                intervalSeconds || 10,
                timeoutSeconds || 300
            );
        }

        return request;
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Resources
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get all resource types.
     * @method
     * @public
     *
     * @returns {Array} The list of available resource types.
     */
    VCFAutomationDeploymentService.prototype.getResourceTypes = function () {
        var uri = this.baseUri + "/resource-types";
        var resourceTypes;

        this.log.debug("Getting a list of available resource-types");
        resourceTypes = this.get(uri);
        this.log.debug("Found " + resourceTypes.length + " resource-types");

        return resourceTypes;
    };

    /**
     * Gets a specific resource-type by its ID.
     * @method
     * @public
     * @param {string} resourceTypeId - The resource-type ID.
     *
     * @returns {object} The resource-type.
     */
    VCFAutomationDeploymentService.prototype.getResourceTypeById = function (
        resourceTypeId
    ) {
        if (!resourceTypeId || typeof resourceTypeId !== "string") {
            throw new ReferenceError(
                "resourceTypeId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resource-types/" + resourceTypeId;
        var resourceType;

        this.log.debug("Getting resource-type with ID '" + resourceTypeId + "'");
        resourceType = this.get(uri, [200, 404]);
        if (resourceType) {
            var resourceTypeName = resourceType.name;

            this.log.debug(
                "Found resource-type with name '" + resourceTypeName +
                "' and id '" + resourceTypeId + "'"
            );
        } else {
            throw new Error(
                "Resource-type with id '" + resourceTypeId + "' not found"
            );
        }

        return resourceType;
    };

    /**
     * Get a list of resources.
     * @method
     * @public
     * @param {Array/string} projects - Results must be associated with one of these project IDs.
     * @param {Array/string} resourceTypes - Results must be associated with one of these resourceType Names.
     * @param {Array/string} cloudAccounts - Results must be associated with one of these cloud accounts.
     * @param {Array/string} cloudTypes - Results must be associated with one of these endpoint Types.
     * @param {Array/string} tags - Results must be associated with one of these tags.
     * @param {Array/string} syncStatuses - Results must be associated with one of these SyncStatuses.
     * @param {boolean} isManaged - If true, return only resources that are managed.
     *
     * @returns {Array/Any} The list of managed resources.
     */

    VCFAutomationDeploymentService.prototype.getResources = function (
        projects,
        resourceTypes,
        cloudAccounts,
        cloudTypes,
        tags,
        syncStatuses,
        isManaged
    ) {
        var validSyncStatuses = [
            "MISSING",
            "STALE"
        ];

        if (syncStatuses && !Array.isArray(syncStatuses)) {
            throw new TypeError("syncStatuses not of type 'Array/string'");
        } else if (syncStatuses && syncStatuses.length > 0) {
            if (!syncStatuses.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("syncStatuses not of type 'Array/string'");
            } else if (!syncStatuses.every(function(x) {return validSyncStatuses.indexOf(x.toUpperCase()) > -1})) {
                throw new ReferenceError("Unsupported syncStatuses '" + syncStatuses.join(", ") + "'." +
                                        " Supported syncStatuses: " + validSyncStatuses.join(", "));
            }
        }
        if (projects && !Array.isArray(projects)) {
            throw new TypeError("projects not of type 'Array/string'");
        } else if (projects && projects.length > 0) {
            if (!projects.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("projects not of type 'Array/string'");
            }
        }
        if (resourceTypes && !Array.isArray(resourceTypes)) {
            throw new TypeError("resourceTypes not of type 'Array/string'");
        } else if (resourceTypes && resourceTypes.length > 0) {
            if (!resourceTypes.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("resourceTypes not of type 'Array/string'");
            }
        }
        if (cloudAccounts && !Array.isArray(cloudAccounts)) {
            throw new TypeError("cloudAccounts not of type 'Array/string'");
        } else if (cloudAccounts && cloudAccounts.length > 0) {
            if (!cloudAccounts.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("cloudAccounts not of type 'Array/string'");
            }
        }
        if (cloudTypes && !Array.isArray(cloudTypes)) {
            throw new TypeError("cloudTypes not of type 'Array/string'");
        } else if (cloudTypes && cloudTypes.length > 0) {
            if (!cloudTypes.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("cloudTypes not of type 'Array/string'");
            }
        }
        if (tags && !Array.isArray(tags)) {
            throw new TypeError("ownedBy not of type 'Array/string'");
        } else if (tags && tags.length > 0) {
            if (!tags.every(function(x) {return typeof x === "string"})) {
                throw new TypeError("tags not of type 'Array/string'");
            }
        }

        // Default isManaged to true, unless explicitly set to false.
        isManaged = isManaged !== false;

        var managedOrigins = [
            "DEPLOYED",
            "ONBOARDED",
            "MIGRATED"
        ];
        var uri = this.baseUri + "/resources?expand=project,deployment," +
                                 "currentRequest,inprogressRequests,user";
        var results;

        if (projects && projects.length > 0) {
            uri += "&projects=" + projects.join(",");
        }
        if (resourceTypes && resourceTypes.length > 0) {
            uri += "&resourceTypes=" + resourceTypes.join(",");
        }
        if (cloudAccounts && cloudAccounts.length > 0) {
            uri += "&cloudAccounts=" + cloudAccounts.join(",");
        }
        if (cloudTypes && cloudTypes.length > 0) {
            uri += "&cloudTypes=" + cloudTypes.join(",");
        }
        if (tags && tags.length > 0) {
            uri += "&tags=" + tags.join(",");
        }
        if (syncStatuses && syncStatuses.length > 0) {
            uri += "&syncStatus=" + syncStatuses.join(",");
        }
        if (isManaged) {
            uri += "&origin=" + managedOrigins.join(",");
        }

        this.log.debug("Getting a list of managed resources");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Resources");

        return results;
    };

    /**
     * Get a resource by its ID.
     * @method
     * @public
     * @param {string} resourceId - The resource ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The resource object.
     */

    VCFAutomationDeploymentService.prototype.getResourceById = function (
        resourceId,
        throwOnNotFound
    ) {
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resources/" + resourceId +
                                 "?expand=project,deployment,currentRequest," +
                                 "inprogressRequests,user";
        var resourceObject;

        this.log.debug("Getting resource with id '" + resourceId + "'");
        resourceObject = this.get(uri, [200, 404]);

        if (resourceObject) {
            var resourceName = resourceObject.name;

            this.log.debug(
                "Found resource with name '" + resourceName +
                "' and id '" + resourceId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Resource with id '" + resourceId + "' not found"
                );
            } else {
                this.log.warn(
                    "Resource with id '" + resourceId + "' not found"
                );
            }
        }

        return resourceObject;
    };

    /**
     * Gets available Day-2 actions for a resource.
     * @method
     * @public
     * @param {string} resourceId - The resource ID.
     *
     * @returns {Array} The list of available actions.
     */
    VCFAutomationDeploymentService.prototype.getResourceActions = function (
        resourceId
    ) {
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resources/" + resourceId + "/actions";
        var actions;

        this.log.debug("Getting actions for resource '" + resourceId + "'");
        actions = this.get(uri);
        this.log.debug("Found " + actions.length + " actions");

        return actions;
    };

    /**
     * Gets a specific Day-2 action by its ID for a resource.
     * @method
     * @public
     * @param {string} resourceId - The resource ID.
     * @param {string} actionId - The action ID.
     *
     * @returns {object} The resource action.
     */
    VCFAutomationDeploymentService.prototype.getResourceActionById = function (
        resourceId,
        actionId
    ) {
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resources/" + resourceId + "/actions/" + actionId;
        var action;

        this.log.debug("Getting resource action with ID '" + actionId + "'");
        action = this.get(uri, [200, 404]);
        if (action) {
            var actionName = action.name;

            this.log.debug(
                "Found action with name '" + actionName +
                "' and id '" + actionId + "'"
            );
        } else {
            throw new Error(
                "Action with id '" + actionId + "' not found"
            );
        }

        return action;
    };

    /**
     * Runs a Day-2 action on a resource.
     * @method
     * @public
     * @param {string} resourceId - The resource ID.
     * @param {string} actionId - The action ID.
     * @param {object} [inputs] - Optional inputs.
     * @param {boolean} [wait=true] - If true, waits for the action to complete.
     * @param {number} [intervalSeconds=10] - Polling interval.
     * @param {number} [timeoutSeconds=300] - Timeout.
     *
     * @returns {object} The final or initial request object.
     */
    VCFAutomationDeploymentService.prototype.runResourceAction = function (
        resourceId,
        actionId,
        inputs,
        wait,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }
        if (!actionId || typeof actionId !== "string") {
            throw new ReferenceError(
                "actionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resources/" + resourceId + "/requests";
        var payload = {
            actionId: actionId,
            inputs: inputs || {}
        };
        var request;

        // Default wait to true, unless explicitly set to false.
        wait = wait !== false;

        this.log.debug("Running action '" + actionId + "' on resource '" + resourceId + "'");
        request = this.post(uri, payload);
        this.log.debug("Request submitted with ID '" + request.id + "'");

        if (wait) {
            return this.pollRequestStatus(
                request.id,
                intervalSeconds || 10,
                timeoutSeconds || 300
            );
        }

        return request;
    };

    /**
     * Lists all request records for a resource (Day-1 and Day-2).
     * @param {string} resourceId - The resource ID.
     *
     * @returns {Array} List of request objects.
     */
    VCFAutomationDeploymentService.prototype.getResourceRequests = function (
        resourceId
    ) {
        if (!resourceId || typeof resourceId !== "string") {
            throw new ReferenceError(
                "resourceId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/resources/" + resourceId + "/requests";
        var requests;

        this.log.debug("Getting request history for resource '" + resourceId + "'");
        requests = this.get(uri);
        this.log.debug("Found " + requests.length + " requests");

        return requests;
    };

    /**
     * Polls the status of a deployment or resource action request until complete.
     * @method
     * @public
     * @param {string} requestId - The request ID (from an action).
     * @param {number} [intervalSeconds=10] - Polling interval in seconds.
     * @param {number} [timeoutSeconds=300] - Maximum time to wait before aborting.
     *
     * @returns {object} Final request object.
     */
    VCFAutomationDeploymentService.prototype.pollRequestStatus = function (
        requestId,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!requestId || typeof requestId !== "string") {
            throw new ReferenceError("requestId must be a string");
        }

        intervalSeconds = intervalSeconds || 10;
        timeoutSeconds = timeoutSeconds || 300;

        var uri = this.baseUri + "/requests/" + requestId;
        var elapsed = 0;
        var status;
        var result;

        this.log.debug("Polling request status for request ID '" + requestId + "'");

        while (elapsed < timeoutSeconds) {
            result = this.get(uri);
            status = result.status;

            this.log.debug("Request status: " + status + " (elapsed: " + elapsed + "s)");

            if (status === "SUCCESSFUL") {
                this.log.debug("Request '" + requestId + "' completed successfully");

                return result;
            } else if (status === "FAILED" || status === "CANCELLED" || status === "REJECTED") {
                throw new Error("Request '" + requestId + "' ended with status: " + status);
            }

            System.sleep(intervalSeconds * 1000); // milliseconds
            elapsed += intervalSeconds;
        }

        throw new Error("Request '" + requestId + "' timed out after " + timeoutSeconds + " seconds");
    };

    return VCFAutomationDeploymentService;
});