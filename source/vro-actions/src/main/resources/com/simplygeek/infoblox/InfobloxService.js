/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the InfobloxService class.
     * @class
     * @param {REST:RESTHost} restHost - The Infoblox HTTP REST host.
     * @returns {Any} An instance of the InfobloxService class.
     */
    function InfobloxService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        this.log = new (System.getModule(
            "com.simplygeek.vcf.orchestrator.logging"
        ).Logger())("Action", "InfobloxService");

        this.apiVersion = "2.11.3";
        this.mediaType = "application/json";
        this.baseUri = "/wapi/v" + this.apiVersion;

        // This RESTHost Authentication block allows a username and password to be used
        // for Basic Auth that is not configured on the host in the inventory. This allows
        // Credentials to be used from Config Elements or other sources.
        // var basicAuth = RESTAuthenticationManager.createAuthentication(
        //     "Basic",
        //     ["Shared Session", username, password]
        // );

        // this.restHost.authentication = basicAuth;
        // var restHostWithBasicAuth = RESTHostManager.createTransientHostFrom(this.restHost);

        // RESTHostManager.reloadConfiguration();

        this.restHost = restHost;

        InfobloxBackendService.call(this);
    }

    var InfobloxBackendService = System.getModule(
        "com.simplygeek.infoblox"
    ).InfobloxBackendService();

    InfobloxService.prototype = Object.create(InfobloxBackendService.prototype);
    InfobloxService.prototype.constructor = InfobloxService;

    return InfobloxService;
});
