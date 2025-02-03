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

        this.defaultsConfigElement = this.getConfigElement(
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
        var customNamingProfileName = this.getConfigElementAttribute(
            this.defaultsConfigElement,
            "customNamingProfileName"
        ).value;

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
        var activeDirectoryDomainName = this.getConfigElementAttribute(
            this.defaultsConfigElement,
            "activeDirectoryDomainName"
        ).value;

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
        var activeDirectoryDNSSuffix = this.getConfigElementAttribute(
            this.defaultsConfigElement,
            "activeDirectoryDNSSuffix"
        ).value;

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
        var activeDirectoryServerOUDN = this.getConfigElementAttribute(
            this.defaultsConfigElement,
            "activeDirectoryServerOUDN"
        ).value;

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
        var ansibleRestHostName = this.getConfigElementAttribute(
            this.defaultsConfigElement,
            "ansibleRestHostName"
        ).value;

        return ansibleRestHostName;
    };

    return DefaultConfigService;
});