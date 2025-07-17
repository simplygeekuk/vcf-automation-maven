/**
 * Provides access to Aria Automation Catalog Item Types, Items, and Sources.
 * @returns {Any} An instance of VCFAutomationCatalogService.
 */
(function () {
    /**
     * Defines the VCFAutomationCatalogService class.
     * @class
     * @param {REST:RESTHost} restHost - The VCF Automation REST host.
     * @param {string} apiToken - The API token for authentication.
     * @returns {Any} Instance of VCFAutomationCatalogService.
     */
    function VCFAutomationCatalogService(restHost, apiToken) {
        if (!restHost || System.getObjectType(restHost) !== "REST:RESTHost") {
            throw new ReferenceError(
                "restHost must be of type 'REST:RESTHost'"
            );
        }

        if (!apiToken || typeof apiToken !== "string") {
            throw new ReferenceError("apiToken must be a string");
        }

        this.restHost = restHost;
        VCFAutomationBackend.call(this);

        this.log = new (System.getModule(
            "com.simplygeek.vcf.orchestrator.logging"
        ).Logger())("Action", "VCFAutomationCatalogService");

        this.baseUri = "/catalog/api";
        this.createAuthenticatedSession(apiToken);
    }

    var VCFAutomationBackend = System.getModule(
        "com.simplygeek.vcf.automation"
    ).VCFAutomationBackend();

    VCFAutomationCatalogService.prototype = Object.create(
        VCFAutomationBackend.prototype
    );

    VCFAutomationCatalogService.prototype.constructor =
        VCFAutomationCatalogService;

    // ─────────────────────────────────────────────────────────────────────────────
    // Catalog Item Types
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get all catalog item types.
     * @function
     * @public
     * @returns {Array} Catalog item types.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemTypes = function () {
        return this.get(this.baseUri + "/types");
    };

    /**
     * Get a specific catalog item type by ID.
     * @function
     * @public
     * @param {string} typeId - Catalog item type ID.
     * @returns {object} Catalog item type.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemTypeById = function (
        typeId
    ) {
        if (!typeId || typeof typeId !== "string") {
            throw new ReferenceError("typeId must be a string");
        }

        return this.get(this.baseUri + "/types/" + typeId);
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Catalog Items
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get all catalog items.
     * @function
     * @public
     * @returns {Array} List of catalog items.
     */
    VCFAutomationCatalogService.prototype.getCatalogItems = function () {
        return this.get(this.baseUri + "/items");
    };

    /**
     * Get catalog item by ID.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @returns {object} Catalog item.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemById = function (
        itemId
    ) {
        if (!itemId || typeof itemId !== "string") {
            throw new ReferenceError("itemId must be a string");
        }

        return this.get(this.baseUri + "/items/" + itemId);
    };

    /**
     * Get catalog item data element.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @param {string} dataElementType - Type of data element (e.g., "inputSchema").
     * @param {string} dataElementId - Specific element ID.
     * @returns {object} Data element object.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemDataElement = function (
        itemId,
        dataElementType,
        dataElementId
    ) {
        if (
            !itemId ||
            typeof itemId !== "string" ||
            !dataElementType ||
            typeof dataElementType !== "string" ||
            !dataElementId ||
            typeof dataElementId !== "string"
        ) {
            throw new ReferenceError("All parameters must be strings");
        }

        var uri =
            this.baseUri +
            "/items/" +
            itemId +
            "/data/" +
            dataElementType +
            "/" +
            dataElementId;

        return this.get(uri);
    };

    /**
     * Request a deployment for a catalog item.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @param {object} payload - Request body (inputs, projectId, etc.).
     * @returns {object} Request result.
     */
    VCFAutomationCatalogService.prototype.requestCatalogItemDeployment =
        function (itemId, payload) {
            if (!itemId || typeof itemId !== "string") {
                throw new ReferenceError("itemId must be a string");
            }

            if (!payload || typeof payload !== "object") {
                throw new ReferenceError("payload must be an object");
            }

            return this.post(
                this.baseUri + "/items/" + itemId + "/request",
                payload
            );
        };

    /**
     * Submit a request to calculate upfront price for a catalog item.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @param {object} payload - Payload with pricing context.
     * @returns {object} Upfront price request response.
     */
    VCFAutomationCatalogService.prototype.createUpfrontPriceRequest = function (
        itemId,
        payload
    ) {
        if (!itemId || typeof itemId !== "string") {
            throw new ReferenceError("itemId must be a string");
        }

        if (!payload || typeof payload !== "object") {
            throw new ReferenceError("payload must be an object");
        }

        return this.post(
            this.baseUri + "/items/" + itemId + "/upfront-prices",
            payload
        );
    };

    /**
     * Get the result of a previously submitted upfront pricing request.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @param {string} upfrontPriceId - The price request ID.
     * @returns {object} Pricing result.
     */
    VCFAutomationCatalogService.prototype.getUpfrontPriceResult = function (
        itemId,
        upfrontPriceId
    ) {
        if (
            !itemId ||
            typeof itemId !== "string" ||
            !upfrontPriceId ||
            typeof upfrontPriceId !== "string"
        ) {
            throw new ReferenceError(
                "itemId and upfrontPriceId must be strings"
            );
        }

        return this.get(
            this.baseUri +
                "/items/" +
                itemId +
                "/upfront-prices/" +
                upfrontPriceId
        );
    };

    /**
     * Get all versions of a catalog item.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @returns {Array} List of versions.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemVersions = function (
        itemId
    ) {
        if (!itemId || typeof itemId !== "string") {
            throw new ReferenceError("itemId must be a string");
        }

        return this.get(this.baseUri + "/items/" + itemId + "/versions");
    };

    /**
     * Get a specific version of a catalog item.
     * @function
     * @public
     * @param {string} itemId - Catalog item ID.
     * @param {string} versionId - Catalog item version ID.
     * @returns {object} Version object.
     */
    VCFAutomationCatalogService.prototype.getCatalogItemVersionById = function (
        itemId,
        versionId
    ) {
        if (
            !itemId ||
            typeof itemId !== "string" ||
            !versionId ||
            typeof versionId !== "string"
        ) {
            throw new ReferenceError("itemId and versionId must be strings");
        }

        return this.get(
            this.baseUri + "/items/" + itemId + "/versions/" + versionId
        );
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Catalog Sources (Admin)
    // ─────────────────────────────────────────────────────────────────────────────

    /**
     * Get all catalog sources.
     * @function
     * @public
     * @returns {Array} Catalog sources.
     */
    VCFAutomationCatalogService.prototype.getCatalogSources = function () {
        return this.get(this.baseUri + "/admin/sources");
    };

    /**
     * Get a catalog source by ID.
     * @function
     * @public
     * @param {string} sourceId - Source ID.
     * @returns {object} Catalog source.
     */
    VCFAutomationCatalogService.prototype.getCatalogSourceById = function (
        sourceId
    ) {
        if (!sourceId || typeof sourceId !== "string") {
            throw new ReferenceError("sourceId must be a string");
        }

        return this.get(this.baseUri + "/admin/sources/" + sourceId);
    };

    /**
     * Create or update a catalog source.
     * @function
     * @public
     * @param {object} sourcePayload - Payload defining the source.
     * @returns {object} Created/updated catalog source.
     */
    VCFAutomationCatalogService.prototype.upsertCatalogSource = function (
        sourcePayload
    ) {
        if (!sourcePayload || typeof sourcePayload !== "object") {
            throw new ReferenceError("sourcePayload must be an object");
        }

        return this.post(this.baseUri + "/admin/sources", sourcePayload);
    };

    /**
     * Delete a catalog source by ID.
     * @function
     * @public
     * @param {string} sourceId - Source ID.
     * @returns {void}
     */
    VCFAutomationCatalogService.prototype.deleteCatalogSourceById = function (
        sourceId
    ) {
        if (!sourceId || typeof sourceId !== "string") {
            throw new ReferenceError("sourceId must be a string");
        }

        return this.delete(this.baseUri + "/admin/sources/" + sourceId);
    };

    /**
     * Returns content source usage metrics.
     * @function
     * @public
     * @returns {object} Usage metrics.
     */
    VCFAutomationCatalogService.prototype.getSourceLimitUsage = function () {
        return this.get(this.baseUri + "/admin/sources/limit-usage");
    };

    return VCFAutomationCatalogService;
});
