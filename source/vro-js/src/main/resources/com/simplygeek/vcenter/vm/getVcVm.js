/**
 * Search for a virtual machine by its instance uuid on a specific vCenter Server.
 * @param {string} vcVmInstanceUuid - The instance uuid of the vCenter VirtualMachine.
 * @param {VC:SdkConnection} vCenterSdkConnection - vCenter Server SDK connection.
 *
 * @returns {VC:VirtualMachine} - vcVirtualMachine object.
 */
(function (
    vcVmInstanceUuid,
    vCenterSdkConnection
) {
    if (!vcVmInstanceUuid || typeof vcVmInstanceUuid !== "string") {
        throw new ReferenceError("vcVmInstanceUuid is required and must be of type 'string'");
    }
    if (!vCenterSdkConnection || System.getObjectType(vCenterSdkConnection) !== "VC:SdkConnection") {
        throw new ReferenceError(
            "vCenterSdkConnection is required and must be of type 'VC:SdkConnection'"
        );
    }

    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "getVcVm"
    );
    var vcVm;
    var vcVmName;
    var vCenterSdkName;
    var searchInVcDataCenter = null; // Set to vCDatacenter object to limit search or null to search entire inventory.
    var searchForVms = true; // false will search for hosts.
    var searchByInstanceUuid = true; // false will search by BIOS UUID.

    try {
        vCenterSdkName = vCenterSdkConnection.name;
        log.log("Attempting to locate vcenter vm with instance uuid '" + vcVmInstanceUuid +
                "' on vCenter '" + vCenterSdkName + "'");
        vcVm = vCenterSdkConnection.searchIndex.findByUuid(
            searchInVcDataCenter,
            vcVmInstanceUuid,
            searchForVms,
            searchByInstanceUuid
        );
        if (vcVm) {
            vcVmName = vcVm.name;
            log.log("Found vcenter virtual machine '" + vcVmName + "'");
        } else {
            throw new Error(
                "The vcenter virtual machine could not be found" +
                " with instance uuid '" + vcVmInstanceUuid + "'"
            );
        }
    } catch (e) {
        throw new Error("Action failed to locate vCenter virtual machine. ", e);
    }

    return vcVm;
});