/**
 * Provides an interface to the VCF Automation Projects API.
 * @returns {Any} - An instance of the VCFAutomationProjectService class.
 */
(function () {
    /**
     * Provides an interface to the VCF Automation Projects API.
     * @class
     * @param {REST:RESTHost} restHost - The VCF Automation HTTP REST host.
     * @param {string} apiToken - The VCF Automation API Token.
     * @returns {Any} An instance of the VCFAutomationProjectService class.
     */
    function VCFAutomationProjectService(restHost, apiToken) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }
        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError(
                "apiToken is required and must " + "be of type 'string'"
            );
        }

        this.restHost = restHost;

        VCFAutomationBackend.call(this);
        // VCFAutomationIaasService.call(this, this.restHost, apiToken);

        this.log = new (System.getModule(
            "com.simplygeek.vcf.orchestrator.logging"
        ).Logger())("Action", "VCFAutomationProjectService");

        this.baseUri = "/project-service/api";
        this.apiVersion = this.about().latestApiVersion;
        this.apiVersionParam = "apiVersion=" + this.apiVersion;

        // Since we are calling VCFAutomationIaasService, no need to re-authenticate.
        this.createAuthenticatedSession(apiToken);
    }

    var VCFAutomationBackend = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationBackend();

    VCFAutomationProjectService.prototype = Object.create(
        VCFAutomationBackend.prototype
    );
    VCFAutomationProjectService.prototype.constructor =
        VCFAutomationProjectService;

    /**
     * Get a list of projects.
     * @function
     * @public
     * @returns {Array/Any} The list of projects.
     */
    VCFAutomationProjectService.prototype.getProjects = function () {
        var uri = this.baseUri + "/projects?" + this.apiVersionParam;
        var results;

        this.log.debug("Getting a list of Projects");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Projects");

        return results;
    };

    /**
     * Get a specific project by its ID.
     * @function
     * @public
     * @param {string} projectId - The project id.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     * @returns {Any} The project object.
     */
    VCFAutomationProjectService.prototype.getProjectById = function (
        projectId,
        throwOnNotFound
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri =
            this.baseUri +
            "/projects/" +
            projectId +
            "?" +
            this.apiVersionParam;
        var projectObject;

        this.log.debug("Getting project with ID '" + projectId + "'");
        projectObject = this.get(uri, [200, 404]);

        if (projectObject) {
            var projectName = projectObject.name;

            this.log.debug(
                "Found project with name '" +
                    projectName +
                    "' and id '" +
                    projectId +
                    "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Project with id '" + projectId + "' not found"
                );
            } else {
                this.log.warn("Project with id '" + projectId + "' not found");
            }
        }

        return projectObject;
    };

    /**
     * Get a specific project by its name.
     * @function
     * @public
     * @param {string} projectName - The project name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     * @returns {Any} The project object.
     */
    VCFAutomationProjectService.prototype.getProjectByName = function (
        projectName,
        throwOnNotFound
    ) {
        if (!projectName || typeof projectName !== "string") {
            throw new ReferenceError(
                "projectName is required and must " + "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri =
            this.baseUri +
            "/projects?$filter=name eq '" +
            projectName +
            "'" +
            "&" +
            this.apiVersionParam;
        var projectObject;
        var projectId;

        this.log.debug("Getting project with name '" + projectName + "'");
        var results = this.get(uri);

        if (results.length > 1) {
            throw new Error(
                "More than one project found. Unable to determine correct " +
                    "project with name '" +
                    projectName +
                    "'"
            );
        } else if (results.length > 0) {
            projectObject = results[0];
            projectId = projectObject.id;
            projectObject.tags = this.getProjectTags(projectId);

            this.log.debug(
                "Found project '" +
                    projectName +
                    "' with " +
                    "id '" +
                    projectId +
                    "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Project not found with name '" + projectName + "'"
                );
            } else {
                this.log.warn(
                    "Project not found with name '" + projectName + "'"
                );
            }
        }

        return projectObject;
    };

    /**
     * Get a list of projects that start with the specified prefix.
     * @function
     * @public
     * @param {string} projectNamePrefix - The project name prefix.
     * @returns {Array/Any} The projects matching the provided name prefix.
     */
    VCFAutomationProjectService.prototype.getProjectsWithPrefix = function (
        projectNamePrefix
    ) {
        if (!projectNamePrefix || typeof projectNamePrefix !== "string") {
            throw new ReferenceError(
                "projectNamePrefix is required and must " +
                    "be of type 'string'"
            );
        }

        var uri =
            this.baseUri +
            "/projects?$filter=startswith(name, '" +
            projectNamePrefix +
            "')" +
            "&" +
            this.apiVersionParam;
        var projects = [];

        this.log.debug(
            "Getting project with name prefix '" + projectNamePrefix + "'"
        );
        projects = this.get(uri);

        return projects;
    };

    /**
     * Create a project.
     * @function
     * @public
     * @param {Any} projectSpecification - The project specification.
     * @returns {Any} The new project object.
     */
    VCFAutomationProjectService.prototype.createProject = function (
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

        if (projectSpecification.tags)
            var projectTags = projectSpecification.tags;
        delete projectSpecification.tags;

        this.log.debug("Creating project '" + projectSpecification.name + "'");
        projectObject = this.post(uri, projectSpecification);

        if (projectTags && projectTags.length > 0) {
            var projectId = projectObject.id;

            this.createProjectTags(projectId, projectTags);

            projectObject.tags = projectTags;
        }

        this.log.debug("Project successfully created");

        return projectObject;
    };

    /**
     * Get project tags.
     * @function
     * @public
     * @param {string} projectId - The project id.
     * @returns {Array/Any} The project tags list.
     */
    VCFAutomationProjectService.prototype.getProjectTags = function (
        projectId
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }

        var uri =
            this.baseUri +
            "/projects/" +
            projectId +
            "/resource-metadata?" +
            this.apiVersionParam;
        var projectMetadataObject;
        var projectTags = [];

        this.log.debug(
            "Getting a list of project tags for project ID '" + projectId + "'"
        );
        projectMetadataObject = this.get(uri);
        if (projectMetadataObject.tags) {
            projectTags = projectMetadataObject.tags;
        }

        this.log.debug("Found " + projectTags.length + " tags");

        return projectTags;
    };

    /**
     * Create project tags.
     * @function
     * @public
     * @param {string} projectId - The project id.
     * @param {Array/Any} tags - The tags to assign to project.
     * @returns {Array/Any} The project tags list.
     */
    VCFAutomationProjectService.prototype.createProjectTags = function (
        projectId,
        tags
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }
        if (tags && !Array.isArray(tags)) {
            throw new TypeError("tags not of type 'Array/object'");
        } else if (tags && tags.length > 0) {
            tags.forEach(function (item) {
                if (typeof item !== "object") {
                    throw new TypeError("tags not of type 'Array/object'");
                }
            });
        }

        var uri =
            this.baseUri +
            "/projects/" +
            projectId +
            "/resource-metadata?" +
            this.apiVersionParam;
        var updatedProjectTags;
        var projectTags = {};

        projectTags.tags = tags;

        this.log.debug(
            "Updating project tags for project ID '" + projectId + "'"
        );
        updatedProjectTags = this.patch(uri, projectTags);

        this.log.debug("Successfully updated tags");

        return updatedProjectTags;
    };

    /**
     * Update a project.
     * @function
     * @public
     * @param {string} projectId - The Project uuid.
     * @param {Any} updatedObject - The Project object to update.
     * @returns {Any} The updated Project object.
     */
    VCFAutomationProjectService.prototype.updateProject = function (
        projectId,
        updatedObject
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }
        if (!updatedObject || typeof updatedObject !== "object") {
            throw new ReferenceError(
                "updatedObject is required and must " + "be of type 'object'"
            );
        }

        var uri =
            this.baseUri +
            "/projects/" +
            projectId +
            "?" +
            this.apiVersionParam;
        var updatedProjectObject;

        updatedProjectObject = this.patch(uri, updatedObject);

        return updatedProjectObject;
    };

    /**
     * Delete a project.
     * @function
     * @public
     * @param {string} projectId - The Project uuid.
     */
    VCFAutomationProjectService.prototype.deleteProject = function (projectId) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " + "be of type 'string'"
            );
        }

        this.log.info("Deleting project with id '" + projectId + "'");
        var uri =
            this.baseUri +
            "/projects/" +
            projectId +
            "?" +
            this.apiVersionParam;

        this.delete(uri, [200]);
        this.log.info("Successfully deleted project");
    };

    return VCFAutomationProjectService;
});
