# Class `AnsibleAutomationBackendService`

Module: `com.simplygeek.ansible`

Extends `HttpRestClient`

Defines the AnsibleAutomationBackendService class.

## Methods

### *public* `getResourceById()`

Defines the getResourceById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `number` | The resource ID. |
| resourceType | `string` | The resource type. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The resource object.

---

### *public* `getResourceByName()`

Defines the getResourceByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceName | `string` | The resource name. |
| resourceType | `string` | The resource type. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The resource object.

---

### *private* `get()`

Defines the GET method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any||Array/Any` — The response result or results.

---

### *private* `post()`

Defines the POST method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `Any` | The request content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any` — The response content object.

---

### `put()`

Defines the PUT method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `Any` | The request content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any` — The response content object.

---

### `patch()`

Defines the PATCH method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `Any` | The request content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any` — The response content object.

---

### `delete()`

Defines the DELETE method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

---