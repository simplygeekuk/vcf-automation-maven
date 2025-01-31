/**
 * A Subscription to remove an Active Directory computer account.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - No return value.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "removeComputerFromAD"
    );
    var throwOnNotFound = false;
    var activeDirectoryDomainName;
    // Get values from Input Properties
    var resourceNames = inputProperties.get("resourceNames");
    var vmName = resourceNames[0];

    log.debug("vmName: " + vmName);

    var customProps = inputProperties.get("customProperties");
    var osType = customProps.get("osType");

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
    } else {
        activeDirectoryDomainName = linuxConfigService.getActiveDirectoryDomainName();
    }

    // Remove Computer from AD
    try {
        log.log("Removing Active Directory computer account '" + vmName + "'.");
        var adService = new (
            System.getModule(
                "com.vattenfall.ad"
            ).ActiveDirectoryService())(activeDirectoryDomainName);
        var adComputer = adService.getComputer(
            vmName,
            throwOnNotFound
        );

        if (adComputer) {
            adService.removeComputer(adComputer); // void
            log.log("Successfully removed computer account from Active Directory.");
        } else {
            log.log("No computer object found, nothing to remove.");
        }
    } catch (e) {
        log.warn("Failed to remove Active Directory computer account. " + e);
    }
});