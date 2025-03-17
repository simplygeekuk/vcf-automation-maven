/**
 * Performs a shutdown and start of a virtual machine.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - No return value.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "vmShutdownAndStart"
    );
    // Get values from Input Properties
    var customProps = inputProperties.get("customProperties");
    var vcServerInstanceUuid = customProps.get("vcUuid");
    var vcVmInstanceUuid = customProps.get("instanceUUID");

    log.debug("vcServerInstanceUuid: " + vcServerInstanceUuid);
    log.debug("vcVmInstanceUuid: " + vcVmInstanceUuid);

    var vcSdkConnection = System.getModule("com.simplygeek.vcenter.sdkconnection").getSdkConnectionByUuid(
        vcServerInstanceUuid
    );
    var vcVm = System.getModule("com.simplygeek.vcenter.vm").getVcVmByUuid(
        vcVmInstanceUuid,
        vcSdkConnection
    );

    try {
        log.info("Performing shutdown and start of virtual machine '" + vcVm.name + "'");
        System.getModule("com.simplygeek.vcenter.vm").shutdownVM(vcVm);
        System.getModule("com.simplygeek.vcenter.vm").startVM(vcVm);
        log.info("Virtual machine shutdown and started successfully.");
    } catch (e) {
        throw new Error("Failed to shutdown and start virtual machine: " + e);
    }
});