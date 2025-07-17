# Module: `com.simplygeek.rest`

## Actions

### `createTransientRestHost()`

This function creates a transient/dynamic rest host.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHostUrl | `string` | The Web Service URL. |
| restHostName | `string` | The name of the rest host. |
| connectionTimeout | `number` | The connection timeout in a seconds (default 120). |
| operationTimeout | `number` | The operation timeout in a seconds (default 240). |
| hostVerification | `boolean` | Should verify hostname certificate. |
| authenticationType | `string` | The authentication type (default NONE) |
| basicUsername | `string` | The username if Basic authentication is used. |
| basicPassword | `SecureString` | The password if Basic authentication is used. |
| apiToken | `string` | The API Bearer Token if Oauth2 authentication is used. |

**Returns:** `REST:RESTHost` — The RESTHost vRO type

---

### `getRestHost()`

Write a brief description of the purpose of the action.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHostName | `string` | The name of the resthost in the inventory. |

**Returns:** `REST:RESTHost` — RESTHost inventory type.

---