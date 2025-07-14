# Class `VCFAutomationAuthenticationService`

Module: `com.simplygeek.vcf.automation`

Extends `HttpRestClient`

Defines The VCFAutomationAuthenticationService class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |

## Methods

### *public* `createAuthenticatedSession()`

Defines the createAuthenticatedSession method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| refreshToken | `string` | The refresh token. |

---

### *public* `createSession()`

Defines the createSession method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| refreshToken | `string` | The refresh token. |

**Returns:** `Any` — The session object.

---

### *public* `getRefreshToken()`

Defines the getRefreshToken method.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| username | `string` | CSP username. |
| password | `SecureString` | CSP password. |
| domain | `string` | CSP domain. |

**Returns:** `string` — The refresh token

---