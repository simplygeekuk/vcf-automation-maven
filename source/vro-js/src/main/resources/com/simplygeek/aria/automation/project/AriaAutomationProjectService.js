/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AriaAutomationProjectService class.
     * @class
     * @param {REST:RESTHost} restHost - The Aria Automation HTTP REST host.
     * @param {string} apiToken - The Aria Automation API Token.
     *
     * @returns {Any} An instance of the AriaAutomationProjectService class.
     */

    function AriaAutomationProjectService(
        restHost,
        apiToken
    ) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }
        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError(
                "apiToken is required and must " +
                "be of type 'string'"
            );
        }

        AriaAutomationGenericBackendService.call(this, restHost, apiToken);
        AriaAutomationIaasService.call(this, restHost, apiToken);

        this.log = new (System.getModule("com.simplygeek.log").Logger())(
            "Action",
            "AriaAutomationProjectService"
        );

        this.baseUri = "/project-service/api";
        this.apiVersion = this.about().latestApiVersion;
        this.apiVersionParam = "apiVersion=" + this.apiVersion;

        this.createAuthenticatedSession(apiToken);
    }

    var AriaAutomationGenericBackendService = System.getModule(
        "com.simplygeek.aria.automation"
    ).AriaAutomationGenericBackendService();

    AriaAutomationProjectService.prototype = Object.create(
        AriaAutomationGenericBackendService.prototype
    );
    AriaAutomationProjectService.prototype.constructor = AriaAutomationProjectService;

    var AriaAutomationIaasService = System.getModule(
        "com.simplygeek.aria.automation.iaas"
    ).AriaAutomationIaasService();

    AriaAutomationProjectService.prototype.getProjectZones = AriaAutomationIaasService.prototype.getProjectZones;

    /**
     * Defines the getProjects method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of projects.
     */

    AriaAutomationProjectService.prototype.getProjects = function () {
        var uri = this.baseUri + "/projects?" + this.apiVersionParam;
        var results;

        this.log.debug("Getting a list of Projects");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Projects");

        return results;
    };

    /**
     * Defines the getProjectById method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The project object.
     */

    AriaAutomationProjectService.prototype.getProjectById = function (
        projectId,
        throwOnNotFound
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/projects/" + projectId + "?" + this.apiVersionParam;
        var projectObject;

        this.log.debug("Getting project with ID '" + projectId + "'");
        projectObject = this.get(uri, null, throwOnNotFound);

        if (projectObject) {
            var projectName = projectObject.name;

            projectObject.tags = this.getProjectTags(projectId);
            this.log.debug(
                "Found project with name '" + projectName +
                "' and id '" + projectId + "'"
            );
        }

        return projectObject;
    };

    /**
     * Defines the getProjectByName method.
     * @method
     * @public
     * @param {string} projectName - The project name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The project object.
     */

    AriaAutomationProjectService.prototype.getProjectByName = function (
        projectName,
        throwOnNotFound
    ) {
        if (!projectName || typeof projectName !== "string") {
            throw new ReferenceError(
                "projectName is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/projects?$filter=name eq '" + projectName + "'" +
                                "&" + this.apiVersionParam;
        var projectObject;
        var projectId;

        this.log.debug(
            "Getting project with name '" + projectName + "'");
        var results = this.get(uri);

        if (results.length > 1) {
            throw new Error(
                "More than one project found. Unable to determine correct " +
                "project with name '" + projectName + "'"
            );
        } else if (results.length > 0) {
            projectObject = results[0];
            projectId = projectObject.id;
            projectObject.tags = this.getProjectTags(projectId);

            this.log.debug(
                "Found project '" + projectName + "' with " +
                "id '" + projectId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Project not found with name '" +
                    projectName + "'"
                );
            } else {
                this.log.warn(
                    "Project not found with name '" +
                    projectName + "'"
                );
            }
        }

        return projectObject;
    };

    /**
     * Defines the getProjectsWithPrefix method.
     * @method
     * @public
     * @param {string} projectNamePrefix - The project name prefix.
     *
     * @returns {Array/Any} The projects matching the provided name prefix.
     */

    AriaAutomationProjectService.prototype.getProjectsWithPrefix = function (
        projectNamePrefix
    ) {
        if (!projectNamePrefix || typeof projectNamePrefix !== "string") {
            throw new ReferenceError(
                "projectNamePrefix is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/projects?$filter=startswith(name, '" + projectNamePrefix + "')" +
                                "&" + this.apiVersionParam;
        var projects = [];

        this.log.debug(
            "Getting project with name prefix '" + projectNamePrefix + "'"
        );
        projects = this.get(uri);

        return projects;
    };

    /**
     * Defines the createProject method.
     * @method
     * @public
     * @param {Any} projectSpecification - The project specification.
     *
     * @returns {Any} The new project object.
     */

    AriaAutomationProjectService.prototype.createProject = function (
        projectSpecification
    ) {
        if (!projectSpecification || typeof projectSpecification !== "object") {
            throw new ReferenceError(
                "projectSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/projects?" + this.apiVersionParam;
        var projectObject;

        if (projectSpecification.tags) var projectTags = projectSpecification.tags;
        delete projectSpecification.tags;

        projectObject = this.post(
            uri,
            projectSpecification
        );

        if (projectTags && projectTags.length > 0) {
            var projectId = projectObject.id;

            this.createProjectTags(
                projectId,
                projectTags
            );

            projectObject.tags = projectTags;
        }

        return projectObject;
    };

    /**
     * Defines the getProjectTags method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     *
     * @returns {Array/Any} The project tags list.
     */

    AriaAutomationProjectService.prototype.getProjectTags = function (
        projectId
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/projects/" + projectId +
                                "/resource-metadata?" + this.apiVersionParam;
        var projectMetadataObject;
        var projectTags = [];

        this.log.debug("Getting a list of project tags for project ID '" + projectId + "'");
        projectMetadataObject = this.get(uri);
        if (projectMetadataObject.tags) {
            projectTags = projectMetadataObject.tags;
        }

        this.log.debug(
            "Found " + projectTags.length + " tags"
        );

        return projectTags;
    };

    /**
     * Defines the createProjectTags method.
     * @method
     * @public
     * @param {string} projectId - The project id.
     * @param {Array/Any} tags - The tags to assign to project.
     *
     * @returns {Array/Any} The project tags list.
     */

    AriaAutomationProjectService.prototype.createProjectTags = function (
        projectId,
        tags
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }
        if (tags && !Array.isArray(tags)) {
            throw new TypeError("tags not of type 'Array/object'");
        } else if (tags && tags.length > 0) {
            tags.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("tags not of type 'Array/object'");
                    }
                }
            );
        }

        var uri = this.baseUri + "/projects/" + projectId +
                                "/resource-metadata?" + this.apiVersionParam;
        var updatedProjectTags;
        var projectTags = {};

        projectTags.tags = tags;

        this.log.debug("Updating project tags for project ID '" + projectId + "'");
        updatedProjectTags = this.patch(
            uri,
            projectTags
        );

        this.log.debug(
            "Successfully updated tags"
        );

        return updatedProjectTags;
    };

    /**
     * Defines the updateProject method.
     * @method
     * @public
     * @param {string} projectId - The Project uuid.
     * @param {Any} updatedObject - The Project object to update.
     *
     * @returns {Any} The updated Project object.
     */

    AriaAutomationProjectService.prototype.updateProject = function (
        projectId,
        updatedObject
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }
        if (!updatedObject || typeof updatedObject !== "object") {
            throw new ReferenceError(
                "updatedObject is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/projects?" + this.apiVersionParam;
        var updatedprojectObject;

        updatedprojectObject = this.put(
            uri,
            updatedObject
        );

        return updatedprojectObject;
    };

    return AriaAutomationProjectService;
});