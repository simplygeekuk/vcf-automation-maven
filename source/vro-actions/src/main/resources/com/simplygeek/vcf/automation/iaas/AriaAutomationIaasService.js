/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationIaasService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     * @param {string} apiToken - The Aria Automation API Token.
     *
     * @returns {Any} An instance of the AriaAutomationIaasService class.
     */

    function AriaAutomationIaasService(
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

        AriaAutomationGenericBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
            "Action",
            "AriaAutomationIaasService"
        );

        this.iaasBaseUri = "/iaas/api";
        this.iaasApiVersion = this.iaasAbout().latestApiVersion;
        this.iaasApiVersionParam = "apiVersion=" + this.iaasApiVersion;

        this.createAuthenticatedSession(apiToken);
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.vcf.automation"
    ).AriaAutomationGenericBackendService();

    AriaAutomationIaasService.prototype = Object.create(AriaAutomationGenericBackendService.prototype);
    AriaAutomationIaasService.prototype.constructor = AriaAutomationIaasService;

    // ## Disks ##

    /**
     * Defines the getMachineDisks method.
     * @method
     * @public
     * @param {string} machineId - The machine id.
     *
     * @returns {Any} The machine disks object.
     */

    AriaAutomationIaasService.prototype.getMachineDisks = function (
        machineId
    ) {
        if (!machineId || typeof machineId !== "string") {
            throw new ReferenceError(
                "machineId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.iaasBaseUri + "/machines/" + machineId +
                                     "/disks?" + this.iaasApiVersionParam;
        var disksObject;

        this.log.debug("Getting disks for machine with ID '" + machineId + "'");
        disksObject = this.get(uri);

        return disksObject;
    };

    // ## Projects ##

    /**
     * Defines the getProjectZones method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     *
     * @returns {Any} The project zones object.
     */

    AriaAutomationIaasService.prototype.getProjectZones = function (
        projectId
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.iaasBaseUri + "/projects/" + projectId +
                                    "/zones?" + this.iaasApiVersionParam;
        var projectZonesObject;

        this.log.debug("Getting zones for project with ID '" + projectId + "'");
        projectZonesObject = this.get(uri);

        return projectZonesObject;
    };

    return AriaAutomationIaasService;
});