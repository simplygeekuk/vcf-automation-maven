/**
 * Write a brief description of the purpose of the action.
 * @param {string} restHostName - The name of the resthost in the inventory.
 *
 * @returns {REST:RESTHost} - RESTHost inventory type.
 */
(function (restHostName) {
    if (!restHostName || typeof restHostName !== "string") {
        throw new ReferenceError("restHostName is required and must be of type 'string'");
    }

    var log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
        "Action",
        "getRestHost"
    );
    var restHost;

    log.debug("Getting Rest Host with name: " + restHostName);
    var allRestHosts = RESTHostManager.getHosts().map(
        function(hostId) {
            return RESTHostManager.getHost(hostId);
        }
    );
    var restHostsFound = allRestHosts.filter(
        function(host) {
            return host.name.toLowerCase() === restHostName.toLowerCase();
        }
    );

    if (restHostsFound.length > 1) {
        throw new Error(
            "More than one Rest Host was found with the name '" +
            restHostName + "'"
        );
    } else if (restHostsFound.length > 0) {
        restHost = restHostsFound[0];
    } else {
        throw new Error(
            "No Rest Host found with the name '" +
            restHostName + "'"
        );
    }

    log.debug(
        "Found Rest Host '" + restHostName + "' with id '" + restHost.id +
        "' and URL '" + restHost.url + "'"
    );

    return restHost;
});