/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationAssemblerIaasApiService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     *
     * @returns {Any} An instance of the AriaAutomationAssemblerIaasApiService class.
     */

    function AriaAutomationAssemblerIaasApiService(restHost) {
        AriaAutomationGenericBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationAssemblerIaasApiService"
        );

        this.iaasBaseUri = "/iaas/api";
        this.iaasApiVersion = this.iaasAbout().latestApiVersion;
        this.iaasApiVersionParam = "apiVersion=" + this.iaasApiVersion;
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationGenericBackendService();

    AriaAutomationAssemblerIaasApiService.prototype = Object.create(AriaAutomationGenericBackendService.prototype);
    AriaAutomationAssemblerIaasApiService.prototype.constructor = AriaAutomationAssemblerIaasApiService;

    // ## Projects ##

    /**
     * Defines the getProjectZones method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     *
     * @returns {Any} The project zones object.
     */

    AriaAutomationAssemblerIaasApiService.prototype.getProjectZones = function (
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

    return AriaAutomationAssemblerIaasApiService;
});