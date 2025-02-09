/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the LinuxConfigService class.
     * @class
     *
     * @returns {Any} An instance of the LinuxConfigService class.
     */

    function LinuxConfigService() {
        ConfigElementService.call(this);

        var provisioningConfigPath = "Simplygeek/VCF/Automation/Provisioning";

        this.log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
            "Action",
            "LinuxConfigService"
        );

        this.defaultConfigService = new (System.getModule(
            "com.simplygeek.aria.automation.provisioning"
        ).DefaultConfigService());

        this.configElement = this.getConfigElement(
            "Linux",
            provisioningConfigPath
        );
    }

    // Extends the ConfigElementService
    var ConfigElementService = System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService();

    LinuxConfigService.prototype = Object.create(
        ConfigElementService.prototype
    );
    LinuxConfigService.prototype.constructor = LinuxConfigService;

    // ###################################
    // ## Aria Automation Configuration ##
    // ###################################

    /**
     * Defines the getCustomNamingProfileName method.
     * @description Gets the Custom Naming profile name used for machine naming.
     * @method
     * @public
     *
     * @returns {string} The Custom Naming Profile Name.
     */

    LinuxConfigService.prototype.getCustomNamingProfileName = function () {
        var customNamingProfileName = this.__getConfigValue(
            "customNamingProfileName"
        );

        return customNamingProfileName;
    };

    // ####################################
    // ## Active Directory Configuration ##
    // ####################################

    /**
     * Defines the getActiveDirectoryDomainName method.
     * @description Gets the Active Directory Domain Name for Machine joins.
     * @method
     * @public
     *
     * @returns {string} The Active Directory Domain Name.
     */

    LinuxConfigService.prototype.getActiveDirectoryDomainName = function () {
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

    LinuxConfigService.prototype.getActiveDirectoryDNSSuffix = function () {
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

    LinuxConfigService.prototype.getActiveDirectoryServerOUDN = function () {
        var activeDirectoryServerOUDN = this.__getConfigValue(
            "activeDirectoryServerOUDN"
        );

        return activeDirectoryServerOUDN;
    };

    // ###########################
    // ## Ansible Configuration ##
    // ###########################

    /**
     * Defines the getAnsibleRestHostName method.
     * @description Gets the Ansible Rest Host name.
     * @method
     * @public
     *
     * @returns {string} The Ansible Rest Host name.
     */

    LinuxConfigService.prototype.getAnsibleRestHostName = function () {
        var ansibleRestHostName = this.__getConfigValue(
            "ansibleRestHostName"
        );

        return ansibleRestHostName;
    };

    /**
     * Defines the getAnsibleProjectName method.
     * @description Gets the Ansible Project name for Playbook execution.
     * @method
     * @public
     *
     * @returns {string} The Ansible Project name.
     */

    LinuxConfigService.prototype.getAnsibleProjectName = function () {
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

    LinuxConfigService.prototype.getAnsibleProvisioningJobTemplateName = function () {
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

    LinuxConfigService.prototype.getAnsibleDeProvisioningJobTemplateName = function () {
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

    LinuxConfigService.prototype.getAnsibleJobTags = function () {
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

    LinuxConfigService.prototype.getAnsibleSkipTags = function () {
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

    LinuxConfigService.prototype.getAnsibleGroupName = function () {
        var ansibleGroupName = this.__getConfigValue(
            "ansibleGroupName"
        );

        return ansibleGroupName;
    };

    /**
     * Defines the getAnsibleConnection method.
     * @description Gets the Ansible connection method for connecting to inventory hosts.
     * @method
     * @public
     *
     * @returns {string} The Ansible group name.
     */

    LinuxConfigService.prototype.getAnsibleConnection = function () {
        var ansibleGroupName = this.__getConfigValue(
            "ansibleGroupName"
        );

        return ansibleGroupName;
    };

    /**
     * Defines the getAnsiblePort method.
     * @description Gets the port used for the Ansible connection.
     * @method
     * @public
     *
     * @returns {string} The port used for the Ansible connection.
     */

    LinuxConfigService.prototype.getAnsiblePort = function () {
        var ansiblePort = this.__getConfigValue(
            "ansiblePort"
        );

        return ansiblePort;
    };

    /**
     * Defines the __getConfigValue method.
     * @description Gets a configuration value (or default value if none is found)
     * @method
     * @private
     *
     * @returns {Any} The configuration value
     */

    LinuxConfigService.prototype.__getConfigValue = function (
        configKey
    ) {
        var configValue;
        var configElementAttribute;

        try {
            this.log.info("Get " + configKey);
            configElementAttribute = this.getConfigElementAttribute(
                this.configElement,
                configKey
            );
            if (configElementAttribute.type === "SecureString") {
                configValue = "******";
            } else {
                configValue = configElementAttribute.value;
            }
            this.log.info("Found " + configKey + ": " + configValue);
        } catch (e) {
            if (e.message.indexOf("No Configuration Element Attribute found") !== -1) {
                this.log.info("No " + configKey + " found, getting default value");
                try {
                    configValue = this.defaultConfigService[configKey];
                    this.log.info("Found " + configKey + ": " + configValue);
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

    return LinuxConfigService;
});