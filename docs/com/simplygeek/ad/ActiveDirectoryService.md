# Class `ActiveDirectoryService`

Module: `com.simplygeek.ad`

Provides an interface to the Active Directory plugin.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adHostName | `string` | Active Directory Hostname. |

## Methods

### *public* `getAdHost()`

Returns the Active Directory host.

**Returns:** `AD:AdHost` — Active Directory Host object.

---

### *public* `getComputer()`

Get an Active Directory computer object.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| computerName | `string` | Computer name. |
| computerDn | `string` | Computer Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Example:**

```javascript

var adcomputer = adService.getComputer(
    "computerName",
    null,
    "OU=servers,DC=example,DC=local",
    false,
    true
);
```

**Returns:** `AD:ComputerAD` — The Active Directory computer object.

---

### *public* `createComputer()`

Create an Active Directory computer object in the specified container.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| computerName | `string` | Computer name. |
| parent | `AD:OrganizationalUnit|AD:Group` | Parent container. |
| domainName | `string` | Domain name. |

**Returns:** `AD:ComputerAD` — The created Active Directory computer object.

---

### *public* `removeComputer()`

Remove an Active Directory computer object.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adComputer | `AD:ComputerAD` | The Active Directory computer object. |

---

### *public* `setComputerEnabled()`

Enable or disable a computer account.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adComputer | `AD:ComputerAD` | Active Directory computer object. |
| enable | `boolean` | True to enable, false to disable. |

---

### *public* `getGroup()`

Get an Active Directory group.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| groupName | `string` | Group name. |
| groupDn | `string` | Group Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Returns:** `AD:Group` — The Active Directory group object.

---

### *public* `getOrganizationalUnit()`

Get an Active Directory Organizational Unit.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| ouName | `string` | OrganizationalUnit Name. |
| ouDn | `string` | OrganizationalUnit Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Returns:** `AD:OrganizationUnit` — Active Directory OU object.

---

### *public* `createOrganizationalUnit()`

Create an Active Directory Organizational Unit object in the specified container.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| organizationalUnitName | `string` | Organizational Unit name. |
| parent | `AD:OrganizationalUnit` | Parent container. |

**Returns:** `AD:OrganizationalUnit` — The created Active Directory Organizational Unit object.

---

### *public* `removeOrganizationalUnit()`

Remove an Active Directory Organizational Unit.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adOu | `AD:OrganizationalUnit` | Active Directory Organizational Unit object. |
| deleteSubTree | `boolean` | Whether to delete Organizational Unit subtree. |

---

### *public* `getUser()`

Get an Active Directory user.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| username | `string` | User name. |
| userDn | `string` | User Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Returns:** `AD:User` — Active Directory User object.

---

### *public* `createUser()`

Create an Active Directory user.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| username | `string` | User Account name. |
| password | `string` | User Account password. |
| parent | `AD:OrganizationalUnit|AD:Group` | Parent container. |
| domainName | `string` | Domain name. |
| displayName | `string` | Display name. Defaults to username if not specified. |
| description | `string` | User description. |
| changePasswordAtNextLogon | `boolean` | Whether to force password change at next logon. |

**Returns:** `AD:User` — Active Directory User object.

---

### *public* `removeUser()`

Remove an Active Directory user.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adUser | `AD:User` | Active Directory User object. |

---

### *public* `setUserEnabled()`

Enable or disable a user account.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adUser | `AD:User` | Active Directory User object. |
| enable | `boolean` | True to enable, false to disable. |

---

### *public* `resetUserPassword()`

Resets the password for a user.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adUser | `AD:User` | Active Directory User object. |
| newPassword | `string` | The new password. |

---

### *public* `getSecurityGroup()`

Get an Active Directory security group.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| userGroupName | `string` | Security Group name. |
| userGroupDN | `string` | Security Group Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Returns:** `AD:UserGroup` — The Active Directory Security Group object.

---

### *public* `createSecurityGroup()`

Create an Active Directory Security Group object in the specified container.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| userGroupName | `string` | User Group name. |
| parent | `AD:OrganizationalUnit|AD:Group` | Parent container. |

**Returns:** `AD:UserGroup` — The created Active Directory User Group object.

---

### *public* `removeSecurityGroup()`

Remove an Active Directory Security Group.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adUserGroup | `AD:UserGroup` | Active Directory Security Group object. |

---

### *public* `addSecurityGroupMembers()`

Add members to a Security Group.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adUserGroup | `AD:UserGroup` | Active Directory Security Group object. |
| groupMembers | `Array/AD:User|Array/AD:UserGroup|Array/AD:Computer` | Active Directory items to add. |

---

### *public* `searchOrganizationalUnits()`

Search for AD organizational units based on a pattern.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| searchPattern | `string` | Pattern to match CN (e.g., "*MYOU*"). |
| searchBaseDn | `string` | The base DN for the search (domain or OU). |
| searchAttribute | `string` | LDAP attribute to search for. Defaults to 'name'. |

**Returns:** `Array/AD:OrganizationUnit` — List of Active Directory organizational units.

---

### *public* `searchComputers()`

Search for AD computers based on a pattern.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| searchPattern | `string` | Pattern to match CN (e.g., "*MYCOMPUTER*"). |
| searchBaseDn | `string` | The base DN for the search (domain or OU). |
| searchAttribute | `string` | LDAP attribute to search for. Defaults to 'cn'. |

**Returns:** `Array/AD:Computer` — List of Active Directory users.

---

### *public* `searchUsers()`

Search for AD users based on a pattern.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| searchPattern | `string` | Pattern to match CN (e.g., "*John*"). |
| searchBaseDn | `string` | The base DN for the search (domain or OU). |
| searchAttribute | `string` | LDAP attribute to search for. Defaults to 'cn'. |

**Returns:** `Array/AD:User` — List of Active Directory users.

---

### *public* `searchSecurityGroups()`

Search for AD security groups based on a pattern.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| searchPattern | `string` | Pattern to match CN (e.g., "*MYGROUP*"). |
| searchBaseDn | `string` | The base DN for the search (domain or OU). |
| searchAttribute | `string` | LDAP attribute to search for. Defaults to 'cn'. |

**Returns:** `Array/AD:UserGroup` — List of Active Directory security groups.

---

### *private* `ldapSearch()`

Search for ldap objects with pattern and specified base DN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| objectClass | `string` | The ldap object class to search for. |
| searchPattern | `string` | Pattern to match CN (e.g., "*John*"). |
| searchBaseDn | `string` | The base DN for the search (domain or OU). |
| searchAttribute | `string` | LDAP attribute to search for. Defaults to 'cn'. |

**Returns:** `Array` — List of LDAP entries.

---

### *public* `getDefaultBaseDn()`

Derives the default base DN from the adHost URL.

**Example:**

```javascript
ldap://example.com:389 → DC=example,DC=com
```

**Returns:** `string` — The inferred base DN.

---

### *private* `findAdObject()`

Helper function for finding Active Directory objects.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| adObjType | `string` | AD Object Type. |
| adObjName | `string` | AD Object Name. |
| objDistinguishedName | `string` | The AD Object Distinguished Name. |
| containerDn | `string` | Optional container to search within. |
| returnAllMatches | `boolean` | Return all matching objects instead of first. |
| throwOnNotFound | `boolean` | Whether to throw an exception if no object is found. |

**Returns:** `Any|Array` — A single object or array of matching AD objects.

---