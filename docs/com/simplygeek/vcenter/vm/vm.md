# Module: `com.simplygeek.vcenter.vm`

## Actions

### `getVcVmByUuid()`

Search for a virtual machine by its instance uuid. Optionally search on a specific vCenter Server.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| vcVmInstanceUuid | `string` | The instance uuid of the vCenter VirtualMachine. |
| vCenterSdkConnection | `VC:SdkConnection` | vCenter Server SDK connection. |

**Returns:** `VC:VirtualMachine` — vcVirtualMachine object.

---

### `runCommandInGuest()`

Executes the provided command in the virtual machine using Guest Tools

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| vcVirtualMachine | `VC:VirtualMachine` | The vCenter VirtualMachine. |
| guestUsername | `string` | The username used for guest login. |
| guestPassword | `SecureString` | The password used for guest login. |
| commandPath | `string` | The absolute command path. |
| commandArguments | `string` | The arguments to pass to the command (Optional). |
| expectedExitCode | `number` | The expected exit code (Optional). |
| workingDirectory | `string` | The command working directory (Optional). |
| environmentVariables | `Array/string` | The environment variables to set (Optional). |
| maxWaitTime | `number` | The maximum wait time in seconds (Optional). |

**Returns:** `void` — no return value.

---

### `shutdownVM()`

Performs a graceful shutdown of the virtual machine. Optional to forcefully shutdown.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| vcVirtualMachine | `VC:VirtualMachine` | The vCenter VM object. |

**Returns:** `void` — no return value.

---

### `startVM()`

Performs a power on of a virtual machine.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| vcVirtualMachine | `VC:VirtualMachine` | The vCenter VM object. |

**Returns:** `void` — no return value.

---