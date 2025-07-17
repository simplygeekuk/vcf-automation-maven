# Class `HttpRestClient`

Module: `com.simplygeek.rest`

Defines the HttpRestClient class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The HTTP REST host. |
| retryMaxAttempts | `number` | The maximum number attempts to retry a failed request. |
| retryDelay | `number` | The delay (in seconds) between retry attempts. |
| retryOn500 | `boolean` | Should retry the request if HTTP Status 500 is received. |

## Methods

### *public* `httpGet()`

Defines the httpGet method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *public* `httpPost()`

Defines the httpPost method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| content | `Any` | The request content. |
| contentType | `string` | The encoding for content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *public* `httpPut()`

Defines the httpPut method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| content | `Any` | The request content. |
| contentType | `string` | The encoding for content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *public* `httpPatch()`

Defines the httpPatch method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| content | `Any` | The request content. |
| contentType | `string` | The encoding for content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *public* `httpDelete()`

Defines the httpDelete method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *public* `httpHead()`

Defines the httpHead method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *private* `invokeRequest()`

A method that invokes the request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restMethod | `string` | The request method. |
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| content | `Any` | The request content. |
| contentType | `string` | The encoding for content. |
| expectedResponseCodes | `Array/number` | A list of expected response codes. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### *private* `createRequest()`

A function that creates the request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restMethod | `string` | The request method. |
| uri | `string` | The request uri. |
| acceptType | `string` | The encoding format to accept. |
| content | `Any` | The request content. |
| contentType | `string` | The encoding for content. |
| headers | `Properties` | A key/value set of headers to include in the request. |

**Returns:** `Any` — The request response object.

---

### `setHeaders()`

function that sets the request headers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| headers | `Properties` | A key/value set of headers to include in the request. |

---

### *private* `xwwwformurlencoder()`

A function that converts a JSON body to a form-url-encoded string

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| content | `Any` | The request content. |

**Returns:** `string` — The form url encoded string.

---