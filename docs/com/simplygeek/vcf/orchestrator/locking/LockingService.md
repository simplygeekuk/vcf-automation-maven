# Class `LockingService`

Module: `com.simplygeek.vcf.orchestrator.locking`

Defines the LockingService class.

## Methods

### *public* `createLock()`

Defines the createLock method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| lockOwner | `string` | the lock owner. |
| lockId | `string` | the unique (per lock) id. |
| retryMaxAttempts | `number` | The maximum number of attempts to retry lock (default 5). |
| retryDelay | `number` | The delay between retry attempts (default 60 seconds). |
| autoRemoveLock | `boolean` | Auto remove the lock if one is already present and |

**Returns:** `boolean` — Return the lock status.

---

### *public* `removeLock()`

Defines the removeLock method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| lockOwner | `string` | the lock owner. |
| lockId | `string` | the unique (per lock) id. |

---