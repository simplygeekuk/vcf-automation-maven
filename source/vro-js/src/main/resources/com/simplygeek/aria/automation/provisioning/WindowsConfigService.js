/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the WindowsConfigService class.
     * @class
     *
     * @returns {Any} An instance of the WindowsConfigService class.
     */

    function WindowsConfigService() {
        ConfigElementService.call(this);

        var provisioningConfigPath = "Simplygeek/VCF/Automation/Provisioning";

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "WindowsConfigService"
        );

        this.defaultConfigService = new (System.getModule(
            "com.simplygeek.aria.automation.provisioning"
        ).DefaultConfigService());

        this.provisioningLinuxConfigElement = this.getConfigElement(
            "Windows",
            provisioningConfigPath
        );
    }

    // Extends the ConfigElementService
    var ConfigElementService = System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService();

    WindowsConfigService.prototype = Object.create(
        ConfigElementService.prototype
    );
    WindowsConfigService.prototype.constructor = WindowsConfigService;

    /**
     * Defines the getCustomNamingProfileName method.
     * @description Gets the Custom Naming profile name used for machine naming.
     * @method
     * @public
     *
     * @returns {string} The Custom Naming Profile Name.
     */

    WindowsConfigService.prototype.getCustomNamingProfileName = function () {
        var customNamingProfileName = this.__getConfigValue(
            "customNamingProfileName"
        );

        return customNamingProfileName;
    };

    /**
     * Defines the getActiveDirectoryDomainName method.
     * @description Gets the Active Directory Domain Name for Machine joins.
     * @method
     * @public
     *
     * @returns {string} The Active Directory Domain Name.
     */

    WindowsConfigService.prototype.getActiveDirectoryDomainName = function () {
        var activeDirectoryDomainName = this.__getConfigValue(
            "activeDirectoryDomainName"
        );

        return activeDirectoryDomainName;
    };

    /**
     * Defines the getActiveDirectoryDNSSuffix method.
     * @description Gets the Active Directory DNS Suffix.
     * @method
     * @public
     *
     * @returns {string} The Active Directory DNS Suffix.
     */

    WindowsConfigService.prototype.getActiveDirectoryDNSSuffix = function () {
        var activeDirectoryDNSSuffix = this.__getConfigValue(
            "activeDirectoryDNSSuffix"
        );

        return activeDirectoryDNSSuffix;
    };

    /**
     * Defines the getActiveDirectoryServerOUDN method.
     * @description Gets the Active Directory Server OU Distinguished Name.
     * @method
     * @public
     *
     * @returns {string} The Active Directory Server OU Distinguished Name.
     */

    WindowsConfigService.prototype.getActiveDirectoryServerOUDN = function () {
        var activeDirectoryServerOUDN = this.__getConfigValue(
            "activeDirectoryServerOUDN"
        );

        return activeDirectoryServerOUDN;
    };

    /**
     * Defines the getAnsibleProjectName method.
     * @description Gets the Ansible Project name for Playbook execution.
     * @method
     * @public
     *
     * @returns {string} The Ansible Project name.
     */

    WindowsConfigService.prototype.getAnsibleProjectName = function () {
        var ansibleProjectName = this.__getConfigValue(
            "ansibleProjectName"
        );

        return ansibleProjectName;
    };

    /**
     * Defines the getAnsibleProvisioningJobTemplateName method.
     * @description Gets the Ansible Job Template used for machine provisioning.
     * @method
     * @public
     *
     * @returns {string} The Ansible Job Template name.
     */

    WindowsConfigService.prototype.getAnsibleProvisioningJobTemplateName = function () {
        var ansibleProvisioningJobTemplateName = this.__getConfigValue(
            "ansibleProvisioningJobTemplateName"
        );

        return ansibleProvisioningJobTemplateName;
    };

    /**
     * Defines the getAnsibleDeProvisioningJobTemplateName method.
     * @description Gets the Ansible Job Template used for machine de-provisioning.
     * @method
     * @public
     *
     * @returns {string} The Ansible Job Template name.
     */

    WindowsConfigService.prototype.getAnsibleDeProvisioningJobTemplateName = function () {
        var ansibleDeProvisioningJobTemplateName = this.__getConfigValue(
            "ansibleDeProvisioningJobTemplateName"
        );

        return ansibleDeProvisioningJobTemplateName;
    };

    /**
     * Defines the getAnsibleJobTags method.
     * @description Gets the Ansible job tags to include.
     * @method
     * @public
     *
     * @returns {string} The Ansible job tags.
     */

    WindowsConfigService.prototype.getAnsibleJobTags = function () {
        var ansibleJobTags = this.__getConfigValue(
            "ansibleJobTags"
        );

        return ansibleJobTags;
    };

    /**
     * Defines the getAnsibleSkipTags method.
     * @description Gets the Ansible job tags to skip.
     * @method
     * @public
     *
     * @returns {string} The Ansible skip tags.
     */

    WindowsConfigService.prototype.getAnsibleSkipTags = function () {
        var ansibleSkipTags = this.__getConfigValue(
            "ansibleSkipTags"
        );

        return ansibleSkipTags;
    };

    /**
     * Defines the getAnsibleGroupName method.
     * @description Gets the Ansible Group name to assign to the inventory host.
     * @method
     * @public
     *
     * @returns {string} The Ansible group name.
     */

    WindowsConfigService.prototype.getAnsibleGroupName = function () {
        var ansibleGroupName = this.__getConfigValue(
            "ansibleGroupName"
        );

        return ansibleGroupName;
    };

    /**
     * Defines the __getConfigValue method.
     * @description Gets a configuration value (or default value if none is found)
     * @method
     * @private
     *
     * @returns {Any} The configuration value
     */

    WindowsConfigService.prototype.__getConfigValue = function (
        configKey
    ) {
        var configValue;

        try {
            this.log.log("Get " + configKey);
            configValue = this.getConfigElementAttribute(
                this.provisioningLinuxConfigElement,
                configKey
            ).value;
            this.log.log("Found " + configKey + ": " + configValue);
        } catch (e) {
            if (e.message.indexOf("No Configuration Element Attribute found") !== -1) {
                this.log.log("No " + configKey + " found, getting default value");
                try {
                    // configValue = this.defaultConfigService[method]();
                    configValue = this.defaultConfigService[configKey];
                    this.log.log("Found " + configKey + ": " + configValue);
                } catch (e) {
                    this.log.warn("Failed to get any value for " + configKey);
                    throw new Error(e);
                }
            } else {
                this.log.warn("Failed to get any value for " + configKey);
                throw new Error(e);
            }
        }

        return configValue;
    };

    return WindowsConfigService;
});