# Class `Logger`

Module: `com.simplygeek.vcf.orchestrator.logging`

Logger class used for sending standard log messages to the console.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| logSource | `string` | The log source. Valid sources are Action or Workflow. |
| logName | `string` | The name of the Action or Workflow sending the log message. |

## Methods

### *public* `info()`

Prints INFO messages to the console.

---

### *public* `warn()`

Prints WARNING messages to the console.

---

### *public* `error()`

Prints ERROR messages to the console.

---

### *public* `debug()`

Prints DEBUG messages to the console.

---