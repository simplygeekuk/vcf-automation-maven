# Class `VCFAutomationDeploymentService`

Module: `com.simplygeek.vcf.automation.deployment`

Extends `VCFAutomationBackend`

Provides an interface to the VCF Automation Deployments API.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |
| apiToken | `string` | The VCF Automation API Token. |

## Methods

### *public* `getDeployments()`

Get a list of deployments.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| statuses | `Array/string` | Results must be associated with one of these statuses. |
| projects | `Array/string` | Results must be associated with one of these project IDs. |
| resourceTypes | `Array/string` | Results must be associated with one of these resourceType Names. |
| cloudAccounts | `Array/string` | Results must be associated with one of these cloud accounts. |
| cloudTypes | `Array/string` | Results must be associated with one of these endpoint Types. |
| requestedBy | `Array/string` | Results must be associated with one of these requesters. |
| ownedBy | `Array/string` | Results must be associated with one of these owners. |
| tags | `Array/string` | Results must be associated with one of these tags. |

**Returns:** `Array/Any` — The list of deployments.

---

### *public* `getDeploymentById()`

Get a deployment by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment id. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The deployment object.

---

### *public* `getDeploymentByName()`

Get a deployment by its name.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentName | `string` | The deployment name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The deployment object.

---

### *public* `updateDeployment()`

Updates a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment id. |
| updatedDeploymentObject | `object` | The deployment object to update. |

**Returns:** `Any` — The updated deployment object.

---

### *public* `deleteDeployment()`

Deletes a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| wait | `boolean` | If true, waits for the action to complete. Default true. |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — The final or initial request object.

---

### *public* `getDeploymentActions()`

Gets available Day-2 actions for a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |

**Returns:** `Array` — The list of available actions.

---

### *public* `getDeploymentActionById()`

Gets a specific Day-2 action by its ID for a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| actionId | `string` | The action ID. |

**Returns:** `object` — The deployment action.

---

### *public* `runDeploymentAction()`

Runs a Day-2 action on a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| actionId | `string` | The action ID. |
| inputs | `object` | Optional inputs. |
| wait | `boolean` | If true, waits for the action to complete. Default true. |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — The final or initial request object.

---

### `getDeploymentRequests()`

Lists all request records for a deployment (Day-1 and Day-2).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |

**Returns:** `Array` — List of request objects.

---

### *public* `getDeploymentResources()`

Lists resources within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |

**Returns:** `Array/Any` — List of resources for the deployment.

---

### *public* `getDeploymentResourceById()`

Gets a specific resource by ID within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| resourceId | `string` | The resource ID. |
| throwOnNotFound | `boolean` | Whether to throw if not found. |

**Returns:** `object|null` — The resource object or null if not found.

---

### *public* `deleteDeploymentResource()`

Deletes a resource within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| resourceId | `string` | The resource ID. |
| wait | `boolean` | If true, waits for the action to complete. Default true. |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — The final or initial request object.

---

### *public* `getDeploymentResourceActions()`

Gets available Day-2 actions for a resource within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| resourceId | `string` | The deployment resource ID. |

**Returns:** `Array` — The list of available actions.

---

### *public* `getDeploymentResourceActionById()`

Gets a specific Day-2 action by its ID for a resource within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| resourceId | `string` | The deployment resource ID. |
| actionId | `string` | The action ID. |

**Returns:** `object` — The deployment action.

---

### *public* `runDeploymentResourceAction()`

Runs a Day-2 action on a resource within a deployment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| deploymentId | `string` | The deployment ID. |
| resourceId | `string` | The deployment resource ID. |
| actionId | `string` | The action ID. |
| inputs | `object` | Optional inputs. |
| wait | `boolean` | If true, waits for the action to complete. Default true. |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — The final or initial request object.

---

### *public* `getResourceTypes()`

Get all resource types.

**Returns:** `Array` — The list of available resource types.

---

### *public* `getResourceTypeById()`

Gets a specific resource-type by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceTypeId | `string` | The resource-type ID. |

**Returns:** `object` — The resource-type.

---

### *public* `getResources()`

Get a list of resources.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projects | `Array/string` | Results must be associated with one of these project IDs. |
| resourceTypes | `Array/string` | Results must be associated with one of these resourceType Names. |
| cloudAccounts | `Array/string` | Results must be associated with one of these cloud accounts. |
| cloudTypes | `Array/string` | Results must be associated with one of these endpoint Types. |
| tags | `Array/string` | Results must be associated with one of these tags. |
| syncStatuses | `Array/string` | Results must be associated with one of these SyncStatuses. |
| isManaged | `boolean` | If true, return only resources that are managed. |

**Returns:** `Array/Any` — The list of managed resources.

---

### *public* `getResourceById()`

Get a resource by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The resource object.

---

### *public* `getResourceActions()`

Gets available Day-2 actions for a resource.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource ID. |

**Returns:** `Array` — The list of available actions.

---

### *public* `getResourceActionById()`

Gets a specific Day-2 action by its ID for a resource.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource ID. |
| actionId | `string` | The action ID. |

**Returns:** `object` — The resource action.

---

### *public* `runResourceAction()`

Runs a Day-2 action on a resource.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource ID. |
| actionId | `string` | The action ID. |
| inputs | `object` | Optional inputs. |
| wait | `boolean` | If true, waits for the action to complete. Default true. |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — The final or initial request object.

---

### `getResourceRequests()`

Lists all request records for a resource (Day-1 and Day-2).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource ID. |

**Returns:** `Array` — List of request objects.

---

### *public* `pollRequestStatus()`

Polls the status of a deployment or resource action request until complete.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| requestId | `string` | The request ID (from an action). |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — Final request object.

---