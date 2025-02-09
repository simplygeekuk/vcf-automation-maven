/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the AnsibleAutomationPlatformService class.
     * @class
     * @param {REST:RESTHost} restHost - The AAP HTTP REST host.
     *
     * @returns {Any} An instance of the AnsibleAutomationPlatformService class.
     */

    function AnsibleAutomationPlatformService(restHost) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost is required and must be of type 'REST:RESTHost'"
            );
        }

        AnsibleAutomationBackendService.call(this, restHost);

        this.log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
            "Action",
            "AnsibleAutomationPlatformService"
        );
    }

    var AnsibleAutomationBackendService = System.getModule(
        "com.simplygeek.ansible"
    ).AnsibleAutomationBackendService();

    AnsibleAutomationPlatformService.prototype = Object.create(
        AnsibleAutomationBackendService.prototype
    );
    AnsibleAutomationPlatformService.prototype.constructor = AnsibleAutomationPlatformService;

    // ####################
    // ## Authentication ##
    // ####################

    /**
     * Defines the createSession method.
     * @method
     * @public
     * @param {number} applicationId - The Ansible Application ID.
     * @param {string} scope - The authorization scope.
     *
     * @returns {Any} The request response object.
     */

    AnsibleAutomationPlatformService.prototype.createSession = function (
        applicationId,
        scope
    ) {
        if ((!applicationId && applicationId !== 0) || typeof applicationId !== "number") {
            throw new ReferenceError(
                "applicationId is required and must " +
                "be of type 'number'"
            );
        }
        var validScopes = [
            "read",
            "write"
        ];

        if (!scope || typeof scope !== "string") {
            throw new TypeError(
                "scope has not been defined or not of type 'string'"
            );
        } else if (scope && validScopes.indexOf(scope) < 0) {
            throw new ReferenceError(
                "Invalid scope '" + scope + "'." +
                " Supported scope types: " + validScopes.join(", ")
            );
        }

        this.session = {};
        var uri = this.baseUri + "/tokens/";
        var content = {
            application: applicationId,
            scope: scope
        };

        this.log.debug("Creating API session.");
        var response = this.rest.post(
            uri,
            this.mediaType,
            content,
            this.mediaType,
            [201]
        );

        this.session = JSON.parse(response.contentAsString);
        this.sessionHeaders.put("Authorization", "Bearer " + this.session.token);
    };

    /**
     * Defines the closeSession method.
     * @method
     * @public
     */

    AnsibleAutomationPlatformService.prototype.closeSession = function () {
        var uri = this.baseUri + "/tokens/" + this.session.id + "/";

        this.log.debug("Closing API session.");
        try {
            this.rest.delete(
                uri,
                this.mediaType,
                [204],
                this.sessionHeaders
            );
        } catch (e) {
            this.log.warn("Failed to close session, perhaps it has already expired. " + e);
        }
    };

    // ##################
    // ## Applications ##
    // ##################

    /**
     * Defines the getApplicationById method.
     * @method
     * @public
     * @param {number} applicationId - The application ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The application object.
     */

    AnsibleAutomationPlatformService.prototype.getApplicationById = function (
        applicationId,
        throwOnNotFound
    ) {
        if ((!applicationId && applicationId !== 0) || typeof applicationId !== "number") {
            throw new ReferenceError(
                "applicationId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "applications";
        var applicationObject = this.getResourceById(
            applicationId,
            resourceType,
            throwOnNotFound
        );

        return applicationObject;
    };

    /**
     * Defines the getApplicationByName method.
     * @method
     * @public
     * @param {number} applicationName - The application name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The application object.
     */

    AnsibleAutomationPlatformService.prototype.getApplicationByName = function (
        applicationName,
        throwOnNotFound
    ) {
        if (!applicationName || typeof applicationName !== "string") {
            throw new ReferenceError(
                "applicationName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "applications";
        var applicationObject = this.getResourceByName(
            applicationName,
            resourceType,
            throwOnNotFound
        );

        return applicationObject;
    };

    // ###################
    // ## Organizations ##
    // ###################

    /**
     * Defines the getOrganizations method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of organizations.
     */

    AnsibleAutomationPlatformService.prototype.getOrganizations = function () {
        var uri = this.baseUri + "/organizations/?order_by=name";
        var results;

        this.log.debug("Getting list of organizations");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " organizations");

        return results;
    };

    /**
     * Defines the getOrganizationById method.
     * @method
     * @public
     * @param {number} organizationId - The organization ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The organization object.
     */

    AnsibleAutomationPlatformService.prototype.getOrganizationById = function (
        organizationId,
        throwOnNotFound
    ) {
        if ((!organizationId && organizationId !== 0) || typeof organizationId !== "number") {
            throw new ReferenceError(
                "organizationId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "organizations";
        var organizationObject = this.getResourceById(
            organizationId,
            resourceType,
            throwOnNotFound
        );

        return organizationObject;
    };

    /**
     * Defines the getOrganizationByName method.
     * @method
     * @public
     * @param {string} organizationName - The organization name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The organization object.
     */

    AnsibleAutomationPlatformService.prototype.getOrganizationByName = function (
        organizationName,
        throwOnNotFound
    ) {
        if (!organizationName || typeof organizationName !== "string") {
            throw new ReferenceError(
                "organizationName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "organizations";
        var organizationObject = this.getResourceByName(
            organizationName,
            resourceType,
            throwOnNotFound
        );

        return organizationObject;

    };

    // #################
    // ## Credentials ##
    // #################

    /**
     * Defines the getCredentials method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of credentials.
     */

    AnsibleAutomationPlatformService.prototype.getCredentials = function () {

        var uri = this.baseUri + "/credentials/?order_by=name";
        var results;

        this.log.debug("Getting list of credentials");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " credentials");

        return results;
    };

    /**
     * Defines the getCredentialById method.
     * @method
     * @public
     * @param {number} credentialId - The credential ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The credential object.
     */

    AnsibleAutomationPlatformService.prototype.getCredentialById = function (
        credentialId,
        throwOnNotFound
    ) {
        if ((!credentialId && credentialId !== 0) || typeof credentialId !== "number") {
            throw new ReferenceError(
                "credentialId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "credentials";
        var credentialObject = this.getResourceById(
            credentialId,
            resourceType,
            throwOnNotFound
        );

        return credentialObject;
    };

    /**
     * Defines the getCredentialByName method.
     * @method
     * @public
     * @param {string} credentialName - The credential name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The credential object.
     */

    AnsibleAutomationPlatformService.prototype.getCredentialByName = function (
        credentialName,
        throwOnNotFound
    ) {
        if (!credentialName || typeof credentialName !== "string") {
            throw new ReferenceError(
                "credentialName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "organizations";
        var credentialObject = this.getResourceByName(
            credentialName,
            resourceType,
            throwOnNotFound
        );

        return credentialObject;
    };

    /**
     * Defines the createCredential method.
     * @method
     * @public
     * @param {Any} credentialSpecification - The credential specification.
     *
     * @returns {Any} The new credential object.
     */

    AnsibleAutomationPlatformService.prototype.createCredential = function (
        credentialSpecification
    ) {
        if (!credentialSpecification || typeof credentialSpecification !== "object") {
            throw new ReferenceError(
                "credentialSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/credentials/";
        var credentialObject;

        this.log.debug("Creating credential " + credentialSpecification.name);
        credentialObject = this.post(
            uri,
            credentialSpecification
        );
        this.log.debug("Credential successfully created");

        return credentialObject;
    };

    /**
     * Defines the updateCredential method.
     * @method
     * @public
     * @param {number} credentialId - The credential ID.
     * @param {Any} credentialSpecification - The credential specification.
     *
     * @returns {Any} The updated credential object.
     */

    AnsibleAutomationPlatformService.prototype.updateCredential = function (
        credentialId,
        credentialSpecification
    ) {
        if (!credentialSpecification || typeof credentialSpecification !== "object") {
            throw new ReferenceError(
                "credentialSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/credentials/" + credentialId.toString() + "/";
        var updatedCredentialObject;
        var credential = this.getCredentialById(
            credentialId
        );
        var credentialName = credential.name;

        this.log.debug("Updating credential " + credentialName);
        updatedCredentialObject = this.patch(
            uri,
            credentialSpecification
        );
        this.log.debug("Credential successfully updated");

        return updatedCredentialObject;
    };

    // ######################
    // ## Credential Types ##
    // ######################

    /**
     * Defines the getCredentialTypes method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of credential types.
     */

    AnsibleAutomationPlatformService.prototype.getCredentialTypes = function () {

        var uri = this.baseUri + "/credential_types/?order_by=name";
        var results;

        this.log.debug("Getting list of credential types");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " credential types");

        return results;
    };

    /**
     * Defines the getCredentialTypeById method.
     * @method
     * @public
     * @param {number} credentialTypeId - The credential type ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The credential type object.
     */

    AnsibleAutomationPlatformService.prototype.getCredentialTypeById = function (
        credentialTypeId,
        throwOnNotFound
    ) {
        if ((!credentialTypeId && credentialTypeId !== 0) || typeof credentialTypeId !== "number") {
            throw new ReferenceError(
                "credentialTypeId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "credential_types";
        var credentialTypeObject = this.getResourceById(
            credentialTypeId,
            resourceType,
            throwOnNotFound
        );

        return credentialTypeObject;
    };

    /**
     * Defines the getCredentialTypeByName method.
     * @method
     * @public
     * @param {string} credentialTypeName - The credential type name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The credential type object.
     */

    AnsibleAutomationPlatformService.prototype.getCredentialTypeByName = function (
        credentialTypeName,
        throwOnNotFound
    ) {
        if (!credentialTypeName || typeof credentialTypeName !== "string") {
            throw new ReferenceError(
                "credentialTypeName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "credential_types";
        var credentialTypeObject = this.getResourceByName(
            credentialTypeName,
            resourceType,
            throwOnNotFound
        );

        return credentialTypeObject;
    };

    // ###########
    // ## Teams ##
    // ###########

    /**
     * Defines the getTeams method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of teams.
     */

    AnsibleAutomationPlatformService.prototype.getTeams = function () {

        var uri = this.baseUri + "/teams/?order_by=name";
        var results;

        this.log.debug("Getting list of Teams");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Teams");

        return results;
    };

    /**
     * Defines the getTeamById method.
     * @method
     * @public
     * @param {number} teamId - The team ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The team object.
     */

    AnsibleAutomationPlatformService.prototype.getTeamById = function (
        teamId,
        throwOnNotFound
    ) {
        if ((!teamId && teamId !== 0) || typeof teamId !== "number") {
            throw new ReferenceError(
                "teamId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "teams";
        var teamObject = this.getResourceById(
            teamId,
            resourceType,
            throwOnNotFound
        );

        return teamObject;
    };

    /**
     * Defines the getTeamByName method.
     * @method
     * @public
     * @param {string} teamName - The team name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The team object.
     */

    AnsibleAutomationPlatformService.prototype.getTeamByName = function (
        teamName,
        throwOnNotFound
    ) {
        if (!teamName || typeof teamName !== "string") {
            throw new ReferenceError(
                "teamName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "teams";
        var teamObject = this.getResourceByName(
            teamName,
            resourceType,
            throwOnNotFound
        );

        return teamObject;
    };

    /**
     * Defines the createTeam method.
     * @method
     * @public
     * @param {Any} teamSpecification - The team specification.
     *
     * @returns {Any} The new team object.
     */

    AnsibleAutomationPlatformService.prototype.createTeam = function (
        teamSpecification
    ) {
        if (!teamSpecification || typeof teamSpecification !== "object") {
            throw new ReferenceError(
                "teamSpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/teams/";
        var teamObject;

        this.log.debug("Creating team " + teamSpecification.name);
        teamObject = this.post(
            uri,
            teamSpecification
        );
        this.log.debug("Team successfully created");

        return teamObject;
    };

    /**
     * Defines the assignRoleToTeam method.
     * @method
     * @public
     * @param {number} teamId - The team ID.
     * @param {number} roleId - The role ID.
     *
     * @returns {Any} The role object.
     */

    AnsibleAutomationPlatformService.prototype.assignRoleToTeam = function (
        teamId,
        roleId
    ) {
        if ((!teamId && teamId !== 0) || typeof teamId !== "number") {
            throw new ReferenceError(
                "teamId is required and must " +
                "be of type 'number'"
            );
        }
        if ((!roleId && roleId !== 0) || typeof roleId !== "number") {
            throw new ReferenceError(
                "roleId is required and must " +
                "be of type 'number'"
            );
        }

        var uri = this.baseUri + "/teams/" + teamId.toString() + "/roles/";
        var roleObject;
        var content = {
            id: roleId
        };

        this.log.debug(
            "Assigning role to team with team id '" + teamId + "'" +
            " and role id '" + roleId + "'"
        );
        roleObject = this.post(
            uri,
            content,
            [204]
        );

        this.log.debug("Role successfully assigned to team");

        return roleObject;
    };

    // ###########
    // ## Roles ##
    // ###########

    /**
     * Defines the getRoles method.
     * @method
     * @public
     * @param {name} [roleName] - filter by role name.
     * @param {name} [resourceType] - filter by resource type.
     * @param {name} [resourceName] - filter by resource name.
     *
     * @returns {Array/Any} The response results.
     */

    AnsibleAutomationPlatformService.prototype.getRoles = function (
        roleName,
        resourceType,
        resourceName
    ) {
        if (roleName && typeof roleName !== "string") {
            throw new ReferenceError("roleName must be of type 'string'");
        }
        if (resourceType && typeof resourceType !== "string") {
            throw new ReferenceError("resourceType must be of type 'string'");
        }
        if (resourceName && typeof resourceName !== "string") {
            throw new ReferenceError("resourceName must be of type 'string'");
        }

        var uri = this.baseUri + "/roles/";
        var roles = [];

        this.log.debug("Getting list of roles");
        roles = this.get(uri);

        if (roleName) {
            roles = roles.filter(
                function(role) {
                    return role.name === roleName;
                }
            );
        }

        if (resourceType) {
            roles = roles.filter(
                function(role) {
                    return role.summary_fields.resource_type === resourceType.toLowerCase();
                }
            );
        }

        if (resourceName) {
            roles = roles.filter(
                function(role) {
                    return role.summary_fields.resource_name === resourceName;
                }
            );
        }

        this.log.debug("Found " + roles.length + " roles");

        return roles;
    };

    /**
     * Defines the getRoleById method.
     * @method
     * @public
     * @param {number} roleId - The Role ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The role object.
     */

    AnsibleAutomationPlatformService.prototype.getRoleById = function (
        roleId,
        throwOnNotFound
    ) {
        if ((!roleId && roleId !== 0) || typeof roleId !== "number") {
            throw new ReferenceError(
                "roleId is required and must " +
                "be of type 'number'"
            );
        }

        var uri = this.baseUri + "/roles/" + roleId.toString() + "/";

        this.log.debug("Getting role with ID '" + roleId + "'");
        var roleObject = this.get(uri, null, throwOnNotFound);

        if (roleObject) {
            var roleName = roleObject.name;

            this.log.debug(
                "Found role with name '" + roleName +
                "' and id '" + roleId + "'"
            );
        }

        return roleObject;
    };

    // ###############
    // ## Inventory ##
    // ###############

    /**
     * Defines the getInventories method.
     * @method
     * @public
     *
     * @returns {Array/Any} The list of inventories.
     */

    AnsibleAutomationPlatformService.prototype.getInventories = function () {

        var uri = this.baseUri + "/inventories/?order_by=name";
        var results;

        this.log.debug("Getting list of inventories");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " inventories");

        return results;
    };

    /**
     * Defines the getInventoryById method.
     * @method
     * @public
     * @param {number} inventoryId - The inventory ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The inventory object.
     */

    AnsibleAutomationPlatformService.prototype.getInventoryById = function (
        inventoryId,
        throwOnNotFound
    ) {
        if ((!inventoryId && inventoryId !== 0) || typeof inventoryId !== "number") {
            throw new ReferenceError(
                "inventoryId is required and must " +
                "be of type 'number'"
            );
        }

        var resourceType = "inventories";
        var inventoryObject = this.getResourceById(
            inventoryId,
            resourceType,
            throwOnNotFound
        );

        return inventoryObject;

    };

    /**
     * Defines the getInventoryByName method.
     * @method
     * @public
     * @param {string} inventoryName - The inventory name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The inventory object.
     */

    AnsibleAutomationPlatformService.prototype.getInventoryByName = function (
        inventoryName,
        throwOnNotFound
    ) {
        if (!inventoryName || typeof inventoryName !== "string") {
            throw new ReferenceError(
                "inventoryName is required and must " +
                "be of type 'string'"
            );
        }

        var resourceType = "inventories";
        var inventoryObject = this.getResourceByName(
            inventoryName,
            resourceType,
            throwOnNotFound
        );

        return inventoryObject;
    };

    /**
     * Defines the createInventory method.
     * @method
     * @public
     * @param {Any} inventorySpecification - The inventory specification.
     *
     * @returns {Any} The new inventory object.
     */

    AnsibleAutomationPlatformService.prototype.createInventory = function (
        inventorySpecification
    ) {
        if (!inventorySpecification || typeof inventorySpecification !== "object") {
            throw new ReferenceError(
                "inventorySpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/inventories/";
        var inventoryObject;

        this.log.debug("Creating inventory " + inventorySpecification.name);
        inventoryObject = this.post(
            uri,
            inventorySpecification
        );
        this.log.debug("Inventory successfully created");

        return inventoryObject;
    };

    // #####################
    // ## Inventory Hosts ##
    // #####################

    /**
     * Defines the getInventoryHosts method.
     * @method
     * @public
     * @param {number} inventoryId - The inventory ID.
     *
     * @returns {Array/Any} The list of inventory hosts.
     */

    AnsibleAutomationPlatformService.prototype.getInventoryHosts = function (
        inventoryId
    ) {
        if ((!inventoryId && inventoryId !== 0) || typeof inventoryId !== "number") {
            throw new ReferenceError(
                "inventoryId is required and must " +
                "be of type 'number'"
            );
        }

        var uri = this.baseUri + "/inventories/" + inventoryId.toString() + "/hosts/?order_by=name";
        var results;

        this.log.debug("Getting list of inventory hosts");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " inventory hosts");

        return results;
    };

    /**
     * Defines the getInventoryHostByName method.
     * @method
     * @public
     * @param {number} inventoryId - The inventory ID.
     * @param {string} hostName - The inventory host name.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     *
     * @returns {Any} The inventory host object.
     */

    AnsibleAutomationPlatformService.prototype.getInventoryHostByName = function (
        inventoryId,
        hostName,
        throwOnNotFound
    ) {
        if ((!inventoryId && inventoryId !== 0) || typeof inventoryId !== "number") {
            throw new ReferenceError(
                "inventoryId is required and must " +
                "be of type 'number'"
            );
        }
        if (!hostName || typeof hostName !== "string") {
            throw new ReferenceError(
                "hostName is required and must " +
                "be of type 'string'"
            );
        }

        this.log.info("Get inventory host with name '" + hostName + "'");
        var resourceType = "inventories/" + inventoryId.toString() + "/hosts";
        var inventoryHostObject = this.getResourceByName(
            hostName,
            resourceType,
            throwOnNotFound
        );

        if (inventoryHostObject) this.log.info("Found inventory host with name '" + hostName + "'");

        return inventoryHostObject;
    };

    return AnsibleAutomationPlatformService;
});