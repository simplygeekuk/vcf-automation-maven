/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the StringUtils class.
     * @class
     *
     * @returns {Any} Returns an instance of the StringUtils Class.
     */

    function StringUtils () {}

    /**
     * Defines the padString method.
     * @method
     * @public
     * @param {string} inputString - The input string.
     * @param {number} width - The minimum number of characters to apply padding.
     * @param {string} [padValue] - The value to use for padding (default 0).
     *
     * @returns {string} The padded string.
     */

    StringUtils.prototype.padString = function (
        inputString,
        width,
        padValue
    ) {
        if (!inputString || typeof inputString !== "string") {
            throw new ReferenceError(
                "inputString is required and must " +
                "be of type 'string'"
            );
        }
        if ((!width && width !== 0) || typeof width !== "number") {
            throw new ReferenceError(
                "width is required and must " +
                "be of type 'number'"
            );
        }
        if (padValue && typeof padValue !== "string") {
            throw new ReferenceError(
                "padValue must be of type 'string'"
            );
        }

        var paddedString;

        padValue = padValue || "0";

        if (inputString.length < width) {
            paddedString = new Array(
                width - inputString.length + 1
            ).join(padValue) + inputString;
        } else {
            paddedString = inputString;
        }

        return paddedString;
    };

    return StringUtils;
});