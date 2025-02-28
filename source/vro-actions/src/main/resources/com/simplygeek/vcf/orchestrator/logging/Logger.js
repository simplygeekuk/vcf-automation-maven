/**
 * Logger class used for sending standard log messages to the console.
 * @returns {Any} - returns an instance of the Logger class
 */
(function () {
    /**
     * Logger class used for sending standard log messages to the console.
     * @class
     * @param {string} logSource - The log source. Valid sources are Action or Workflow.
     * @param {string} logName - The name of the Action or Workflow sending the log message.
     */

    function Logger(
        logSource,
        logName
    ) {
        var validSources = [
            "action",
            "workflow"
        ];

        if (logSource && typeof logSource !== "string") {
            throw new TypeError("logSource not of type 'string'");
        } else if (logSource && validSources.indexOf(logSource.toLowerCase()) < 0) {
            throw new ReferenceError("Unsupported source '" + logSource + "'." +
                                     " Supported sources: " + validSources.join(", "));
        }
        this.type = logSource;
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
        if (!message || typeof message !== "string") {
            throw new ReferenceError("message is required and must be of type 'string'");
        }

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
        if (!message || typeof message !== "string") {
            throw new ReferenceError("message is required and must be of type 'string'");
        }

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
        if (!message || typeof message !== "string") {
            throw new ReferenceError("message is required and must be of type 'string'");
        }

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
        if (!message || typeof message !== "string") {
            throw new ReferenceError("message is required and must be of type 'string'");
        }

        System.debug("[" + this.type + ": " + this.name + "] " + message);
    };

    return Logger;
});