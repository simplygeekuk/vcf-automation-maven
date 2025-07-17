# Class `VCFAutomationProjectService`

Module: `com.simplygeek.vcf.automation.project`

Extends `VCFAutomationBackend`

Provides an interface to the VCF Automation Projects API.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| restHost | `REST:RESTHost` | The VCF Automation HTTP REST host. |
| apiToken | `string` | The VCF Automation API Token. |

## Methods

### *public* `getProjects()`

Get a list of projects.

**Returns:** `Array/Any` — The list of projects.

---

### *public* `getProjectById()`

Get a specific project by its ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The project id. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The project object.

---

### *public* `getProjectByName()`

Get a specific project by its name.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectName | `string` | The project name. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no results found. |

**Returns:** `Any` — The project object.

---

### *public* `getProjectsWithPrefix()`

Get a list of projects that start with the specified prefix.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectNamePrefix | `string` | The project name prefix. |

**Returns:** `Array/Any` — The projects matching the provided name prefix.

---

### *public* `createProject()`

Create a project.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectSpecification | `Any` | The project specification. |

**Returns:** `Any` — The new project object.

---

### *public* `getProjectTags()`

Get project tags.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The project id. |

**Returns:** `Array/Any` — The project tags list.

---

### *public* `createProjectTags()`

Create project tags.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The project id. |
| tags | `Array/Any` | The tags to assign to project. |

**Returns:** `Array/Any` — The project tags list.

---

### *public* `updateProject()`

Update a project.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The Project uuid. |
| updatedObject | `Any` | The Project object to update. |

**Returns:** `Any` — The updated Project object.

---

### *public* `deleteProject()`

Delete a project.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| projectId | `string` | The Project uuid. |

---