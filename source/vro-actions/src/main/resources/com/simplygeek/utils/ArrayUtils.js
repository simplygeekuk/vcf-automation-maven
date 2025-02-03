/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the ArrayUtils class.
     * @class
     *
     * @returns {Any} Returns an instance of the ArrayUtils Class.
     */

    function ArrayUtils () {}

    /**
     * Defines the getHighestStringPerPrefix method.
     * @method
     * @public
     * @param {string} inputString - The input string.
     * @param {number} width - The minimum number of characters to apply padding.
     *
     * @returns {string} The padded string.
     */

    ArrayUtils.prototype.getHighestStringPerPrefix = function (
        stringList,
        prefixPattern
    ) {
        // Validate input
        if (!Array.isArray(stringList)) {
            throw new Error("stringList is required and must be of type Array/string.");
        }
        if (!prefixPattern || typeof prefixPattern !== "object") {
            throw new TypeError("prefixPattern is required and must be a valid RegEx object");
        }

        // Map to group strings by their prefixes
        var groupedStrings = {};

        // Loop through the list of strings
        for (var i = 0; i < stringList.length; i++) {
            var str = stringList[i];
            var match = str.match(prefixPattern);

            // Check if the string matches the pattern
            if (match) {
                var prefix = match[1]; // Extract the prefix
                var number = parseInt(match[2], 10); // Extract the numeric part

                // Update the map only if the prefix is new or the number is higher
                if (!groupedStrings[prefix] || groupedStrings[prefix].number < number) {
                    groupedStrings[prefix] = {
                        original: str,
                        number: number
                    };
                }
            }
        }

        // Collect the highest string from each group
        var result = [];

        for (var key in groupedStrings) {
            // if (groupedStrings.hasOwnProperty(key)) {
            if (Object.prototype.hasOwnProperty.call(groupedStrings, key)) {
                result.push(groupedStrings[key].original);
            }
        }

        return result;
    };

    return ArrayUtils;
});