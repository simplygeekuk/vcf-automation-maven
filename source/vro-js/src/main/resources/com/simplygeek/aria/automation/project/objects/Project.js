/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Project class.
     * @class
     * @param {string} name - The project name.
     * @param {string} [description] - The project description.
     * @param {Array/Any} [administrators] - List of administrator users associated with the project.
     * @param {Array/Any} [members] - List of member users associated with the project.
     * @param {Array/Any} [viewers] - List of viewer users associated with the project.
     * @param {Array/Any} [supervisors] - List of supervisor users associated with the project.
     * @param {Any} [networkConstraints] - List of network constraints of the project.
     * @param {Any} [storageConstraints] - List of storage constraints of the project.
     * @param {Any} [extensibilityConstraints] - List of extensibility constraints of the project.
     * @param {Any} [properties] - List of properties of the project.
     * @param {Array/Any} [tags] - List of tags that apply to all resources under the project.
     * @param {Any} [cost] - A representation of a project cost.
     * @param {Array/Any} [zones] - List of zones to assign to the project.
     * @param {number} [operationTimeout] - The timeout that should be used for Blueprint operations
     *                                      and Provisioning tasks.
     * @param {boolean} [sharedResources] - Whether the resources in this project are shared or not.
     *
     * @returns {Any} Returns an instance of the Project Class.
     */

    function Project (
        name,
        description,
        administrators,
        members,
        viewers,
        supervisors,
        networkConstraints,
        storageConstraints,
        extensibilityConstraints,
        properties,
        tags,
        cost,
        zones,
        operationTimeout,
        sharedResources
    ) {
        // Mandatory parameters, defaults and type checking.
        if (!name || typeof name !== "string") {
            throw new ReferenceError(
                "name is required and must " +
                "be of type 'string'"
            );
        }
        if (description && typeof description !== "string") {
            throw new ReferenceError(
                "description must be of type 'string'"
            );
        }
        if (administrators && !Array.isArray(administrators)) {
            throw new TypeError("administrators not of type 'Array/object'");
        } else if (administrators && administrators.length > 0) {
            administrators.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("administrators not of type 'Array/object'");
                    }
                }
            );
        }
        if (members && !Array.isArray(members)) {
            throw new TypeError("members not of type 'Array/object'");
        } else if (members && members.length > 0) {
            members.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("members not of type 'Array/object'");
                    }
                }
            );
        }
        if (viewers && !Array.isArray(viewers)) {
            throw new TypeError("viewers not of type 'Array/object'");
        } else if (viewers && viewers.length > 0) {
            viewers.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("viewers not of type 'Array/object'");
                    }
                }
            );
        }
        if (supervisors && !Array.isArray(supervisors)) {
            throw new TypeError("supervisors not of type 'Array/object'");
        } else if (supervisors && supervisors.length > 0) {
            supervisors.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("supervisors not of type 'Array/object'");
                    }
                }
            );
        }
        if (networkConstraints && typeof networkConstraints !== "object") {
            throw new ReferenceError(
                "networkConstraints must be of type 'object'"
            );
        }
        if (storageConstraints && typeof storageConstraints !== "object") {
            throw new ReferenceError(
                "storageConstraints must be of type 'object'"
            );
        }
        if (extensibilityConstraints && typeof extensibilityConstraints !== "object") {
            throw new ReferenceError(
                "constraints must be of type 'object'"
            );
        }
        if (properties && typeof properties !== "object") {
            throw new ReferenceError(
                "properties must be of type 'object'"
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
        if (cost && !Array.isArray(cost)) {
            throw new TypeError("cost not of type 'Array/object'");
        } else if (cost && cost.length > 0) {
            cost.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("cost not of type 'Array/object'");
                    }
                }
            );
        }
        if (zones && !Array.isArray(zones)) {
            throw new TypeError("zones not of type 'Array/object'");
        } else if (zones && zones.length > 0) {
            zones.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("zones not of type 'Array/object'");
                    }
                }
            );
        }
        if (operationTimeout && typeof operationTimeout !== "string") {
            throw new ReferenceError(
                "operationTimeout must be of type 'string'"
            );
        }

        // Default sharedResources to false, unless explicitly set to true.
        sharedResources = sharedResources === true;

        // Construct Object
        this.name = name;
        if (description) this.description = description;
        if (administrators) this.administrators = administrators;
        if (members) this.members = members;
        if (viewers) this.viewers = viewers;
        if (supervisors) this.supervisors = supervisors;
        if (networkConstraints || storageConstraints || extensibilityConstraints) this.constraints = {};
        if (networkConstraints) this.constraints.network = networkConstraints;
        if (storageConstraints) this.constraints.storage = storageConstraints;
        if (extensibilityConstraints) this.constraints.extensibility = extensibilityConstraints;
        if (properties) this.properties = properties;
        if (tags) this.tags = tags;
        if (zones) this.zones = zones;
        if (cost) this.cost = cost;
        this.operationTimeout = (operationTimeout || operationTimeout === 0) ? operationTimeout : 0;
        this.sharedResources = sharedResources;
    }

    return Project;
});