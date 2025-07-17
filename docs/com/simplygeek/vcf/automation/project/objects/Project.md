# Class `Project`

Module: `com.simplygeek.vcf.automation.project.objects`

Defines the Project class.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| name | `string` | The project name. |
| description | `string` | The project description. |
| administrators | `Array/Any` | List of administrator users associated with the project. |
| members | `Array/Any` | List of member users associated with the project. |
| viewers | `Array/Any` | List of viewer users associated with the project. |
| supervisors | `Array/Any` | List of supervisor users associated with the project. |
| networkConstraints | `Any` | List of network constraints of the project. |
| storageConstraints | `Any` | List of storage constraints of the project. |
| extensibilityConstraints | `Any` | List of extensibility constraints of the project. |
| properties | `Any` | List of properties of the project. |
| tags | `Array/Any` | List of tags that apply to all resources under the project. |
| cost | `Any` | A representation of a project cost. |
| zones | `Array/Any` | List of zones to assign to the project. |
| operationTimeout | `number` | The timeout that should be used for Blueprint operations |
| sharedResources | `boolean` | Whether the resources in this project are shared or not. |

## Methods