/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the SAMLGroupLink class.
     * @class
     * @param {string} samlGroupName - The name of the AD group (without domain).
     * @param {number} accessLevel - Role (access_level) for members of the SAML group.
     * @param {number} [memberRoleId] - Member Role ID for members of the SAML group.
     *
     * @returns {Any} Returns an instance of the SAMLGroupLink Class.
     */

    function SAMLGroupLink (
        samlGroupName,
        accessLevel,
        memberRoleId
    ) {
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
        if (!samlGroupName || typeof samlGroupName !== "string") {
            throw new ReferenceError(
                "samlGroupName is required and must " +
                "be of type 'string'"
            );
        }
        if ((accessLevel || accessLevel === 0) && typeof accessLevel !== "number") {
            throw new TypeError("accessLevel not of type 'number'");
        } else if ((accessLevel || accessLevel === 0) && validAccessLevels.indexOf(accessLevel) < 0) {
            throw new ReferenceError("Unsupported Access Level '" + accessLevel + "'." +
                                     " Supported Access Levels: " + validAccessLevels.join(", "));
        }
        if (memberRoleId && typeof memberRoleId !== "number") {
            throw new ReferenceError(
                "memberRoleId must be of type 'number'"
            );
        }

        // Construct Object
        this.saml_group_name = samlGroupName;
        this.access_level = accessLevel;
        if (memberRoleId) this.member_role_id = memberRoleId;
    }

    return SAMLGroupLink;
});