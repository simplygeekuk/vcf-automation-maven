# Class `ConfigElementService`

Module: `com.simplygeek.vcf.orchestrator.configurations`

Defines the ConfigElementService class.

## Methods

### *public* `getConfigElement()`

Defines the getConfigElement method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElementName | `string` | Configuration Element Name. |
| categoryPath | `string` | Configuration Element Path. |

**Returns:** `ConfigurationElement` — Configuration Element object.

---

### *public* `createConfigElement()`

Defines the createConfigElement method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElementName | `string` | Configuration Element Name. |
| categoryPath | `string` | Configuration Element Path. |

**Returns:** `ConfigurationElement` — Configuration Elemenet object.

---

### *public* `getConfigElementAttribute()`

Defines the getConfigElementAttribute method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElement | `ConfigurationElement` | Configuration Element Object. |
| attributeName | `string` | Configuration Element Attribute Name. |

**Returns:** `Any` — Configuration Element Attribute.

---

### *public* `createConfigElementAttribute()`

Defines the createConfigElementAttribute method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElement | `ConfigurationElement` | Configuration Element Object. |
| attributeName | `string` | Configuration Element Attribute Name. |
| attributeValue | `string` | Configuration Element Attribute Value. |
| attributeType | `string` | Configuration Element Attribute Type. |

**Returns:** `Any` — Configuration Elemenet Attribute.

---

### *public* `updateConfigElementAttribute()`

Defines the updateConfigElementAttribute method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElement | `ConfigurationElement` | Configuration Element Object. |
| attributeName | `string` | Configuration Element Attribute Name. |
| attributeValue | `string` | Configuration Element Attribute Value. |
| attributeType | `string` | Configuration Element Attribute Type. |

**Returns:** `Any` — Configuration Elemenet Attribute.

---

### *public* `removeConfigElementAttribute()`

Defines the removeConfigElementAttribute method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| configElement | `ConfigurationElement` | Configuration Element Object. |
| attributeName | `string` | Configuration Element Attribute Name. |

---