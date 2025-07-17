# Class `VCFAutomationCatalogService`

Module: `com.simplygeek.vcf.automation.catalog`

Extends `VCFAutomationBackend`

Defines the VCFAutomationCatalogService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation REST host. |
| apiToken | `string` | The API token for authentication. |

## Methods

### *public* `getCatalogItemTypes()`

Get all catalog item types.

**Returns:** `Array` — Catalog item types.

---

### *public* `getCatalogItemTypeById()`

Get a specific catalog item type by ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| typeId | `string` | Catalog item type ID. |

**Returns:** `object` — Catalog item type.

---

### *public* `getCatalogItems()`

Get all catalog items.

**Returns:** `Array` — List of catalog items.

---

### *public* `getCatalogItemById()`

Get catalog item by ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |

**Returns:** `object` — Catalog item.

---

### *public* `getCatalogItemDataElement()`

Get catalog item data element.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |
| dataElementType | `string` | Type of data element (e.g., "inputSchema"). |
| dataElementId | `string` | Specific element ID. |

**Returns:** `object` — Data element object.

---

### *public* `requestCatalogItemDeployment()`

Request a deployment for a catalog item.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |
| payload | `object` | Request body (inputs, projectId, etc.). |

**Returns:** `object` — Request result.

---

### *public* `createUpfrontPriceRequest()`

Submit a request to calculate upfront price for a catalog item.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |
| payload | `object` | Payload with pricing context. |

**Returns:** `object` — Upfront price request response.

---

### *public* `getUpfrontPriceResult()`

Get the result of a previously submitted upfront pricing request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |
| upfrontPriceId | `string` | The price request ID. |

**Returns:** `object` — Pricing result.

---

### *public* `getCatalogItemVersions()`

Get all versions of a catalog item.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |

**Returns:** `Array` — List of versions.

---

### *public* `getCatalogItemVersionById()`

Get a specific version of a catalog item.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| itemId | `string` | Catalog item ID. |
| versionId | `string` | Catalog item version ID. |

**Returns:** `object` — Version object.

---

### *public* `getCatalogSources()`

Get all catalog sources.

**Returns:** `Array` — Catalog sources.

---

### *public* `getCatalogSourceById()`

Get a catalog source by ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| sourceId | `string` | Source ID. |

**Returns:** `object` — Catalog source.

---

### *public* `upsertCatalogSource()`

Create or update a catalog source.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| sourcePayload | `object` | Payload defining the source. |

**Returns:** `object` — Created/updated catalog source.

---

### *public* `deleteCatalogSourceById()`

Delete a catalog source by ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| sourceId | `string` | Source ID. |

---

### *public* `getSourceLimitUsage()`

Returns content source usage metrics.

**Returns:** `object` — Usage metrics.

---