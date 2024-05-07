/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    function Logger(
        logType, logName
    ) {
        this.type = logType;
        this.name = logName;
        this.log = function (
            message
        ) {
            System.log("[" + this.type + ": " + this.name + "] " + message);
        };
        this.warn = function (
            message
        ) {
            System.warn("[" + this.type + ": " + this.name + "] " + message);
        };
        this.error = function (
            message
        ) {
            System.error("[" + this.type + ": " + this.name + "] " + message);
        };
        this.debug = function (
            message
        ) {
            System.debug("[" + this.type + ": " + this.name + "] " + message);
        };
    }
    
    return Logger;
});