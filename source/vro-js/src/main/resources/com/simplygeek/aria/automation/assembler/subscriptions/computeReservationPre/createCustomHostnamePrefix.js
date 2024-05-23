/**
 * Write a brief description of the purpose of the action.
 * @param {Properties} inputProperties - describe each parameter as in JSDoc format.
 *
 * @returns {void} - describe the return type as well
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

    // Get Provisioning Configuration
    var configService = new (System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService());
    var provisioningConfigPath = "Simplygeek/Aria/Automation/Provisioning";
    var restHostConfigPath = "Simplygeek/Aria/Orchestrator/Resthosts";
    var provisioningDefaultsConfigElement = configService.getConfigElement(
        "Defaults", provisioningConfigPath
    );
    // Get Custom Naming
    var customNamingProfileName = configService.getConfigElementAttribute(
        provisioningDefaultsConfigElement,
        "customNamingProfile"
    ).value;
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
    var customNamingService = new (
        System.getModule(
            "com.simplygeek.aria.automation.assembler.iaas"
        ).AriaAutomationCustomNamingService())(ariaAutomationRestHost);
    var locking = new (
        System.getModule(
            "com.simplygeek.aria.orchestrator.locking"
        ).LockingService());

    customNamingService.createSessionWithRefreshToken(ariaAutomationApiToken);
    var customNamingProfile = customNamingService.getCustomNamingByName(customNamingProfileName);
    var customNamingProfileId = customNamingProfile.id;
    var customNamingStartCounter = 0;
    var customNamingIncrementStep = 1;

    log.log(
        "Adding hostname prefix '" + hostnamePrefix +
        " to custom naming profile '" + customNamingProfile.name + "'"
    );
    if (customNamingService.checkCustomNamingPrefixExists(
        customNamingProfileId,
        hostnamePrefix)
    ) {
        this.log.log("The prefix '" + hostnamePrefix + "' already exists");
    } else {
        locking.createLock("customNaming", customNamingProfileId);
        try {
            customNamingService.addCustomNamingPrefixToTemplate(
                customNamingProfileId,
                hostnamePrefix + "-",
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