/**
 * Write a brief description of the purpose of the action.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - No return value.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
        "Action",
        "forceGroupPolicyUpdate"
    );
    var commandPath = "C:\\Windows\\System32\\cmd.exe";
    var commandArguments = "/c gpupdate /force";
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
    // Get Configuration
    var windowsConfigService = new (
        System.getModule(
            "com.simplygeek.aria.automation.provisioning"
        ).WindowsConfigService());
    var guestUername = windowsConfigService.getUsername();
    var guestPassword = windowsConfigService.getPassword();

    // Run command in guest
    try {
        log.info("Running command to update Group Policies.");
        System.getModule("com.simplygeek.vcenter.vm").runCommandInGuest(
            vcVm,
            guestUername,
            guestPassword,
            commandPath,
            commandArguments
        );
        log.info("Waiting 2 minutes for policies to fully apply.");
        System.sleep(120 * 1000);
        log.info("Group Policies updated successfully.");
    } catch (e) {
        throw new Error("Failed to update Group Policies: " + e);
    }
});