/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AccessToken class.
     * @class
     * @param {string} name - Name of the group access token.
     * @param {Array/string} scopes - List of scopes.
     * @param {Date} [expiresAt] - Expiration date of the access token in ISO format (YYYY-MM-DD).
     * @param {number} [accessLevel] - Role (access_level) for group access token.
     *
     * @returns {Any} Returns an instance of the AccessToken Class.
     */

    function AccessToken (
        name,
        scopes,
        expiresAt,
        accessLevel
    ) {
        var validScopes = [
            "api",
            "read_api",
            "read_registry",
            "write_registry",
            "read_repository",
            "write_repository",
            "create_runner",
            "ai_features",
            "k8s_proxy"
        ];
        /* Access Levels
            No access (0)
            Minimal access (5)
            Guest (10)
            Reporter (20)
            Developer (30)
            Maintainer (40)
            Owner (50)
        */
        var validAccessLevels = [
            0,5,10,20,30,40,50
        ];

        // Mandatory parameters, defaults and type checking.
        if (!name || typeof name !== "string") {
            throw new ReferenceError(
                "name is required and must " +
                "be of type 'string'"
            );
        }
        if (!scopes || !Array.isArray(scopes)) {
            throw new TypeError("scopes is required and must be of type 'Array/string'");
        } else if (scopes && scopes.length > 0) {
            scopes.forEach(
                function(item) {
                    if (typeof item !== "string") {
                        throw new TypeError("conditions not of type 'Array/string'");
                    } else if (validScopes.indexOf(item.toLowerCase()) < 0) {
                        throw new ReferenceError(
                            "Unsupported Scope '" + item + "'." +
                            " Supported Scopes: " + validScopes.join(", ")
                        );
                    }
                }
            );
        }
        if ((accessLevel || accessLevel === 0) && typeof accessLevel !== "number") {
            throw new TypeError("accessLevel not of type 'number'");
        } else if ((accessLevel || accessLevel === 0) && validAccessLevels.indexOf(accessLevel) < 0) {
            throw new ReferenceError(
                "Unsupported Access Level '" + accessLevel + "'." +
                " Supported Access Levels: " + validAccessLevels.join(", ")
            );
        }

        // Construct Object
        this.name = name;
        this.scopes = scopes;
        this.expires_at = expiresAt;
        if (accessLevel || accessLevel === 0) this.access_level = accessLevel;
    }

    return AccessToken;
});