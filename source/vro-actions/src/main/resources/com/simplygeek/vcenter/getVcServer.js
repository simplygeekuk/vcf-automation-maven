/**
 * Finds a vCenter Server endpoint with the provided instance uuid.
 * @param {string} vcHostInstanceUuid - The instance uuid of the vCenter Server.
 *
 * @returns {VC:SdkConnection} - vCenter Server SDK connection object.
 */
(function (
    vcHostInstanceUuid
) {
    if (!vcHostInstanceUuid || typeof vcHostInstanceUuid !== "string") {
        throw new ReferenceError("vcHostInstanceUuid is required and must be of type 'string'");
    }

    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "getVcServer"
    );
    var vCenterSdkConnection;
    var allVcenterSdks = [];
    var vCenterSdkName;
    var vCenterSdksFiltered = [];

    try {
        log.log("Locating vCenter Server with instance uuid: " + vcHostInstanceUuid);
        allVcenterSdks = VcPlugin.allSdkConnections;
        vCenterSdksFiltered = allVcenterSdks.filter(
            function(vcHost) {
                return vcHost.instanceUuid === vcHostInstanceUuid;
            }
        );

        if (vCenterSdksFiltered.length > 0) {
            vCenterSdkConnection = vCenterSdksFiltered[0];
            vCenterSdkName = vCenterSdkConnection.name;
            log.log("Found vCenter Server '" + vCenterSdkName + "'");
        } else {
            throw new Error(
                "The vCenter Server could not be found" +
                " with instance uuid'" + vcHostInstanceUuid + "'"
            );
        }
    } catch (e) {
        throw new Error("Action failed locate a vCenter Server for the specified instance uuid. ", e);
    }

    return vCenterSdkConnection;
});