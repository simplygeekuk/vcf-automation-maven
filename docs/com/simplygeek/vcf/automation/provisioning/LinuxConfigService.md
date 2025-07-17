# Class `LinuxConfigService`

Module: `com.simplygeek.vcf.automation.provisioning`

Extends `ConfigElementService`

Defines the LinuxConfigService class.

## Methods

### *public* `getCustomNamingProfileName()`

Gets the Custom Naming profile name used for machine naming.

**Returns:** `string` — The Custom Naming Profile Name.

---

### *public* `getActiveDirectoryDomainName()`

Gets the Active Directory Domain Name for Machine joins.

**Returns:** `string` — The Active Directory Domain Name.

---

### *public* `getActiveDirectoryDNSSuffix()`

Gets the Active Directory DNS Suffix.

**Returns:** `string` — The Active Directory DNS Suffix.

---

### *public* `getActiveDirectoryServerOUDN()`

Gets the Active Directory Server OU Distinguished Name.

**Returns:** `string` — The Active Directory Server OU Distinguished Name.

---

### *public* `getAnsibleRestHostName()`

Gets the Ansible Rest Host name.

**Returns:** `string` — The Ansible Rest Host name.

---

### *public* `getAnsibleProjectName()`

Gets the Ansible Project name for Playbook execution.

**Returns:** `string` — The Ansible Project name.

---

### *public* `getAnsibleProvisioningJobTemplateName()`

Gets the Ansible Job Template used for machine provisioning.

**Returns:** `string` — The Ansible Job Template name.

---

### *public* `getAnsibleDeProvisioningJobTemplateName()`

Gets the Ansible Job Template used for machine de-provisioning.

**Returns:** `string` — The Ansible Job Template name.

---

### *public* `getAnsibleJobTags()`

Gets the Ansible job tags to include.

**Returns:** `string` — The Ansible job tags.

---

### *public* `getAnsibleSkipTags()`

Gets the Ansible job tags to skip.

**Returns:** `string` — The Ansible skip tags.

---

### *public* `getAnsibleGroupName()`

Gets the Ansible Group name to assign to the inventory host.

**Returns:** `string` — The Ansible group name.

---

### *public* `getAnsibleConnection()`

Gets the Ansible connection method for connecting to inventory hosts.

**Returns:** `string` — The Ansible group name.

---

### *public* `getAnsiblePort()`

Gets the port used for the Ansible connection.

**Returns:** `string` — The port used for the Ansible connection.

---

### *private* `__getConfigValue()`

Gets a configuration value (or default value if none is found)

**Returns:** `Any` — The configuration value

---