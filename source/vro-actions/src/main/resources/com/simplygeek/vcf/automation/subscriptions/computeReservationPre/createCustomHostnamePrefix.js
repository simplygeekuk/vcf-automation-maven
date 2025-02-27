/**
 * A subscription Action that creates a custom naming prefix.
 * @param {Properties} inputProperties - The input properties Subscription payload.
 *
 * @returns {void} - No return value.
 */
(function (inputProperties) {
    var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "createCustomHostnamePrefix"
    );
    // Get values from Input Properties
    var customProps = inputProperties.get("customProperties");
    var hostnamePrefix = customProps.get("hostnamePrefix");

    log.debug("hostnamePrefix: " + hostnamePrefix);

    var vcfConfigService = new (System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationConfigService());
    var defaultConfigService = new (System.getModule(
        "com.simplygeek.vcf.automation.provisioning"
    ).DefaultConfigService());
    var customNamingConfigService = new (System.getModule(
        "com.simplygeek.vcf.automation.iaas"
    ).CustomNamingConfigService());
    var customNamingProfileName = defaultConfigService.getCustomNamingProfileName();
    var vcfAutomationRestHost = vcfConfigService.getRestHost();
    var vcfAutomationApiToken = vcfConfigService.getApiToken();
    var customNamingService = new (
        System.getModule(
            "com.simplygeek.vcf.automation.iaas"
        ).VCFAutomationCustomNamingService())(
        vcfAutomationRestHost,
        vcfAutomationApiToken
    );
    var locking = new (
        System.getModule(
            "com.simplygeek.vcf.orchestrator.locking"
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

    log.info(
        "Adding hostname prefix '" + hostnamePrefix +
        " to custom naming profile '" + customNamingProfile.name + "'"
    );
    if (customNamingService.checkCustomNamingPrefixExists(
        customNamingProfileId,
        hostnamePrefix)
    ) {
        log.info("The prefix '" + hostnamePrefix + "' already exists");
    } else {
        log.info("The prefix '" + hostnamePrefix + "' does not exist and will be created");
        locking.createLock("customNaming", customNamingProfileId);
        try {
            customNamingService.addCustomNamingPrefixToTemplate(
                customNamingProfileId,
                hostnamePrefix,
                "COMPUTE",
                customNamingStartCounter,
                customNamingIncrementStep
            );

            log.info("Hostname prefix successfully added");

        } catch (e) {
            throw new Error("Unexpected error creating custom naming prefix: " + e);
        } finally {
            locking.removeLock("customNaming", customNamingProfileId);
        }
    }
});