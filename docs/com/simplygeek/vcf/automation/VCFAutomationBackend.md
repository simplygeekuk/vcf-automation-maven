# Class `VCFAutomationBackend`

Module: `com.simplygeek.vcf.automation`

Extends `VCFAutomationAuthenticationService`

Defines The VCFAutomationBackend class.

## Methods

### `about()`

Defines the about method.

**Returns:** `Any` — The API About object.

---

### `iaasAbout()`

Defines the IaaS about method.

**Returns:** `Any` — The API About object.

---

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