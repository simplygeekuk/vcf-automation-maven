/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationConfigService class.
     * @class
     *
     * @returns {Any} An instance of the AriaAutomationConfigService class.
     */

    function AriaAutomationConfigService() {
        ConfigElementService.call(this);

        var vcfAutomationConfigPath = "Simplygeek/VCF/Automation";
        var restHostConfigPath = "Simplygeek/VCF/Orchestrator/Resthosts";

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationConfigService"
        );

        this.vcfAutomationConfigElement = this.getConfigElement(
            "VCFAutomationDefaultConfig",
            vcfAutomationConfigPath
        );

        this.vcfAutomationRestHostConfigElement = this.getConfigElement(
            this.getRestHostName(),
            restHostConfigPath
        );
    }

    // Extends the ConfigElementService
    var ConfigElementService = System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService();

    AriaAutomationConfigService.prototype = Object.create(
        ConfigElementService.prototype
    );
    AriaAutomationConfigService.prototype.constructor = AriaAutomationConfigService;

    /**
     * Defines the getRestHostName method.
     * @method
     * @public
     *
     * @returns {REST:RESTHost} The VCF Automation REST host name.
     */

    AriaAutomationConfigService.prototype.getRestHostName = function () {
        var vcfAutomationRestHostName = this.getConfigElementAttribute(
            this.vcfAutomationConfigElement,
            "restHostName"
        ).value;

        return vcfAutomationRestHostName;
    };

    /**
     * Defines the getRestHost method.
     * @method
     * @public
     *
     * @returns {REST:RESTHost} The VCF Automation REST Host
     */

    AriaAutomationConfigService.prototype.getRestHost = function () {
        var vcfAutomationRestHost = System.getModule("com.simplygeek.rest").getRestHost(
            this.getRestHostName()
        );

        return vcfAutomationRestHost;
    };

    /**
     * Defines the getApiToken method.
     * @method
     * @public
     *
     * @returns {string} The VCF Automation API Token
     */

    AriaAutomationConfigService.prototype.getApiToken = function () {
        var vcfAutomationApiToken = this.getConfigElementAttribute(
            this.vcfAutomationRestHostConfigElement,
            "refreshToken"
        ).value;

        return vcfAutomationApiToken;
    };

    /**
     * Defines the getUsername method.
     * @method
     * @public
     *
     * @returns {string} The VCF Automation Username
     */

    AriaAutomationConfigService.prototype.getUsername = function () {
        var vcfAutomationUsername = this.getConfigElementAttribute(
            this.vcfAutomationRestHostConfigElement,
            "username"
        ).value;

        return vcfAutomationUsername;
    };

    /**
     * Defines the getPassword method.
     * @method
     * @public
     *
     * @returns {string} The VCF Automation Password
     */

    AriaAutomationConfigService.prototype.getPassword = function () {
        var vcfAutomationPassword = this.getConfigElementAttribute(
            this.vcfAutomationRestHostConfigElement,
            "password"
        ).value;

        return vcfAutomationPassword;
    };

    /**
     * Defines the getUrl method.
     * @method
     * @public
     *
     * @returns {string} The VCF Automation URL
     */

    AriaAutomationConfigService.prototype.getUrl = function () {
        var vcfAutomationUrl = this.getConfigElementAttribute(
            this.vcfAutomationRestHostConfigElement,
            "url"
        ).value;

        return vcfAutomationUrl;
    };

    return AriaAutomationConfigService;
});