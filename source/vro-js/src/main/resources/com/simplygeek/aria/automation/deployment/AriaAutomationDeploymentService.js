/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationDeploymentService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     *
     * @returns {Any} An instance of the AriaAutomationDeploymentService class.
     */

    function AriaAutomationDeploymentService(restHost) {
        AriaAutomationGenericBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationDeploymentService"
        );

        this.baseUri = "/deployment/api";
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationGenericBackendService();

    AriaAutomationDeploymentService.prototype = Object.create(
        AriaAutomationGenericBackendService.prototype
    );
    AriaAutomationDeploymentService.prototype.constructor = AriaAutomationDeploymentService;

    /**
     * Defines the getDeployments method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of deployments.
     */

    AriaAutomationDeploymentService.prototype.getDeployments = function () {
        var uri = this.baseUri + "/deployments?expand=blueprint,catalog," +
                                 "lastRequest,project,resources,inprogressRequests";
        var results;

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

    AriaAutomationDeploymentService.prototype.getDeploymentById = function (
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
                                 "lastRequest,resources,inprogressRequests";
        var deploymentObject;

        this.log.debug("Getting deployment with ID '" + deploymentId + "'");
        deploymentObject = this.get(uri, null, throwOnNotFound);

        if (deploymentObject) {
            var deploymentName = deploymentObject.name;

            this.log.debug(
                "Found deployment with name '" + deploymentName +
                "' and id '" + deploymentId + "'"
            );
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

    AriaAutomationDeploymentService.prototype.getDeploymentByName = function (
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
                                 "lastRequest,resources,inprogressRequests";
        var deploymentObject;
        var deploymentId;

        this.log.debug(
            "Getting deployment with name '" + deploymentName + "'");
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
                    "Deployment not found with name '" +
                    deploymentName + "'"
                );
            } else {
                this.log.warn(
                    "Deployment not found with name '" +
                    deploymentName + "'"
                );
            }
        }

        return deploymentObject;
    };

    /**
     * Defines the getResources method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of managed resources.
     */

    AriaAutomationDeploymentService.prototype.getResources = function () {
        var uri = this.baseUri + "/resources?$filter=((origin eq DEPLOYED) or (origin eq ONBOARDED)" +
                                 " or (origin eq MIGRATED))";
        var results;

        this.log.debug("Getting a list of managed resources");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Resources");

        return results;
    };

    return AriaAutomationDeploymentService;
});