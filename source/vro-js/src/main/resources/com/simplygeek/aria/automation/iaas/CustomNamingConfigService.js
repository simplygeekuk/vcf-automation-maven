/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the CustomNamingConfigService class.
     * @class
     *
     * @returns {Any} An instance of the CustomNamingConfigService class.
     */

    function CustomNamingConfigService() {
        ConfigElementService.call(this);

        var CustomNamingConfigPath = "Simplygeek/VCF/Automation";

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "CustomNamingConfigService"
        );

        this.customNamingConfigElement = this.getConfigElement(
            "CustomNaming",
            CustomNamingConfigPath
        );

    }

    // Extends the ConfigElementService
    var ConfigElementService = System.getModule(
        "com.simplygeek.aria.orchestrator.configurations"
    ).ConfigElementService();

    CustomNamingConfigService.prototype = Object.create(
        ConfigElementService.prototype
    );
    CustomNamingConfigService.prototype.constructor = CustomNamingConfigService;

    /**
     * Defines the getStartCounter method.
     * @description Gets the default start counter number for a custom naming prefix
     * @method
     * @public
     *
     * @returns {number} The start counter number.
     */

    CustomNamingConfigService.prototype.getStartCounter = function () {
        var startCounter = this.getConfigElementAttribute(
            this.customNamingConfigElement,
            "startCounter"
        ).value;

        return startCounter;
    };

    /**
     * Defines the getIncrementStep method.
     * @description Gets the default increment step number for a custom naming prefix
     * @method
     * @public
     *
     * @returns {number} The increment step number.
     */

    CustomNamingConfigService.prototype.getIncrementStep = function () {
        var incrementStep = this.getConfigElementAttribute(
            this.customNamingConfigElement,
            "incrementStep"
        ).value;

        return incrementStep;
    };

    return CustomNamingConfigService;
});