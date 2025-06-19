/**
 * Provides an interface to the VCF Automation Policy API.
 * Supports operations on policies, policy types, and policy decision history.
 * @returns {Any} An instance of the VCFAutomationPolicyService class.
 */
(function () {
    /**
     * Defines the VCFAutomationPolicyService class.
     * @class
     * @param {REST:RESTHost} restHost - The VCF Automation HTTP REST host.
     * @param {string} apiToken - The VCF Automation API token.
     * @returns {Any} An instance of the VCFAutomationPolicyService class.
     */
    function VCFAutomationPolicyService(restHost, apiToken) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError("restHost must be of type 'REST:RESTHost'");
        }
        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError("apiToken must be a string");
        }

        this.restHost = restHost;
        VCFAutomationBackend.call(this);

        this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
            "Action",
            "VCFAutomationPolicyService"
        );

        this.baseUri = "/policy/api";
        this.createAuthenticatedSession(apiToken);
    }

    var VCFAutomationBackend = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationBackend();

    VCFAutomationPolicyService.prototype = Object.create(
        VCFAutomationBackend.prototype
    );
    VCFAutomationPolicyService.prototype.constructor = VCFAutomationPolicyService;

    // ─────────────────────────────────────────────────────────────────────────────
    // /policies
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * get a list of all policies.
     * @function
     * @public
     * @returns {Array} List of policy objects.
     */
    VCFAutomationPolicyService.prototype.getPolicies = function () {
        var uri = this.baseUri + "/policies?expandDefinition=true";
        var results;

        this.log.debug("Getting a list of policies");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " Projects");

        return results;
    };

    /**
     * Get a policy by its ID.
     * @function
     * @public
     * @param {string} policyId - The policy ID.
     * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no results found.
     * @returns {object} The policy object.
     */
    VCFAutomationPolicyService.prototype.getPolicyById = function (
        policyId,
        throwOnNotFound
    ) {
        if (!policyId || typeof policyId !== "string") {
            throw new ReferenceError(
                "policyId is required and must " +
                "be of type 'string'"
            );
        }

        // Default throwOnNotFound to true
        throwOnNotFound = throwOnNotFound !== false;

        var uri = this.baseUri + "/policies/" + policyId;
        var policyObject;

        this.log.debug("Getting policy with ID " + policyId);
        policyObject = this.get(uri, [200, 404]);

        if (policyObject) {
            var projectName = policyObject.name;

            this.log.debug(
                "Found policy with name '" + projectName +
                "' and id '" + policyId + "'"
            );
        } else {
            if (throwOnNotFound) {
                throw new Error(
                    "Policy with ID '" + policyId + "' not found"
                );
            } else {
                this.log.warn(
                    "Policy with ID '" + policyId + "' not found"
                );
            }
        }

        return policyObject;

    };

    /**
     * Creates a new policy.
     * @function
     * @public
     * @param {object} policySpecification - The policy specification.
     * @returns {object} The created policy.
     */
    VCFAutomationPolicyService.prototype.createPolicy = function (
        policySpecification
    ) {
        if (!policySpecification || typeof policySpecification !== "object") {
            throw new ReferenceError(
                "policySpecification is required and must " +
                "be of type 'object'"
            );
        }

        var uri = this.baseUri + "/policies";
        var policy;

        this.log.debug("Creating policy '" + policySpecification.name + "'");
        policy = this.post(uri, policySpecification);
        this.log.debug("Policy successfully created");

        return policy;
    };

    /**
     * Deletes a policy by its ID.
     * @function
     * @public
     * @param {string} policyId - The policy ID.
     * @returns {void}
     */
    VCFAutomationPolicyService.prototype.deletePolicy = function (
        policyId
    ) {
        if (!policyId || typeof policyId !== "string") {
            throw new ReferenceError(
                "policyId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/policies/" + policyId;

        this.log.debug("Deleting policy with ID " + policyId);
        this.delete(uri);
        this.log.debug("Policy successfully deleted");
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // /policyTypes
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get a list of policy types.
     * @function
     * @public
     * @returns {Array} List of policy type definitions.
     */
    VCFAutomationPolicyService.prototype.getPolicyTypes = function () {
        var uri = this.baseUri + "/policyTypes";
        var results;

        this.log.debug("Getting a list of policy types");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " policy types");

        return results;
    };

    /**
     * Get a policy type by its ID.
     * @function
     * @public
     * @param {string} policyTypeId - The policy type ID.
     * @returns {object} The policy type object.
     */
    VCFAutomationPolicyService.prototype.getPolicyTypeById = function (
        policyTypeId
    ) {
        if (!policyTypeId || typeof policyTypeId !== "string") {
            throw new ReferenceError(
                "policyTypeId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/policyTypes/" + policyTypeId;
        var policyType;

        this.log.debug("Getting policy type with ID " + policyTypeId);
        policyType = this.get(uri, [200, 404]);

        if (policyType) {
            var policyTypeName = policyType.name;

            this.log.debug(
                "Found policy type with name '" + policyTypeName +
                "' and id '" + policyTypeId + "'"
            );
        } else {
            throw new Error(
                "Policy type with ID '" + policyTypeId + "' not found"
            );
        }

        return policyType;
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // /policyDecisions
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get a list of policy decision logs.
     * @function
     * @public
     * @param {string} [projectId] - Optional project ID to filter decisions.
     * @param {string} [policyTypeId] - Optional policy type ID to filter decisions.
     * @returns {Array} List of policy decision records.
     */
    VCFAutomationPolicyService.prototype.getPolicyDecisions = function (
        projectId,
        policyTypeId
    ) {
        if (!projectId || typeof projectId !== "string") {
            throw new ReferenceError(
                "projectId is required and must " +
                "be of type 'string'"
            );
        }
        if (!policyTypeId || typeof policyTypeId !== "string") {
            throw new ReferenceError(
                "policyTypeId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/policyDecisions";
        var query = [];
        var results;

        if (projectId) {
            query.push("projectId=" + projectId);
        }
        if (policyTypeId) {
            query.push("policyTypeId=" + policyTypeId);
        }

        if (query.length > 0) {
            uri += "?" + query.join("&");
        }

        this.log.debug("Getting a list of policy decisions");
        results = this.get(uri);
        this.log.debug("Found " + results.length + " policy decisions");

        return results;
    };

    /**
     * Get a policy decision by its ID.
     * @function
     * @public
     * @param {string} policyDecisionId - The policy decision ID.
     * @returns {object} The policy decision object.
     */
    VCFAutomationPolicyService.prototype.getPolicyTypeById = function (
        policyDecisionId
    ) {
        if (!policyDecisionId || typeof policyDecisionId !== "string") {
            throw new ReferenceError(
                "policyDecisionId is required and must " +
                "be of type 'string'"
            );
        }

        var uri = this.baseUri + "/policyDecisions/" + policyDecisionId;
        var policyDecision;

        this.log.debug("Getting policy decision with ID " + policyDecisionId);
        policyDecision = this.get(uri, [200, 404]);

        if (policyDecision) {
            var policyDecisionType = policyDecision.typeId;

            this.log.debug(
                "Found policy decision with type '" + policyDecisionType +
                "' and id '" + policyDecisionId + "'"
            );
        } else {
            throw new Error(
                "Policy decision with ID '" + policyDecisionId + "' not found"
            );
        }

        return policyDecision;
    };

    return VCFAutomationPolicyService;
});