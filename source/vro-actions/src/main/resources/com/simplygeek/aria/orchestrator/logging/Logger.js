/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Logger class.
     * @class
     * @param {string} logType - The log type. Valid types are Action or Workflow.
     * @param {string} logName - The name of the Action or Workflow sending the log.
     *
     * @returns {Any} An instance of the Logger class.
     */

    function Logger(
        logType,
        logName
    ) {
        this.type = logType;
        this.name = logName;
    }

    /**
     * Prints INFO messages to th console.
     * @method
     * @public
     */

    Logger.prototype.info = function (
        message
    ) {
        System.log("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints WARNING messages to th console.
     * @method
     * @public
     */

    Logger.prototype.warn = function (
        message
    ) {
        System.warn("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints ERROR messages to th console.
     * @method
     * @public
     */

    Logger.prototype.error = function (
        message
    ) {
        System.error("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints DEBUG messages to th console.
     * @method
     * @public
     */

    Logger.prototype.debug = function (
        message
    ) {
        System.debug("[" + this.type + ": " + this.name + "] " + message);
    };

    return Logger;
});