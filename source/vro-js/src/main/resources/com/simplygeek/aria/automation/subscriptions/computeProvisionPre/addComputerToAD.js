/**
 * A subscription to add an Active Directory computer account.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {Properties} - The updated Custom Properties.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "addComputerToAD"
    );
    var addUpdateCustomProperties = new Properties();
    var ouNameRegex = /^OU=([^,]+)/;
    var activeDirectoryDomainName;
    var activeDirectoryServerOUDN;
    var activeDirectoryServerOUName;
    // Get values from Input Properties
    var resourceNames = inputProperties.get("resourceNames");
    var vmName = resourceNames[0];
    var customProps = inputProperties.get("customProperties");
    var osType = customProps.get("osType");

    log.debug("vmName: " + vmName);
    log.debug("osType: " + osType);

    // Get Configuration
    var windowsConfigService = new (
        System.getModule(
            "com.simplygeek.aria.automation.provisioning"
        ).WindowsConfigService());
    var linuxConfigService = new (
        System.getModule(
            "com.simplygeek.aria.automation.provisioning"
        ).LinuxConfigService());

    if (osType.toLowerCase() === "windows") {
        activeDirectoryDomainName = windowsConfigService.getActiveDirectoryDomainName();
        activeDirectoryServerOUDN = windowsConfigService.getActiveDirectoryServerOUDN();
    } else {
        activeDirectoryDomainName = linuxConfigService.getActiveDirectoryDomainName();
        activeDirectoryServerOUDN = linuxConfigService.getActiveDirectoryServerOUDN();
    }

    activeDirectoryServerOUName = activeDirectoryServerOUDN.match(ouNameRegex)[1];

    log.log("activeDirectoryDomainName: " + activeDirectoryDomainName);
    log.log("activeDirectoryServerOUDN: " + activeDirectoryServerOUDN);
    log.log("activeDirectoryServerOUName: " + activeDirectoryServerOUName);

    // Create Computer in AD
    try {
        log.log("Creating Active Directory computer account '" + vmName +
                   "' in OU path '" + activeDirectoryServerOUDN + "'");

        var adService = new (
            System.getModule(
                "com.simplygeek.ad"
            ).ActiveDirectoryService())(activeDirectoryDomainName);
        var adOrganizationalUnit = adService.getOrganizationalUnit(
            activeDirectoryServerOUName,
            activeDirectoryServerOUDN
        );
        // eslint-disable-next-line no-unused-vars
        var adComputer = adService.createComputer(vmName, adOrganizationalUnit);

        addUpdateCustomProperties.put("activeDirectoryJoinEnabled", true);
        addUpdateCustomProperties.put("activeDirectoryDomainName", activeDirectoryDomainName);
        log.log("Successfully created Active Directory computer account.");
    } catch (e) {
        var errorMessage = "Failed to create Active Directory computer account: " + e;

        log.error(errorMessage);
        throw new Error(errorMessage);
    }

    return addUpdateCustomProperties;
});