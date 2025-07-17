# Class `VCFAutomationIaasService`

Module: `com.simplygeek.vcf.automation.iaas`

Extends `VCFAutomationBackend`

Defines the VCFAutomationIaasService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |
| apiToken | `string` | The VCF Automation API Token. |

## Methods

### *public* `getMachineDisks()`

Defines the getMachineDisks method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| machineId | `string` | The machine id. |

**Returns:** `Any` — The machine disks object.

---

### *public* `getProjectZones()`

Get a list of cloud zones assigned to a project.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The project id. |

**Returns:** `Any` — The project zones.

---

### *public* `updateProjectZones()`

Get a list of cloud zones assigned to a project.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The project id. |
| projectZones | `Array/Any` | The cloud zones to assign to the project, or blank to remove all zones. |

**Returns:** `Any` — The updated project zones.

---

### *public* `pollRequestStatus()`

Polls the status of an IaaS request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| requestId | `string` | The request ID (from an action). |
| intervalSeconds | `number` | Polling interval. Default 10. |
| timeoutSeconds | `number` | Timeout. Default 300 |

**Returns:** `object` — Final request object.

---