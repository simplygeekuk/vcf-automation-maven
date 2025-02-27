/**
 * Logger class used for sending standard log messages to the console.
 * @returns {Any} - returns an instance of the Logger class
 */
(function () {
    /**
     * Logger class used for sending standard log messages to the console.
     * @class
     * @param {string} logType - The log type. Valid types are Action or Workflow.
     * @param {string} logName - The name of the Action or Workflow sending the log message.
     */

    function Logger(
        logType,
        logName
    ) {
        var validTypes = [
            "action",
            "workflow"
        ];

        if (logType && typeof logType !== "string") {
            throw new TypeError("logType not of type 'string'");
        } else if (logType && validTypes.indexOf(logType.toLowerCase()) < 0) {
            throw new ReferenceError("Unsupported type '" + logType + "'." +
                                     " Supported types: " + validTypes.join(", "));
        }
        this.type = logType;
        this.name = logName;
    }

    /**
     * Prints INFO messages to the console.
     * @method
     * @public
     */

    Logger.prototype.info = function (
        message
    ) {
        System.log("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints WARNING messages to the console.
     * @method
     * @public
     */

    Logger.prototype.warn = function (
        message
    ) {
        System.warn("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints ERROR messages to the console.
     * @method
     * @public
     */

    Logger.prototype.error = function (
        message
    ) {
        System.error("[" + this.type + ": " + this.name + "] " + message);
    };

    /**
     * Prints DEBUG messages to the console.
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