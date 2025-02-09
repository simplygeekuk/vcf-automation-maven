/**
 * Write a brief description of the purpose of the action.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - describe the return type as well
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "configureDisks"
    );
    // Get values from Input Properties
    var customProps = inputProperties.get("customProperties");
    var resourceIds = inputProperties.get("resourceIds");
    var machineResourceId = resourceIds[0];
    var vcServerInstanceUuid = customProps.get("vcUuid");
    var vcVmInstanceUuid = customProps.get("instanceUUID");

    log.debug("machineResourceId: " + machineResourceId);
    log.debug("vcServerInstanceUuid: " + vcServerInstanceUuid);
    log.debug("vcVmInstanceUuid: " + vcVmInstanceUuid);

    var vcSdkConnection = System.getModule("com.simplygeek.vcenter").getVcServer(
        vcServerInstanceUuid
    );
    var vcVm = System.getModule("com.simplygeek.vcenter.vm").getVcVm(
        vcVmInstanceUuid,
        vcSdkConnection
    );
    // Get Provisioning Configuration
    var configService = new (System.getModule(
        "com.simplygeek.vcf.orchestrator.configurations"
    ).ConfigElementService());
    var provisioningConfigPath = "Simplygeek/Aria/Automation/Provisioning";
    var restHostConfigPath = "Simplygeek/Aria/Orchestrator/Resthosts";
    var provisioningDefaultsConfigElement = configService.getConfigElement(
        "Defaults", provisioningConfigPath
    );
    // Get Aria Automation Resthost
    var ariaAutomationRestHostName = configService.getConfigElementAttribute(
        provisioningDefaultsConfigElement,
        "ariaAutomationRestHostName"
    ).value;
    var ariaAutomationRestHost = System.getModule("com.simplygeek.rest").getRestHost(
        ariaAutomationRestHostName
    );
    var ariaAutomationRestHostConfigElement = configService.getConfigElement(
        ariaAutomationRestHostName,
        restHostConfigPath
    );
    var ariaAutomationApiToken = configService.getConfigElementAttribute(
        ariaAutomationRestHostConfigElement,
        "refreshToken"
    ).value;
    var ariaIaasService = new (
        System.getModule(
            "com.simplygeek.vcf.automation.iaas"
        ).AriaAutomationIaasService())(ariaAutomationRestHost, ariaAutomationApiToken);
    var machineDisks = ariaIaasService.getMachineDisks(machineResourceId);
    var additionalDisks = machineDisks.filter(
        function(disk) {
            return disk.type === "HDD" &&
                   disk.customProperties.providerUniqueIdentifier !== "Hard disk 1";
        }
    );
    // Initialize an array to hold all disk information
    var vcVmDisks = [];
    var ansibleDisks = [];

    // Iterate over the devices in the vcVm
    for (var i = 0; i < vcVm.config.hardware.device.length; i++) {
        var device = vcVm.config.hardware.device[i];

        // Check if the device is of type VcVirtualDisk
        if (device instanceof VcVirtualDisk) {
            // Push relevant information about the VcVirtualDisk to the array
            vcVmDisks.push({
                label: device.deviceInfo.label,
                summary: device.deviceInfo.summary,
                capacityInKB: device.capacityInKB,
                backingInfo: {
                    fileName: device.backing.fileName,
                    datastore: device.backing.datastore.name,
                    diskMode: device.backing.diskMode,
                    uuid: device.backing.uuid
                },
                unitNumber: device.unitNumber,
                controllerKey: device.controllerKey
            });
        }
    }

    additionalDisks.forEach(
        function(disk) {
            var ansibleDiskProps = {};
            var vcDisk = vcVmDisks.filter(
                function(vcDisk) {
                    // return vcDisk.label === disk.customProperties.providerUniqueIdentifier;
                    return vcDisk.backingInfo.fileName === disk.customProperties.diskFile;
                }
            )[0];

            ansibleDiskProps.diskUuid = vcDisk.backingInfo.uuid;
            ansibleDiskProps.mountPoint = disk.customProperties.drive;
            ansibleDiskProps.capacityInGB = disk.capacityInGB;
            ansibleDisks.push(ansibleDiskProps);
        }
    );

    log.info(JSON.stringify(ansibleDisks));
});