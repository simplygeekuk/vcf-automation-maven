/**
 * A subscription Action that creates a custom naming prefix.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - No return value.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.log").Logger())(
        "Action",
        "createCustomHostnamePrefix"
    );
    // Get values from Input Properties
    var customProps = inputProperties.get("customProperties");
    var hostnamePrefix = customProps.get("hostnamePrefix");

    log.debug("hostnamePrefix: " + hostnamePrefix);

    var ariaConfigService = new (System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationConfigService());
    var defaultConfigService = new (System.getModule(
        "com.simplygeek.aria.automation.provisioning"
    ).DefaultConfigService());
    var customNamingConfigService = new (System.getModule(
        "com.simplygeek.aria.automation.iaas"
    ).CustomNamingConfigService());
    var customNamingProfileName = defaultConfigService.getCustomNamingProfileName();
    var ariaAutomationRestHost = ariaConfigService.getRestHost();
    var ariaAutomationApiToken = ariaConfigService.getApiToken();
    var customNamingService = new (
        System.getModule(
            "com.simplygeek.aria.automation.iaas"
        ).AriaAutomationCustomNamingService())(
        ariaAutomationRestHost,
        ariaAutomationApiToken
    );
    var locking = new (
        System.getModule(
            "com.simplygeek.aria.orchestrator.locking"
        ).LockingService()
    );
    var customNamingProfile = customNamingService.getCustomNamingByName(
        customNamingProfileName
    );
    var customNamingProfileId = customNamingProfile.id;
    var customNamingStartCounter = customNamingConfigService.getStartCounter() - 1;
    var customNamingIncrementStep = customNamingConfigService.getIncrementStep();

    if (customNamingStartCounter < 0) {
        customNamingStartCounter = 0;
    }

    log.log(
        "Adding hostname prefix '" + hostnamePrefix +
        " to custom naming profile '" + customNamingProfile.name + "'"
    );
    if (customNamingService.checkCustomNamingPrefixExists(
        customNamingProfileId,
        hostnamePrefix)
    ) {
        log.log("The prefix '" + hostnamePrefix + "' already exists");
    } else {
        log.log("The prefix '" + hostnamePrefix + "' does not exist and will be created");
        locking.createLock("customNaming", customNamingProfileId);
        try {
            customNamingService.addCustomNamingPrefixToTemplate(
                customNamingProfileId,
                hostnamePrefix,
                "COMPUTE",
                customNamingStartCounter,
                customNamingIncrementStep
            );

            log.log("Hostname prefix successfully added");

        } catch (e) {
            throw new Error("Unexpected error creating custom naming prefix: " + e);
        } finally {
            locking.removeLock("customNaming", customNamingProfileId);
        }
    }
});