/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Group class.
     * @class
     * @param {string} name - The name of the group.
     * @param {string} path - The path of the group.
     * @param {string} [description] - The group’s description.
     * @param {number} [parentId] - The parent group ID for creating nested group.
     *
     * @returns {Any} Returns an instance of the Group Class.
     */

    function Group (
        name,
        path,
        description,
        parentId
    ) {
        // Mandatory parameters, defaults and type checking.
        if (!name || typeof name !== "string") {
            throw new ReferenceError(
                "name is required and must " +
                "be of type 'string'"
            );
        }
        if (!path || typeof path !== "string") {
            throw new ReferenceError(
                "path is required and must " +
                "be of type 'string'"
            );
        }
        if (description && typeof description !== "string") {
            throw new ReferenceError(
                "description must be of type 'string'"
            );
        }
        if (parentId && typeof parentId !== "number") {
            throw new ReferenceError(
                "parentId must be of type 'number'"
            );
        }

        // Construct Object
        this.name = name;
        this.path = path;
        if (description) this.description = description;
        if (parentId) this.parent_id = parentId;
    }

    return Group;
});