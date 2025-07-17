# Class `VCFAutomationPolicyService`

Module: `com.simplygeek.vcf.automation.policy`

Extends `VCFAutomationBackend`

Defines the VCFAutomationPolicyService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |
| apiToken | `string` | The VCF Automation API token. |

## Methods

### *public* `getPolicies()`

get a list of all policies.

**Returns:** `Array` — List of policy objects.

---

### *public* `getPolicyById()`

Get a policy by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| policyId | `string` | The policy ID. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `object` — The policy object.

---

### *public* `createPolicy()`

Creates a new policy.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| policySpecification | `object` | The policy specification. |

**Returns:** `object` — The created policy.

---

### *public* `deletePolicy()`

Deletes a policy by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| policyId | `string` | The policy ID. |

---

### *public* `getPolicyTypes()`

Get a list of policy types.

**Returns:** `Array` — List of policy type definitions.

---

### *public* `getPolicyTypeById()`

Get a policy type by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| policyTypeId | `string` | The policy type ID. |

**Returns:** `object` — The policy type object.

---

### *public* `getPolicyDecisions()`

Get a list of policy decision logs.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | Optional project ID to filter decisions. |
| policyTypeId | `string` | Optional policy type ID to filter decisions. |

**Returns:** `Array` — List of policy decision records.

---

### *public* `getPolicyTypeById()`

Get a policy decision by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| policyDecisionId | `string` | The policy decision ID. |

**Returns:** `object` — The policy decision object.

---