/**
 * Provides an interface to the Active Directory plugin.
 * @returns {Any} - An instance of the ActiveDirectoryService class.
 */
(function () {
    /**
     * Provides an interface to the Active Directory plugin.
     * @class
     * @param {string} adHostName - Active Directory Hostname.
     * @returns {Any} An instance of the ActiveDirectoryService class.
     */
    function ActiveDirectoryService(adHostName) {
        if (!adHostName || typeof adHostName !== "string") {
            throw new ReferenceError("adHostName is required and must be of type 'string'");
        }

        this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
            "Action",
            "ActiveDirectoryService"
        );

        this.log.debug("Get Active Directory Host with name '" + adHostName + "'");
        var adHosts = AD_HostManager.findAllHosts();
        var adHostsFound = adHosts.filter(
            function(adHost) {
                return adHost.name.toLowerCase() === adHostName.toLowerCase();
            }
        );

        if (adHostsFound.length > 1) {
            throw new Error(
                "More than one Active Directory Host was found with the name '" + adHostName + "'"
            );
        } else if (adHostsFound.length > 0) {
            var adHost = adHostsFound[0];

            this.log.debug("Found Active Directory host '" + adHostName + "'");
            this.adHost = adHost;
        } else {
            throw new Error(
                "No Active Directory Host found with the name '" +
                adHostName + "'"
            );
        }

        /**
         * Returns the Active Directory host.
         * @function
         * @public
         * @returns {AD:AdHost} Active Directory Host object.
         */

        this.getAdHost = function() {
            return this.adHost;
        };

        /**
         * Get an Active Directory computer object.
         * @function
         * @public
         * @param {string} computerName - Computer name.
         * @param {string} [computerDn] - Computer Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @example
         * var adcomputer = adService.getComputer(
         *     "computerName",
         *     null,
         *     "OU=servers,DC=example,DC=local",
         *     false,
         *     true
         * );
         * @returns {AD:ComputerAD} The Active Directory computer object.
         */

        this.getComputer = function(
            computerName,
            computerDn,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            if (!computerName || typeof computerName !== "string") {
                throw new ReferenceError(
                    "computerName is required and must be of type 'string'"
                );
            }
            if (computerDn && typeof computerDn !== "string") {
                throw new ReferenceError("computerDn must be of type 'string'");
            }
            if (containerDn && typeof containerDn !== "string") {
                throw new ReferenceError("containerDn must be of type 'string'");
            }

            var adComputer = this.findAdObject(
                "ComputerAD",
                computerName,
                computerDn,
                containerDn,
                returnAllMatches,
                throwOnNotFound
            );

            return adComputer;
        };

        /**
         * Create an Active Directory computer object in the specified container.
         * @function
         * @public
         * @param {string} computerName - Computer name.
         * @param {AD:OrganizationalUnit|AD:Group} parent - Parent container.
         * @param {string} [domainName] - Domain name.
         * @returns {AD:ComputerAD} The created Active Directory computer object.
         */

        this.createComputer = function(
            computerName,
            parent,
            domainName
        ) {
            if (!computerName || typeof computerName !== "string") {
                throw new ReferenceError(
                    "computerName is required and must be of type 'string'"
                );
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit" &&
                System.getObjectType(parent) !== "AD:Group")) {
                throw new ReferenceError(
                    "parent container is required and must be of type " +
                    "'AD:OrganizationalUnit' or 'AD:Group'"
                );
            }
            if (domainName && typeof domainName !== "string") {
                throw new ReferenceError("domainName must be of type 'string'");
            }

            var containerDn = parent.distinguishedName;
            var existingAdComputer = this.findAdObject(
                "ComputerAD",
                computerName,
                null,
                containerDn,
                null,
                false
            );

            try {
                this.log.debug("Creating computer: " + computerName);
                if (existingAdComputer) {
                    throw new Error(
                        "The Computer '" + computerName + "' already exists"
                    );
                }

                if (domainName) {
                    parent.createComputer(computerName, domainName);
                } else {
                    parent.createComputer(computerName);
                }

                var adComputer = this.getComputer(
                    computerName,
                    null,
                    containerDn
                );

                this.log.debug("Computer '" + computerName + "' created successfully.");
            } catch (e) {
                throw new Error("Failed to create Computer: " + e);
            }

            return adComputer;
        };

        /**
         * Remove an Active Directory computer object.
         * @function
         * @public
         * @param {AD:ComputerAD} adComputer - The Active Directory computer object.
         */

        this.removeComputer = function(adComputer) {
            if (!adComputer || System.getObjectType(adComputer) !== "AD:ComputerAD") {
                throw new ReferenceError(
                    "adComputer is required and must be of type 'AD:ComputerAD'"
                );
            }

            try {
                this.log.debug("Removing computer: " + adComputer.name);
                adComputer.destroy();
                this.log.debug("Computer '" + adComputer.name + "' removed successfully");
            } catch (e) {
                throw new Error("Failed to remove AD Computer: " + e);
            }
        };

        /**
         * Enable or disable a computer account.
         * @function
         * @public
         * @param {AD:ComputerAD} adComputer - Active Directory computer object.
         * @param {boolean} enable - True to enable, false to disable.
         */
        this.setComputerEnabled = function(
            adComputer,
            enable
        ) {
            if (!adComputer || System.getObjectType(adComputer) !== "AD:ComputerAD") {
                throw new ReferenceError(
                    "adComputer is required and must be of type 'AD:ComputerAD'"
                );
            }

            // Default enable to true
            enable = enable !== false;

            try {
                this.log.debug("Setting computer '" + adComputer.name + "' enabled status to: " + enable);
                adComputer.setEnabled(enable);
                this.log.debug("Computer '" + adComputer.name + "' enabled status set to: " + enable);
            } catch (e) {
                throw new Error("Failed to set computer enabled status: " + e);
            }
        };

        /**
         * Get an Active Directory group.
         * @function
         * @public
         * @param {string} groupName - Group name.
         * @param {string} [groupDn] - Group Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {AD:Group} The Active Directory group object.
         */

        this.getGroup = function(
            groupName,
            groupDN,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            if (!groupName || typeof groupName !== "string") {
                throw new ReferenceError("groupName is required and must be of type 'string'");
            }
            if (groupDN && typeof groupDN !== "string") {
                throw new ReferenceError("groupDN must be of type 'string'");
            }
            if (containerDn && typeof containerDn !== "string") {
                throw new ReferenceError("containerDn must be of type 'string'");
            }

            var adGroup = this.findAdObject(
                "Group",
                groupName,
                groupDN,
                containerDn,
                returnAllMatches,
                throwOnNotFound
            );

            return adGroup;
        };

        /**
         * Get an Active Directory Organizational Unit.
         * @function
         * @public
         * @param {string} ouName - OrganizationalUnit Name.
         * @param {string} [ouDn] - OrganizationalUnit Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {AD:OrganizationUnit} Active Directory OU object.
         */

        this.getOrganizationalUnit = function(
            ouName,
            ouDN,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            if (!ouName || typeof ouName !== "string") {
                throw new ReferenceError("ouName is required and must be of type 'string'");
            }
            if (ouDN && typeof ouDN !== "string") {
                throw new ReferenceError("ouDN must be of type 'string'");
            }
            if (containerDn && typeof containerDn !== "string") {
                throw new ReferenceError("containerDn must be of type 'string'");
            }

            var adOu = this.findAdObject(
                "OrganizationalUnit",
                ouName,
                ouDN,
                containerDn,
                returnAllMatches,
                throwOnNotFound
            );

            return adOu;
        };

        /**
         * Create an Active Directory Organizational Unit object in the specified container.
         * @function
         * @public
         * @param {string} organizationalUnitName - Organizational Unit name.
         * @param {AD:OrganizationalUnit} parent - Parent container.
         * @returns {AD:OrganizationalUnit} The created Active Directory Organizational Unit object.
         */

        this.createOrganizationalUnit = function(
            organizationalUnitName,
            parent
        ) {
            if (!organizationalUnitName || typeof organizationalUnitName !== "string") {
                throw new ReferenceError(
                    "organizationalUnitName is required and must be of type 'string'"
                );
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit")) {
                throw new ReferenceError(
                    "parent container is required and must be of type " +
                    "'AD:OrganizationalUnit'"
                );
            }

            var containerDn = parent.distinguishedName;
            var existingAdOu = this.findAdObject(
                "OrganizationalUnit",
                organizationalUnitName,
                null,
                containerDn,
                null,
                false
            );

            try {
                this.log.debug("Creating Organizational Unit: " + organizationalUnitName);
                if (existingAdOu) {
                    throw new Error(
                        "The Organizational Unit '" + organizationalUnitName + "' already exists"
                    );
                }

                parent.createOrganizationalUnit(organizationalUnitName);

                var adOu = this.getOrganizationalUnit(
                    organizationalUnitName,
                    null,
                    containerDn
                );

                this.log.debug("Organizational Unit '" + organizationalUnitName + "' created successfully.");
            } catch (e) {
                throw new Error("Failed to create Organizational Unit: " + e);
            }

            return adOu;
        };

        /**
         * Remove an Active Directory Organizational Unit.
         * @function
         * @public
         * @param {AD:OrganizationalUnit} adOu - Active Directory Organizational Unit object.
         * @param {boolean} deleteSubTree - Whether to delete Organizational Unit subtree.
         */

        this.removeOrganizationalUnit = function(
            adOu,
            deleteSubTree
        ) {
            if (!adOu || System.getObjectType(adOu) !== "AD:OrganizationalUnit") {
                throw new ReferenceError(
                    "adOu is required and must be of type 'AD:OrganizationalUnit'"
                );
            }

            // Default deleteSubTree to false, unless explicitly set to true.
            deleteSubTree = deleteSubTree === true;

            try {
                this.log.debug("Removing Organizational Unit: " + adOu.name);
                adOu.destroy(deleteSubTree);
                this.log.debug("Organizational Unit '" + adOu.name + "' removed successfully");
            } catch (e) {
                throw new Error("Failed to remove Organizational Unit: " + e);
            }
        };

        /**
         * Get an Active Directory user.
         * @function
         * @public
         * @param {string} username - User name.
         * @param {string} [userDn] - User Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {AD:User} Active Directory User object.
         */

        this.getUser = function(
            username,
            userDn,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            if (!username || typeof username !== "string") {
                throw new ReferenceError(
                    "username is required and must be of type 'string'"
                );
            }
            if (userDn && typeof userDn !== "string") {
                throw new ReferenceError("userDn must be of type 'string'");
            }
            if (containerDn && typeof containerDn !== "string") {
                throw new ReferenceError("containerDn must be of type 'string'");
            }

            var adUser = this.findAdObject(
                "User",
                username,
                userDn,
                containerDn,
                returnAllMatches,
                throwOnNotFound);

            return adUser;
        };

        /**
         * Create an Active Directory user.
         * @function
         * @public
         * @param {string} username - User Account name.
         * @param {string} password - User Account password.
         * @param {AD:OrganizationalUnit|AD:Group} parent - Parent container.
         * @param {string} [domainName] - Domain name.
         * @param {string} [displayName] - Display name. Defaults to username if not specified.
         * @param {string} [description] - User description.
         * @param {boolean} [changePasswordAtNextLogon] - Whether to force password change at next logon.
         * @returns {AD:User} Active Directory User object.
         */

        this.createUser = function(
            username,
            password,
            parent,
            domainName,
            displayName,
            description,
            changePasswordAtNextLogon
        ) {
            if (!username || typeof username !== "string") {
                throw new ReferenceError(
                    "username is required and must be of type 'string'"
                );
            }
            if (!password || typeof password !== "string") {
                throw new ReferenceError(
                    "password is required and must be of type 'SecureString' " +
                    "or 'string"
                );
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit" &&
                System.getObjectType(parent) !== "AD:Group")) {
                throw new ReferenceError(
                    "parent container is required and must be of type " +
                    "'AD:OrganizationalUnit' or 'AD:Group'"
                );
            }
            if (domainName && typeof domainName !== "string") {
                throw new ReferenceError("domainName must be of type 'string'");
            }
            if (displayName && typeof displayName !== "string") {
                throw new ReferenceError("displayName must be of type 'string'");
            }
            if (description && typeof description !== "string") {
                throw new ReferenceError("description must be of type 'string'");
            }

            var containerDn = parent.distinguishedName;
            var existingAdUser = this.getUser(
                username,
                null,
                containerDn,
                null,
                false
            );

            try {
                this.log.debug("Creating user: " + username);
                if (existingAdUser) {
                    throw new Error(
                        "The User '" + username + "' already exists"
                    );
                }

                // eslint-disable-next-line no-redeclare
                if (!domainName) var domainName;
                if (!displayName) displayName = username;

                parent.createUserWithPassword(
                    username,
                    password,
                    domainName,
                    displayName
                );

                var adUser = this.getUser(
                    username,
                    null,
                    containerDn
                );

                this.log.debug("Setting changePasswordAtNextLogon to: " + changePasswordAtNextLogon);
                adUser.setChangePasswordAtNextLogon(changePasswordAtNextLogon);
                if (description) adUser.setAttribute("description", description);
                this.log.debug("User '" + username + "' created successfully.");
            } catch (e) {
                throw new Error("Failed to create User: " + e);
            }

            return adUser;
        };

        /**
         * Remove an Active Directory user.
         * @function
         * @public
         * @param {AD:User} adUser - Active Directory User object.
         */

        this.removeUser = function(adUser) {
            if (!adUser || System.getObjectType(adUser) !== "AD:User") {
                throw new ReferenceError(
                    "adUser is required and must be of type 'AD:User'"
                );
            }

            try {
                this.log.debug("Removing user: " + adUser.name);
                adUser.destroy();
                this.log.debug("User '" + adUser.name + "' removed successfully");
            } catch (e) {
                throw new Error("Failed to remove AD User: " + e);
            }
        };

        /**
         * Enable or disable a user account.
         * @function
         * @public
         * @param {AD:User} adUser - Active Directory User object.
         * @param {boolean} enable - True to enable, false to disable.
         */
        this.setUserEnabled = function(
            adUser,
            enable
        ) {
            if (!adUser || System.getObjectType(adUser) !== "AD:User") {
                throw new ReferenceError(
                    "adUser is required and must be of type 'AD:User'"
                );
            }

            // Default enable to true
            enable = enable !== false;

            try {
                this.log.debug("Setting user '" + adUser.name + "' enabled status to: " + enable);
                adUser.setEnabled(enable);
                this.log.debug("User '" + adUser.name + "' enabled status set to: " + enable);
            } catch (e) {
                throw new Error("Failed to set user enabled status: " + e);
            }
        };

        /**
         * Resets the password for a user.
         * @function
         * @public
         * @param {AD:User} adUser - Active Directory User object.
         * @param {string} newPassword - The new password.
         */
        this.resetUserPassword = function(adUser, newPassword) {
            if (!adUser || System.getObjectType(adUser) !== "AD:User") {
                throw new ReferenceError(
                    "adUser is required and must be of type 'AD:User'"
                );
            }
            if (!newPassword || typeof newPassword !== "string") {
                throw new ReferenceError(
                    "newPassword is required and must be of type 'string'"
                );
            }

            try {
                this.log.debug("Resetting password for user: " + adUser.name);
                adUser.setPassword(newPassword);
                this.log.debug("User '" + adUser.name + "' password reset successfully");
            } catch (e) {
                throw new Error("Failed to reset password: " + e);
            }
        };

        /**
         * Get an Active Directory security group.
         * @function
         * @public
         * @param {string} userGroupName - Security Group name.
         * @param {string} userGroupDN - Security Group Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {AD:UserGroup} The Active Directory Security Group object.
         */

        this.getSecurityGroup = function(
            userGroupName,
            userGroupDN,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            if (!userGroupName || typeof userGroupName !== "string") {
                throw new ReferenceError(
                    "userGroupName is required and must be of type 'string'"
                );
            }
            if (!userGroupDN || typeof userGroupDN !== "string") {
                throw new ReferenceError(
                    "userGroupDN is required and must be of type 'string'"
                );
            }
            if (containerDn && typeof containerDn !== "string") {
                throw new ReferenceError("containerDn must be of type 'string'");
            }

            var adUserGroup = this.findAdObject(
                "UserGroup",
                userGroupName,
                userGroupDN,
                containerDn,
                returnAllMatches,
                throwOnNotFound
            );

            return adUserGroup;
        };

        /**
         * Create an Active Directory Security Group object in the specified container.
         * @function
         * @public
         * @param {string} userGroupName - User Group name.
         * @param {AD:OrganizationalUnit|AD:Group} parent - Parent container.
         * @returns {AD:UserGroup} The created Active Directory User Group object.
         */

        this.createSecurityGroup = function(
            userGroupName,
            parent
        ) {
            if (!userGroupName || typeof userGroupName !== "string") {
                throw new ReferenceError(
                    "userGroupName is required and must be of type 'string'"
                );
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit" &&
                System.getObjectType(parent) !== "AD:Group")) {
                throw new ReferenceError(
                    "parent container is required and must be of type " +
                    "'AD:OrganizationalUnit' or 'AD:Group'"
                );
            }

            var containerDn = parent.distinguishedName;
            var existingAdUserGroup = this.findAdObject(
                "UserGroup",
                userGroupName,
                null,
                containerDn,
                null,
                false
            );

            try {
                this.log.debug("Creating Security Group: " + userGroupName);
                if (existingAdUserGroup) {
                    throw new Error(
                        "The Security Group '" + userGroupName + "' already exists"
                    );
                }

                parent.createUserGroup(userGroupName);

                var adUserGroup = this.getSecurityGroup(
                    userGroupName,
                    null,
                    containerDn
                );

                this.log.debug("Security Group '" + userGroupName + "' created successfully.");
            } catch (e) {
                throw new Error("Failed to create Security Group: " + e);
            }

            return adUserGroup;
        };

        /**
         * Remove an Active Directory Security Group.
         * @function
         * @public
         * @param {AD:UserGroup} adUserGroup - Active Directory Security Group object.
         */

        this.removeSecurityGroup = function(
            adUserGroup
        ) {
            if (!adUserGroup || System.getObjectType(adUserGroup) !== "AD:UserGroup") {
                throw new ReferenceError(
                    "adUserGroup is required and must be of type 'AD:UserGroup'"
                );
            }

            try {
                this.log.debug("Removing Security Group: " + adUserGroup.name);
                adUserGroup.destroy();
                this.log.debug("Security Group '" + adUserGroup.name + "' removed successfully");
            } catch (e) {
                throw new Error("Failed to remove Security Group: " + e);
            }
        };

        /**
         * Search for AD computers based on a pattern.
         * @function
         * @public
         * @param {string} searchPattern - Pattern to match CN (e.g., "*MYCOMPUTER*").
         * @param {string} [searchBaseDn] - The base DN for the search (domain or OU).
         * @returns {Array/AD:Computer} List of Active Directory users.
         */
        this.searchComputers = function(
            searchPattern,
            searchBaseDn
        ) {
            if (!searchPattern || typeof searchPattern !== "string") {
                throw new ReferenceError(
                    "searchPattern is required and must be of type 'string'"
                );
            }
            if (searchBaseDn && typeof searchBaseDn !== "string") {
                throw new ReferenceError(
                    "searchBaseDn must be of type 'string'"
                );
            }

            var entries = [];
            var adUComputers = [];
            var baseDn = searchBaseDn || this.getDefaultBaseDn();

            entries = this.ldapSearch("computer", searchPattern, baseDn);
            entries.forEach(function(entry){
                var cn = entry.getAttributeValue("cn");
                var dn = entry.getDN();

                this.log.debug("Matched computer: " + cn);
                this.log.debug("Distinguished Name: " + dn);

                adUComputers.push(this.getComputer(cn, dn));
            }, this);

            return adUComputers;
        };

        /**
         * Search for AD users based on a pattern.
         * @function
         * @public
         * @param {string} searchPattern - Pattern to match CN (e.g., "*John*").
         * @param {string} [searchBaseDn] - The base DN for the search (domain or OU).
         * @returns {Array/AD:User} List of Active Directory users.
         */
        this.searchUsers = function(
            searchPattern,
            searchBaseDn
        ) {
            if (!searchPattern || typeof searchPattern !== "string") {
                throw new ReferenceError(
                    "searchPattern is required and must be of type 'string'"
                );
            }
            if (searchBaseDn && typeof searchBaseDn !== "string") {
                throw new ReferenceError(
                    "searchBaseDn must be of type 'string'"
                );
            }

            var entries = [];
            var adUsers = [];
            var baseDn = searchBaseDn || this.getDefaultBaseDn();

            entries = this.ldapSearch("user", searchPattern, baseDn);
            entries.forEach(function(entry){
                var cn = entry.getAttributeValue("cn");
                var dn = entry.getDN();

                this.log.debug("Matched user: " + cn);
                this.log.debug("Distinguished Name: " + dn);

                adUsers.push(this.getUser(cn, dn));
            }, this);

            return adUsers;
        };

        /**
         * Search for AD security groups based on a pattern.
         * @function
         * @public
         * @param {string} searchPattern - Pattern to match CN (e.g., "*MYGROUP*").
         * @param {string} searchBaseDn - The base DN for the search (domain or OU).
         * @returns {Array/AD:UserGroup} List of Active Directory security groups.
         */
        this.searchSecurityGroups = function(
            searchPattern,
            searchBaseDn
        ) {
            if (!searchPattern || typeof searchPattern !== "string") {
                throw new ReferenceError(
                    "searchPattern is required and must be of type 'string'"
                );
            }
            if (searchBaseDn && typeof searchBaseDn !== "string") {
                throw new ReferenceError(
                    "searchBaseDn must be of type 'string'"
                );
            }

            var entries = [];
            var adUserGroups = [];
            var baseDn = searchBaseDn || this.getDefaultBaseDn();

            entries = this.ldapSearch("usergroup", searchPattern, baseDn);
            entries.forEach(function(entry){
                var cn = entry.getAttributeValue("cn");
                var dn = entry.getDN();

                this.log.debug("Matched security group: " + cn);
                this.log.debug("Distinguished Name: " + dn);

                adUserGroups.push(this.getSecurityGroup(cn, dn));
            }, this);

            return adUserGroups;
        };

        /**
         * Search for ldap objects with pattern and specified base DN.
         * @function
         * @private
         * @param {string} objectClass - The ldap object class to search for.
         * @param {string} searchPattern - Pattern to match CN (e.g., "*John*").
         * @param {string} searchBaseDn - The base DN for the search (domain or OU).
         * @returns {Array} List of LDAP entries.
         */
        this.ldapSearch = function(
            objectClass,
            searchPattern,
            searchBaseDn
        ) {
            var ldapClient = this.adHost.getLdapClient();
            var searchScope = LdapSearchScope.SUB;
            var dereferencePolicy = LdapDereferencePolicy.NEVER;
            var filter;
            var timeLimit = 0; // No time limit
            var sizeLimit = 0; // No size limit (return all matches)
            var entries;
            var objectclassFilter;

            if (objectClass === "user") {
                objectclassFilter = "(&(objectClass=user)" +
                                    "(!(objectClass=computer))" +
                                    "(!(cn=HealthMailbox*))" +
                                    "(!(cn=SystemMailbox*))" +
                                    "(!(cn=DiscoverySearchMailbox*))";
            } else if (objectClass === "computer") {
                objectclassFilter = "(&(objectClass=computer)";
            } else if (objectClass === "usergroup") {
                // (groupType:1.2.840.113556.1.4.803:=2147483648) = All Security Groups (excludes distribution groups)
                // Distribution Groups can also be returned using (!(groupType:1.2.840.113556.1.4.803:=2147483648))
                objectclassFilter = "(&(objectCategory=Group)(groupType:1.2.840.113556.1.4.803:=2147483648)";
            } else {
                throw new Error("Unknown objectClass");
            }

            filter = objectclassFilter + "(cn=" + searchPattern + "))";

            try {
                this.log.debug("Using LdapClient to perform search");
                this.log.debug("LDAP search base DN: " + searchBaseDn);
                this.log.debug("LDAP search filter: " + filter);

                var results = ldapClient.search(
                    searchBaseDn,
                    searchScope,
                    dereferencePolicy,
                    timeLimit,
                    sizeLimit,
                    filter
                );

                entries = results.getSearchEntries();
                this.log.debug("Found " + entries.length + " " + objectClass + "(s) matching pattern '" + searchPattern + "'");
            } catch (e) {
                throw new Error("LdapClient search failed: " + e);
            } finally {
                ldapClient.close();
            }

            return entries;
        };

        /**
         * Derives the default base DN from the adHost URL.
         * @function
         * @public
         * @example ldap://example.com:389 → DC=example,DC=com
         * @returns {string} The inferred base DN.
         */
        this.getDefaultBaseDn = function() {
            var url = this.adHost.url;
            // Extract the domain from the URL
            var match = url.match(/^ldap[s]?:\/\/([^:\\/]+)/i);

            if (!match || !match[1]) {
                throw new Error("Failed to parse domain from AD host URL: " + url);
            }

            var domain = match[1];
            var baseDn = domain.split(".").map(function(part) {
                return "DC=" + part;
            }).join(",");

            this.log.debug("Found baseDN: " + baseDn);

            return baseDn;
        };

        /**
         * Helper function for finding Active Directory objects.
         * @function
         * @private
         * @param {string} adObjType - AD Object Type.
         * @param {string} adObjName - AD Object Name.
         * @param {string} [objDistinguishedName] - The AD Object Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects instead of first.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {Any|Array} A single object or array of matching AD objects.
         */

        this.findAdObject = function(
            adObjType,
            adObjName,
            objDistinguishedName,
            containerDn,
            returnAllMatches,
            throwOnNotFound
        ) {
            var adObj;
            var adObjsFound;
            var errorMessage;

            // Default throwOnNotFound to true, unless explicitly set to false.
            throwOnNotFound = throwOnNotFound !== false;

            this.log.debug("Finding Active Directory object with name '" + adObjName +
                            "' of type '" + adObjType + "'");

            adObjsFound = ActiveDirectory.searchExactMatch(adObjType, adObjName, 1000, this.adHost);
            try {
                // If DN is provided, use it exclusively and skip container filtering
                if (objDistinguishedName) {
                    this.log.debug("Looking up AD object by Distinguished Name: " + objDistinguishedName);

                    adObjsFound = adObjsFound.filter(function(obj) {
                        return obj.distinguishedName.toLowerCase() === objDistinguishedName.toLowerCase();
                    });
                    this.log.debug("Filtered to " + adObjsFound.length + " results using exact DN: " + objDistinguishedName);
                } else if (containerDn) {
                    this.log.debug("Searching for '" + adObjName + "' in containerDN '" + containerDn + "'");
                    adObjsFound = adObjsFound.filter(function(obj) {
                        return obj.distinguishedName.toLowerCase().indexOf(containerDn.toLowerCase()) > -1;
                    });
                    this.log.debug("Filtered to " + adObjsFound.length + " results in container: " + containerDn);
                } else {
                    this.log.debug("Searching entire domain for objects matching '" + adObjName + "'");
                }

                this.log.debug("Found " + adObjsFound.length + " objects matching '" + adObjName + "'");

                if (adObjsFound.length > 1) {
                    if (returnAllMatches) {
                        return adObjsFound;
                    } else {
                        throw new Error(
                            "More than one Active Directory object was found with the name '" +
                            adObjName + "'. Consider passing the objDistinguishedName parameter if " +
                            "it is expected that more than one object exists with the same name."
                        );
                    }
                } else if (adObjsFound.length > 0) {
                    adObj = adObjsFound[0];
                    this.log.debug("Found Active Directory object: " + adObjName);
                } else {
                    errorMessage = "No Active Directory object found for '" + adObjName +
                    "' of type '" + adObjType + "'";

                    if (throwOnNotFound) {
                        throw new Error(errorMessage);
                    } else {
                        this.log.warn(errorMessage);
                    }
                }
            } catch (e) {
                throw new Error("Find Active Directory object failed: " + e);
            }

            return adObj;
        };
    }

    return ActiveDirectoryService;
});