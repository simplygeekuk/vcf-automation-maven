/**
 * Search for a virtual machine by its instance uuid. Optionally search on a specific vCenter Server.
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
    if (vCenterSdkConnection && System.getObjectType(vCenterSdkConnection) !== "VC:SdkConnection") {
        throw new ReferenceError("vCenterSdkConnection must be of type 'VC:SdkConnection'");
    }

    var log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
        "Action",
        "getVcVmByUuid"
    );
    var vcVm;
    var vcVms;

    log.debug("Get Virtual Machine with UUID '" + vcVmInstanceUuid + "'");
    var xpath = "xpath:config/instanceUuid[starts-with(.,'" + vcVmInstanceUuid + "')]";

    if (vCenterSdkConnection) {
        log.debug("Searching vCenter Server: " + vCenterSdkConnection.name);
        vcVms = vCenterSdkConnection.getAllVirtualMachines(null, xpath);
    } else {
        log.debug("Searching all configured vCenter Server endpoints");
        vcVms = VcPlugin.getAllVirtualMachines(null, xpath);
    }

    if (vcVms.length > 1) {
        throw new Error("More than one Virtual Machine was found with UUID '" + vcVmInstanceUuid + "'");
    } else if (vcVms.length > 0) {
        vcVm = vcVms[0];
    } else {
        throw new Error("No Virtual Machine found with UUID '" + vcVmInstanceUuid + "'");
    }

    log.debug("Found Virtual Machine '" + vcVm.name + "' with UUID '" +
                 vcVmInstanceUuid + "'");

    return vcVm;
});