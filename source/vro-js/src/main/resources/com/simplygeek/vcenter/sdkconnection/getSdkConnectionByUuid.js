/**
 * Search for a SdkConnection by its uuid.
 * @param {string} sdkConnectionUuid - The instance uuid of the SdkConnection.
 *
 * @returns {VC:SdkConnection} - SdkConnection object.
 */
(function (
    sdkConnectionUuid
) {
    if (!sdkConnectionUuid || typeof sdkConnectionUuid !== "string") {
        throw new ReferenceError("sdkConnectionUuid is required and must be of type 'string'");
    }

    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "getSdkConnectionByUuid"
    );

    log.debug("Get SdkConnection with UUID '" + sdkConnectionUuid + "'");
    var sdkConnection = VcPlugin.findSdkConnectionForUUID(sdkConnectionUuid);

    if (sdkConnection) {
        log.debug("Found SdkConnection '" + sdkConnection.name + "' with UUID '" +
                     sdkConnection.instanceUuid + "'");
    } else {
        throw new Error("No SdkConnection found with UUID '" + sdkConnectionUuid + "'");
    }

    return sdkConnection;
});