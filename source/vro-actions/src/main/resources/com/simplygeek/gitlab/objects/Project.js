/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Project class.
     * @class
     * @param {string} name - The name of the project.
     * @param {string} [path] - The path of the project.
     * @param {string} [description] - The project’s description.
     * @param {number} [namespaceId] - Namespace for the new project.
     * @param {number} [templateId] - Project ID of a custom project template.
     * @param {number} [templateGroupId] - Group ID of a custom project template.
     *
     * @returns {Any} Returns an instance of the Project Class.
     */

    function Project (
        name,
        path,
        description,
        namespaceId,
        templateId,
        templateGroupId
    ) {
        // Mandatory parameters, defaults and type checking.
        if (!name || typeof name !== "string") {
            throw new ReferenceError(
                "name is required and must " +
                "be of type 'string'"
            );
        }
        if (path && typeof path !== "string") {
            throw new ReferenceError(
                "path must be of type 'string'"
            );
        }
        if (description && typeof description !== "string") {
            throw new ReferenceError(
                "description must be of type 'string'"
            );
        }
        if ((!namespaceId && namespaceId !== 0) && typeof namespaceId !== "number") {
            throw new ReferenceError(
                "namespaceId must be of type 'number'"
            );
        }
        if ((!templateId && templateId !== 0) && typeof templateId !== "number") {
            throw new ReferenceError(
                "templateId must be of type 'number'"
            );
        }
        if ((!templateGroupId && templateGroupId !== 0) && typeof templateGroupId !== "number") {
            throw new ReferenceError(
                "templateGroupId must be of type 'number'"
            );
        }

        // Construct Object
        this.name = name;
        if (path) this.path = path;
        if (description) this.description = description;
        if (namespaceId) this.namespace_id = namespaceId;
        if (templateId) this.use_custom_template = true;
        if (templateId) this.template_project_id = templateId;
        if (templateGroupId) this.group_with_project_templates_id = templateGroupId;
    }

    return Project;
});