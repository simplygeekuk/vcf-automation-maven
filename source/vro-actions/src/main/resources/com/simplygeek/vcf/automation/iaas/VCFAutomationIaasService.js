/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the VCFAutomationIaasService class.
     * @class
     * @param {REST:RESTHost} restHost - The VCF Automation HTTP REST host.
     * @param {string} apiToken - The VCF Automation API Token.
     * @returns {Any} An instance of the VCFAutomationIaasService class.
     */
    function VCFAutomationIaasService(restHost, apiToken) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }
        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError(
                "apiToken is required and must " + "be of type 'string'"
            );
        }

        this.restHost = restHost;

        VCFAutomationBackend.call(this);

        this.log = new (System.getModule(
            "com.simplygeek.vcf.orchestrator.logging"
        ).Logger())("Action", "VCFAutomationIaasService");

        this.iaasBaseUri = "/iaas/api";
        this.iaasApiVersion = this.iaasAbout().latestApiVersion;
        this.iaasApiVersionParam = "apiVersion=" + this.iaasApiVersion;

        this.createAuthenticatedSession(apiToken);
    }

    var VCFAutomationBackend = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationBackend();

    VCFAutomationIaasService.prototype = Object.create(
        VCFAutomationBackend.prototype
    );
    VCFAutomationIaasService.prototype.constructor = VCFAutomationIaasService;

    // ─────────────────────────────────────────────────────────────────────────────
    // Machine
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Defines the getMachineDisks method.
     * @function
     * @public
     * @param {string} machineId - The machine id.
     * @returns {Any} The machine disks object.
     */

    VCFAutomationIaasService.prototype.getMachineDisks = function (machineId) {
        if (!machineId || typeof machineId !== "string") {
            throw new ReferenceError(
                "machineId is required and must " + "be of type 'string'"
            );
        }

        var uri =
            this.iaasBaseUri +
            "/machines/" +
            machineId +
            "/disks?" +
            this.iaasApiVersionParam;
        var disksObject;

        this.log.debug("Getting disks for machine with ID '" + machineId + "'");
        disksObject = this.get(uri);

        return disksObject;
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Project
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get a list of cloud zones assigned to a project.
     * @function
     * @public
     * @param {string} projectId - The project id.
     * @returns {Any} The project zones.
     */

    VCFAutomationIaasService.prototype.getProjectZones = function (projectId) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }

        var uri =
            this.iaasBaseUri +
            "/projects/" +
            projectId +
            "/zones?" +
            this.iaasApiVersionParam;
        var projectZonesObject;

        this.log.debug("Getting zones for project with ID '" + projectId + "'");
        projectZonesObject = this.get(uri);

        return projectZonesObject;
    };

    /**
     * Get a list of cloud zones assigned to a project.
     * @function
     * @public
     * @param {string} projectId - The project id.
     * @param {Array/Any} projectZones - The cloud zones to assign to the project, or blank to remove all zones.
     * @returns {Any} The updated project zones.
     */

    VCFAutomationIaasService.prototype.updateProjectZones = function (
        projectId,
        projectZones
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }

        var zones = {};
        var uri =
            this.iaasBaseUri +
            "/projects/" +
            projectId +
            "/zones?" +
            this.iaasApiVersionParam;
        var updatedProjectZones;
        var request;

        this.log.debug(
            "Updating cloud zones for project with ID '" + projectId + "'"
        );
        zones.zoneAssignmentSpecifications = [];
        if (projectZones && projectZones.length > 0) {
            zones.zoneAssignmentSpecifications = projectZones;
        }
        request = this.put(uri, zones, [202]);
        this.pollRequestStatus(request.id);
        updatedProjectZones = this.getProjectZones(projectId);
        this.log.debug(
            "Successfully updated cloud zones for project with ID '" +
                projectId +
                "'"
        );

        return updatedProjectZones;
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Request
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Polls the status of an IaaS request.
     * @function
     * @public
     * @param {string} requestId - The request ID (from an action).
     * @param {number} [intervalSeconds] - Polling interval. Default 10.
     * @param {number} [timeoutSeconds] - Timeout. Default 300
     * @returns {object} Final request object.
     */
    VCFAutomationIaasService.prototype.pollRequestStatus = function (
        requestId,
        intervalSeconds,
        timeoutSeconds
    ) {
        if (!requestId || typeof requestId !== "string") {
            throw new ReferenceError("requestId must be a string");
        }

        intervalSeconds = intervalSeconds || 10;
        timeoutSeconds = timeoutSeconds || 300;

        var uri = this.iaasBaseUri + "/request-tracker/" + requestId;
        var elapsed = 0;
        var status;
        var result;

        this.log.debug(
            "Polling request status for request with ID '" + requestId + "'"
        );

        while (elapsed < timeoutSeconds) {
            result = this.get(uri);
            status = result.status;

            this.log.debug(
                "Request status: " + status + " (elapsed: " + elapsed + "s)"
            );

            if (status === "FINISHED") {
                this.log.debug(
                    "Request '" + requestId + "' completed successfully"
                );

                return result;
            } else if (status === "FAILED") {
                throw new Error(
                    "Request '" + requestId + "' failed with status: " + status
                );
            }

            System.sleep(intervalSeconds * 1000);
            elapsed += intervalSeconds;
        }

        throw new Error(
            "Request '" +
                requestId +
                "' timed out after " +
                timeoutSeconds +
                " seconds"
        );
    };

    return VCFAutomationIaasService;
});
