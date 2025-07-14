# Class `AnsibleAutomationPlatformService`

Module: `com.simplygeek.ansible`

Extends `AnsibleAutomationBackendService`

Defines the AnsibleAutomationPlatformService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The AAP HTTP REST host. |
| username | `string` | The basic auth username. |
| password | `string` | The basic auth password. |

## Methods

### *public* `createSession()`

Defines the createSession method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| applicationId | `number` | The Ansible Application ID. |
| scope | `string` | The authorization scope. |

**Returns:** `Any` — The request response object.

---

### *public* `closeSession()`

Defines the closeSession method.

---

### *public* `getApplicationById()`

Defines the getApplicationById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| applicationId | `number` | The application ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The application object.

---

### *public* `getApplicationByName()`

Defines the getApplicationByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| applicationName | `number` | The application name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The application object.

---

### *public* `getOrganizations()`

Defines the getOrganizations method.

**Returns:** `Array/Any` — The list of organizations.

---

### *public* `getOrganizationById()`

Defines the getOrganizationById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| organizationId | `number` | The organization ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The organization object.

---

### *public* `getOrganizationByName()`

Defines the getOrganizationByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| organizationName | `string` | The organization name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The organization object.

---

### *public* `getCredentials()`

Defines the getCredentials method.

**Returns:** `Array/Any` — The list of credentials.

---

### *public* `getCredentialById()`

Defines the getCredentialById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialId | `number` | The credential ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The credential object.

---

### *public* `getCredentialByName()`

Defines the getCredentialByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialName | `string` | The credential name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The credential object.

---

### *public* `createCredential()`

Defines the createCredential method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialSpecification | `Any` | The credential specification. |

**Returns:** `Any` — The new credential object.

---

### *public* `updateCredential()`

Defines the updateCredential method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialId | `number` | The credential ID. |
| credentialSpecification | `Any` | The credential specification. |

**Returns:** `Any` — The updated credential object.

---

### *public* `getCredentialTypes()`

Defines the getCredentialTypes method.

**Returns:** `Array/Any` — The list of credential types.

---

### *public* `getCredentialTypeById()`

Defines the getCredentialTypeById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialTypeId | `number` | The credential type ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The credential type object.

---

### *public* `getCredentialTypeByName()`

Defines the getCredentialTypeByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| credentialTypeName | `string` | The credential type name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The credential type object.

---

### *public* `getTeams()`

Defines the getTeams method.

**Returns:** `Array/Any` — The list of teams.

---

### *public* `getTeamById()`

Defines the getTeamById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| teamId | `number` | The team ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The team object.

---

### *public* `getTeamByName()`

Defines the getTeamByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| teamName | `string` | The team name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The team object.

---

### *public* `createTeam()`

Defines the createTeam method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| teamSpecification | `Any` | The team specification. |

**Returns:** `Any` — The new team object.

---

### *public* `assignRoleToTeam()`

Defines the assignRoleToTeam method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| teamId | `number` | The team ID. |
| roleId | `number` | The role ID. |

**Returns:** `Any` — The role object.

---

### *public* `getRoles()`

Defines the getRoles method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| roleName | `name` | filter by role name. |
| resourceType | `name` | filter by resource type. |
| resourceName | `name` | filter by resource name. |

**Returns:** `Array/Any` — The response results.

---

### *public* `getRoleById()`

Defines the getRoleById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| roleId | `number` | The Role ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The role object.

---

### *public* `getInventories()`

Defines the getInventories method.

**Returns:** `Array/Any` — The list of inventories.

---

### *public* `getInventoryById()`

Defines the getInventoryById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| inventoryId | `number` | The inventory ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The inventory object.

---

### *public* `getInventoryByName()`

Defines the getInventoryByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| inventoryName | `string` | The inventory name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The inventory object.

---

### *public* `createInventory()`

Defines the createInventory method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| inventorySpecification | `Any` | The inventory specification. |

**Returns:** `Any` — The new inventory object.

---

### *public* `getInventoryHosts()`

Defines the getInventoryHosts method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| inventoryId | `number` | The inventory ID. |

**Returns:** `Array/Any` — The list of inventory hosts.

---

### *public* `getInventoryHostByName()`

Defines the getInventoryHostByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| inventoryId | `number` | The inventory ID. |
| hostName | `string` | The inventory host name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The inventory host object.

---