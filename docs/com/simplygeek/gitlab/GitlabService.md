# Class `GitlabService`

Module: `com.simplygeek.gitlab`

Defines the GitlabService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The Gitlab HTTP REST host. |
| accessToken | `string` | Personal Access Token for authentication. |

## Methods

### *public* `getGroups()`

Defines the getGroups method.

**Returns:** `Array/Any` — The list of Groups.

---

### *public* `getGroupById()`

Defines the getGroupById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The group object.

---

### *public* `getGroupByName()`

Defines the getGroupByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupName | `string` | The group name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The group object.

---

### *public* `createGroup()`

Defines the createGroup method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupSpecification | `Any` | The group specification. |

**Returns:** `Any` — The new group object.

---

### *public* `deleteGroup()`

Defines the deleteGroup method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group ID. |
| permamentlyRemove | `boolean` | The group ID. |
| fullPath | `string` | The group ID. |

---

### *public* `restoreGroup()`

Defines the restoreGroup method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group ID. |

---

### *public* `getSamlGroupLink()`

Defines the getSamlGroupLink method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| samlGroupName | `string` | Name of the SAML group. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The SAML group object.

---

### *public* `createSamlGroupLink()`

Defines the createSamlGroupLink method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| samlGroupLinkSpecification | `Any` | The SAML group spec. |

**Returns:** `Any` — The SAML group link object.

---

### *public* `getGroupAccessTokens()`

Defines the getGroupAccessTokens method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |

**Returns:** `Array/Any` — The list of group access tokens.

---

### *public* `getGroupAccessTokenById()`

Defines the getGroupAccessTokenById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| accessTokenId | `number` | The Access Token id. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The access token object.

---

### *public* `getAccessTokenByName()`

Defines the getAccessTokenByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| accessTokenName | `string` | The access token name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The access token object.

---

### *public* `createGroupAccessToken()`

Defines the createGroupAccessToken method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| accessTokenSpecification | `Any` | The Access Token spec. |

**Returns:** `Any` — The group access token object.

---

### *public* `rotateGroupAccessToken()`

Defines the rotateGroupAccessToken method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| accessTokenId | `number` | The group access token id. |
| expiresAt | `Date` | Expiration date of the access token in ISO format (YYYY-MM-DD). |

**Returns:** `Any` — The group access token object.

---

### *public* `revokeGroupAccessToken()`

Defines the revokeGroupAccessToken method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupId | `number` | The group id. |
| accessTokenId | `number` | The group access token id. |

---

### *public* `getProjects()`

Defines the getProjects method.

**Returns:** `Array/Any` — The list of Projects.

---

### *public* `getProjectById()`

Defines the getProjectById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `number` | The project id. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The project object.

---

### *public* `getProjectByName()`

Defines the getProjectByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectName | `number` | The project name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The project object.

---

### *public* `createProject()`

Defines the createProject method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectSpecification | `Any` | The Project spec. |

**Returns:** `Any` — The project object.

---

### *public* `updateProject()`

Defines the updateProject method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `number` | The Project id. |
| projectSpecification | `Any` | The updated Project spec. |

**Returns:** `Any` — The updated project object.

---

### *public* `getResourceById()`

Defines the getResourceById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceId | `string` | The resource id. |
| resource | `string` | The resource URI. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The resource object.

---

### *public* `getResourceByName()`

Defines the getResourceByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| resourceName | `string` | The resource name. |
| resource | `string` | The resource URI. |
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