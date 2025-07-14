# Class `InfobloxBackendService`

Module: `com.simplygeek.infoblox`

Defines the InfobloxBackendService class.

## Methods

### *private* `get()`

Defines the GET method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any||Array/Any` — The response result or results.

---

### `post()`

Defines the POST method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `string` | The request content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any` — The response content object.

---

### `put()`

Defines the PUT method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `string` | The request content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |

**Returns:** `Any` — The response content object.

---

### `patch()`

Defines the PATCH method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| content | `string` | The request content. |
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