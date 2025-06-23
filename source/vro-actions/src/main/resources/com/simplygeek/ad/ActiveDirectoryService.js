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
                "More than one Active Directory Host was found with the name '" +
                adHostName + "'"
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

            var adComputer = findAdObject.call(
                this,
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
                throw new ReferenceError("computerName is required and must be of type 'string'");
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit" &&
                System.getObjectType(parent) !== "AD:Group")) {
                throw new ReferenceError("parent container is required and must be of type " +
                                        "'AD:OrganizationalUnit' or 'AD:Group'");
            }
            if (domainName && typeof domainName !== "string") {
                throw new ReferenceError("domainName must be of type 'string'");
            }

            var existingAdComputer = findAdObject.call(this, "ComputerAD", computerName, null, false);

            if (existingAdComputer) {
                throw new Error("Failed to create Computer. The Computer '" + computerName +
                                "' already exists");
            }

            try {
                if (domainName) {
                    parent.createComputer(computerName, domainName);
                } else {
                    parent.createComputer(computerName);
                }
            } catch (e) {
                throw new Error("Failed to create Computer: " + e);
            }

            var adComputer = this.getComputer(computerName);

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
                adComputer.destroy();
            } catch (e) {
                throw new Error("Failed to remove AD Computer: " + e);
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

            var adGroup = findAdObject.call(
                this,
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

            var adOu = findAdObject.call(
                this,
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

            var adUser = findAdObject.call(
                this,
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
         * @returns {AD:User} Active Directory User object.
         */

        this.createUser = function(
            username,
            password,
            parent,
            domainName,
            displayName,
            description
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

            var existingAdUser = this.getUser(username, null, null, null, false);

            if (existingAdUser) {
                throw new Error(
                    "Failed to create User. The User '" + username +
                    "' already exists"
                );
            }

            // eslint-disable-next-line no-redeclare
            if (!domainName) var domainName;
            if (!displayName) displayName = username;

            try {
                parent.createUserWithPassword(
                    username,
                    password,
                    domainName,
                    displayName
                );
            } catch (e) {
                throw new Error("Failed to create User: " + e);
            }

            var adUser = this.getUser(username);

            if (description) adUser.setAttribute("description", description);

            return adUser;
        };

        /**
         * Remove an Active Directory user.
         * @function
         * @public
         * @param {AD:User} adUser - Active Directory User object.
         * @returns {void}
         */

        this.removeUser = function(adUser) {
            if (!adUser || System.getObjectType(adUser) !== "AD:User") {
                throw new ReferenceError(
                    "adUser is required and must be of type 'AD:User'"
                );
            }

            try {
                adUser.destroy();
            } catch (e) {
                throw new Error("Failed to remove AD User: " + e);
            }
        };

        /**
         * Get an Active Directory user group (security group).
         * @function
         * @public
         * @param {string} userGroupName - UserGroup name.
         * @param {string} userGroupDN - UserGroup Distinguished Name.
         * @param {string} [containerDn] - Optional container to search within.
         * @param {boolean} [returnAllMatches] - Return all matching objects.
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no object is found.
         * @returns {AD:UserGroup} The Active Directory UserGroup object.
         */

        this.getUserGroup = function(
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

            var adUserGroup = findAdObject.call(
                this,
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
         * Search for AD users matching a pattern within an optional specific OU.
         * @param {string} searchPattern The search pattern (e.g., "*John*").
         * @param {string} searchOU Distinguished Name (DN) of the OU to search in (e.g., "OU=Users,DC=example,DC=com").
         * @returns {Array/Any} Array of matched AD user objects.
         */

        this.searchADUsers = function(
            searchPattern,
            searchOU
        ) {
            if (!searchPattern || typeof searchPattern !== "string") {
                throw new Error("searchPattern is required and must be of type 'string'");
            }
            if (searchOU && typeof searchOU !== "string") {
                throw new Error("searchOU must be of type 'string'");
            }

            var adContainer;

            if (searchOU) {
                // Get the AD container for the specified OU
                adContainer = ActiveDirectory.getContainer(searchOU);

                if (!adContainer) {
                    throw new Error(
                        "Unable to retrieve the specified OU: " + searchOU + ". Check the DN and permissions."
                    );
                }
            } else {
                adContainer = ActiveDirectory.getRoot();
            }

            // Search users
            var userCriteria = "(&(objectClass=user)(cn=" + searchPattern + "))";
            var adUsers = adContainer.search(userCriteria, "subtree");

            return adUsers;
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

        var findAdObject = function(
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
            try {
                this.log.debug("Searching entire domain for objects matching '" + adObjName + "'");
                adObjsFound = ActiveDirectory.searchExactMatch(adObjType, adObjName, 10, this.adHost);
                this.log.debug("Found " + adObjsFound.length + " objects matching '" + adObjName + "'");

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
                }

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