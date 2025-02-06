/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the DefaultConfigService class.
     * @class
     *
     * @returns {Any} An instance of the DefaultConfigService class.
     */

    function DefaultConfigService() {
        ConfigElementService.call(this);

        var provisioningConfigPath = "Simplygeek/VCF/Automation/Provisioning";

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "DefaultConfigService"
        );

        this.configElement = this.getConfigElement(
            "Default",
            provisioningConfigPath
        );

        this.customNamingProfileName = this.getCustomNamingProfileName();
        this.activeDirectoryDomainName = this.getActiveDirectoryDomainName();
        this.activeDirectoryDNSSuffix = this.getActiveDirectoryDNSSuffix();
        this.activeDirectoryServerOUDN = this.getActiveDirectoryServerOUDN();
        this.ansibleRestHostName = this.getAnsibleRestHostName();
    }

    // Extends the ConfigElementService
    var ConfigElementService = System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService();

    DefaultConfigService.prototype = Object.create(
        ConfigElementService.prototype
    );
    DefaultConfigService.prototype.constructor = DefaultConfigService;

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

    DefaultConfigService.prototype.getCustomNamingProfileName = function () {
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

    DefaultConfigService.prototype.getActiveDirectoryDomainName = function () {
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

    DefaultConfigService.prototype.getActiveDirectoryDNSSuffix = function () {
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

    DefaultConfigService.prototype.getActiveDirectoryServerOUDN = function () {
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

    DefaultConfigService.prototype.getAnsibleRestHostName = function () {
        var ansibleRestHostName = this.__getConfigValue(
            "ansibleRestHostName"
        );

        return ansibleRestHostName;
    };

    DefaultConfigService.prototype.__getConfigValue = function (
        configKey
    ) {
        var configValue;
        var configElementAttribute;

        configElementAttribute = this.getConfigElementAttribute(
            this.configElement,
            configKey
        );
        if (configElementAttribute.type === "SecureString") {
            configValue = "******";
        } else {
            configValue = configElementAttribute.value;
        }

        return configValue;
    };

    return DefaultConfigService;
});