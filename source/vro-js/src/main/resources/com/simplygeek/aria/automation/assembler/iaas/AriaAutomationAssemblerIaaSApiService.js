/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAssemblerIaaSApiService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     *
     * @returns {Any} An instance of the AriaAutomationAssemblerIaaSApiService class.
     */

    function AriaAutomationAssemblerIaaSApiService(restHost) {
        AriaAutomationGenericBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationAssemblerIaasApiService"
        );

        this.baseUri = "/iaas/api";
        this.apiVersion = this.about().latestApiVersion;
        this.apiVersionParam = "apiVersion=" + this.apiVersion;
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationGenericBackendService();
    AriaAutomationAssemblerIaaSApiService.prototype = Object.create(AriaAutomationGenericBackendService.prototype);
    AriaAutomationAssemblerIaaSApiService.prototype.constructor = AriaAutomationAssemblerIaaSApiService;

    // ## Projects ##

    /**
     * Defines the getProjectZones method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     *
     * @returns {Any} The project zones object.
     */

    AriaAutomationAssemblerIaaSApiService.prototype.getProjectZones = function (
        projectId
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/projects/" + projectId +
                                 "/zones?" + this.apiVersionParam;
        var projectZonesObject;

        this.log.debug("Getting zones for project with ID '" + projectId + "'");
        var projectZonesObject = this.get(uri);

        return projectZonesObject;
    }

    return AriaAutomationAssemblerIaaSApiService;
});