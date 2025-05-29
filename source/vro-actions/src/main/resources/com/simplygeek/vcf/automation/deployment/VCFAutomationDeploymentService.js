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

    /**
     * Defines the getDeployments method.
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
     * Defines the getDeploymentById method.
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
     * Defines the getDeploymentByName method.
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
     * Defines the getDeploymentById method.
     * @method
     * @public
     * @param {string} deploymentId - The deployment id.
     * @param {object} updatedDeploymentObject - The deployment object to update.
     *
     * @returns {Any} The deployment object.
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
     * Defines the getResources method.
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
     * Defines the getResourceById method.
     * @method
     * @public
     * @param {string} resourceId - The resource id.
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

    return VCFAutomationDeploymentService;
});