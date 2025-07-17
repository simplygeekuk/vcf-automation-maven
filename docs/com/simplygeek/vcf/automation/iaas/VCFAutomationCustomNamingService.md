# Class `VCFAutomationCustomNamingService`

Module: `com.simplygeek.vcf.automation.iaas`

Extends `VCFAutomationBackend`

Defines the VCFAutomationCustomNamingService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |
| apiToken | `string` | The VCF Automation API Token. |

## Methods

### *public* `getCustomNames()`

Defines the getCustomNames method.

**Returns:** `Array/Any` — The list of custom names.

---

### *public* `getCustomNamingById()`

Defines the getCustomNamingById method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| customNamingId | `string` | The custom naming uuid. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The custom naming object.

---

### *public* `getCustomNamingByName()`

Defines the getCustomNamingByName method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| customNamingName | `string` | The custom naming name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The custom naming object.

---

### *public* `updateCustomNaming()`

Defines the updateCustomNaming method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| customNamingId | `string` | The custom naming uuid. |
| updatedObject | `Any` | The custom naming object to update. |

**Returns:** `Any` — The updated custom naming object.

---

### *public* `checkCustomNamingPrefixExists()`

Defines the checkCustomNamingPrefixExists method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| customNamingId | `string` | The custom naming uuid. |
| prefix | `string` | The static pattern to find. |

**Returns:** `boolean` — Whether the prefix was found.

---

### *public* `addCustomNamingPrefixToTemplate()`

Defines the addCustomNamingPrefixToTemplate method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| customNamingId | `string` | The custom naming uuid. |
| prefix | `string` | The static pattern to find. |
| resourceType | `string` | The custom naming resource type. |
| startCounter | `number` | The number to start incrementing from. |
| incrementStep | `number` | The increment step to increase by. |

**Returns:** `Any` — The updated Custom Naming object.

---