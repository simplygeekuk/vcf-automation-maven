/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Principal class.
     * @class
     * @param {string} email - The username of the user or display name of the group.
     * @param {string} [type] - Type of the principal.
     *
     * @returns {Any} Returns an instance of the Principal Class.
     */

    function Principal (
        email,
        type
    ) {
        // Mandatory parameters, defaults and type checking.
        var validTypes = [
            "user",
            "group"
        ];

        if (!email || typeof email !== "string") {
            throw new ReferenceError(
                "email is required and must " +
                "be of type 'string'"
            );
        }
        if (type && typeof type !== "string") {
            throw new TypeError("type not of type 'string'");
        } else if (type && validTypes.indexOf(type.toLowerCase()) < 0) {
            throw new ReferenceError("Unsupported type '" + type + "'." +
                                     " Supported types: " + validTypes.join(", "));
        }

        // Construct Object
        this.email = email;
        this.type = type ? type.toLowerCase() : "user";
    }

    return Principal;
});