/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Tag class.
     * @class
     * @param {string} key - The Tag name.
     * @param {string} [value] - The (optional) Tag value.
     *
     * @returns {Any} Returns an instance of the Tag Class.
     */

    function Tag (
        key,
        value
    ) {
        // Mandatory parameters, defaults and type checking.
        if (!key || typeof key !== "string") {
            throw new ReferenceError(
                "key is required and must " +
                "be of type 'string'"
            );
        }
        if (value && typeof value !== "string") {
            throw new ReferenceError(
                "value must be of type 'string'"
            );
        }

        // Construct Object
        this.key = key;
        if (value) this.value = value;
    }

    return Tag;
});