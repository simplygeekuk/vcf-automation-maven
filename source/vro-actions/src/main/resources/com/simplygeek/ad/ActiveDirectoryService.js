/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the ActiveDirectoryService class.
     * @class
     * @param {string} adHostName - Active Directory Hostname.
     *
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
            throw new Error("More than one Active Directory Host was found with the name '" +
                            adHostName + "'");
        } else if (adHostsFound.length > 0) {
            var adHost = adHostsFound[0];

            this.log.debug("Found Active Directory host '" + adHostName + "'");
            this.adHost = adHost;
        } else {
            throw new Error("No Active Directory Host found with the name '" +
                            adHostName + "'");
        }

        /**
         * Defines the getAdHost method.
         * @method
         * @public
         *
         * @returns {AD:AdHost} Active Directory Host object.
         */

        this.getAdHost = function() {
            return this.adHost;
        };

        /**
         * Defines the getComputer method.
         * @method
         * @public
         * @param {string} computerName - Computer name.
         * @param {boolean} throwOnNotFound - Whether to throw an exception if no
         *                                    object is found.
         *
         * @returns {AD:ComputerAD} Active Directory Computer object.
         */

        this.getComputer = function(
            computerName,
            throwOnNotFound
        ) {
            if (!computerName || typeof computerName !== "string") {
                throw new ReferenceError("computerName is required and must be of type 'string'");
            }

            var adComputer = findAdObject.call(this, "ComputerAD", computerName, null, throwOnNotFound);

            return adComputer;
        };

        /**
         * Defines the createComputer method.
         * @method
         * @public
         * @param {string} computerName - Computer name.
         * @param {Any} parent - Parent container.
         * @param {string} [domainName] - Domain name.
         *
         * @returns {AD:ComputerAD} Active Directory Computer object.
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
         * Defines the removeComputer method.
         * @method
         * @public
         * @param {AD:ComputerAD} adComputer - Active Directory Computer object.
         *
         * @returns {void}
         */

        this.removeComputer = function(adComputer) {
            if (!adComputer || System.getObjectType(adComputer) !== "AD:ComputerAD") {
                throw new ReferenceError("adComputer is required and must be of type 'AD:ComputerAD'");
            }

            try {
                adComputer.destroy();
            } catch (e) {
                throw new Error("Failed to remove AD Computer: " + e);
            }
        };

        /**
         * Defines the getAdGroup method.
         * @method
         * @public
         * @param {string} groupName - Group name.
         * @param {string} [groupDN] - Group Distinguished Name.
         * @param {boolean} throwOnNotFound - Whether to throw an exception if no
         *                                    object is found.
         *
         * @returns {AD:Group} Active Directory Group object.
         */

        this.getGroup = function(
            groupName,
            groupDN,
            throwOnNotFound
        ) {
            if (!groupName || typeof groupName !== "string") {
                throw new ReferenceError("groupName is required and must be of type 'string'");
            }
            if (groupDN && typeof groupDN !== "string") {
                throw new ReferenceError("groupDN must be of type 'string'");
            }

            var adGroup = findAdObject.call(this, "Group", groupName, groupDN, throwOnNotFound);

            return adGroup;
        };

        /**
         * Defines the getOrganizationalUnit method.
         * @method
         * @public
         * @param {string} ouName - OrganizationalUnit Name.
         * @param {string} [ouDN] - OrganizationalUnit Distinguished Name.
         * @param {boolean} throwOnNotFound - Whether to throw an exception if no
         *                                    object is found.
         *
         * @returns {AD:OrganizationUnit} Active Directory OU object.
         */

        this.getOrganizationalUnit = function(
            ouName,
            ouDN,
            throwOnNotFound
        ) {
            if (!ouName || typeof ouName !== "string") {
                throw new ReferenceError("ouName is required and must be of type 'string'");
            }
            if (ouDN && typeof ouDN !== "string") {
                throw new ReferenceError("ouDN must be of type 'string'");
            }

            var adOu = findAdObject.call(this, "OrganizationalUnit", ouName, ouDN, throwOnNotFound);

            return adOu;
        };

        /**
         * Defines the getUser method.
         * @method
         * @public
         * @param {string} username - User name.
         * @param {boolean} throwOnNotFound - Whether to throw an exception if no
         *                                    object is found.
         *
         * @returns {AD:User} Active Directory User object.
         */

        this.getUser = function(
            username,
            throwOnNotFound
        ) {
            if (!username || typeof username !== "string") {
                throw new ReferenceError("username is required and must be of type 'string'");
            }

            var adUser = findAdObject.call(this, "User", username, null, throwOnNotFound);

            return adUser;
        };

        /**
         * Defines the createUser method.
         * @method
         * @public
         * @param {string} username - User Account name.
         * @param {string} password - User Account password.
         * @param {Any} parent - Parent container.
         * @param {string} [domainName] - Domain name.
         * @param {string} [displayName] - Display name.
         *
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
                throw new ReferenceError("username is required and must be of type 'string'");
            }
            if (!password || typeof password !== "string") {
                throw new ReferenceError("password is required and must be of type 'SecureString' " +
                                        "or 'string");
            }
            if (!parent || (System.getObjectType(parent) !== "AD:OrganizationalUnit" &&
                System.getObjectType(parent) !== "AD:Group")) {
                throw new ReferenceError("parent container is required and must be of type " +
                                        "'AD:OrganizationalUnit' or 'AD:Group'");
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

            var existingAdUser = this.getUser(username, false);

            if (existingAdUser) {
                throw new Error("Failed to create User. The User '" + username +
                                "' already exists");
            }

            // eslint-disable-next-line no-redeclare
            if (!domainName) var domainName;
            if (!displayName) displayName = username;

            try {
                parent.createUserWithPassword(username, password, domainName, displayName);
            } catch (e) {
                throw new Error("Failed to create User: " + e);
            }

            var adUser = this.getUser(username);

            if (description) adUser.setAttribute("description", description);

            return adUser;
        };

        /**
         * Defines the removeUser method.
         * @method
         * @public
         * @param {AD:User} adUser - Active Directory User object.
         *
         * @returns {void}
         */

        this.removeUser = function(adUser) {
            if (!adUser || System.getObjectType(adUser) !== "AD:User") {
                throw new ReferenceError("adUser is required and must be of type 'AD:User'");
            }

            try {
                adUser.destroy();
            } catch (e) {
                throw new Error("Failed to remove AD User: " + e);
            }
        };

        /**
         * Defines the getUserGroup method.
         * @method
         * @public
         * @param {string} userGroupName - UserGroup name.
         * @param {string} userGroupDN - UserGroup Distinguished Name.
         * @param {boolean} throwOnNotFound - Whether to throw an exception if no
         *                                    object is found.
         *
         * @returns {AD:UserGroup} Active Directory UserGroup object.
         */

        this.getUserGroup = function(
            userGroupName,
            userGroupDN,
            throwOnNotFound
        ) {
            if (!userGroupName || typeof userGroupName !== "string") {
                throw new ReferenceError("userGroupName is required and must be of type 'string'");
            }
            if (!userGroupDN || typeof userGroupDN !== "string") {
                throw new ReferenceError("userGroupDN is required and must be of type 'string'");
            }

            var adUserGroup = findAdObject.call(this, "UserGroup", userGroupName, userGroupDN, throwOnNotFound);

            return adUserGroup;
        };

        /**
         * Search for AD users matching a pattern within an optional specific OU.
         *
         * @param {string} searchPattern The search pattern (e.g., "*John*").
         * @param {string} searchOU Distinguished Name (DN) of the OU to search in (e.g., "OU=Users,DC=example,DC=com").
         *
         * @return {Array/Any} Array of matched AD user objects.
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
         * Defines the findAdObject method.
         * @method
         * @private
         * @param {string} adObjType - AD Object Type.
         * @param {string} adObjName - AD Object Name.
         * @param {string} [objDistinguishedName] - The AD Object DN (helps to pass this
         *                                          if there are multiple objects with the
         *                                          same name).
         * @param {boolean} [throwOnNotFound] - Whether to throw an exception if no
         *                                      object is found.
         *
         * @returns {Any} Active Directory object.
         */

        var findAdObject = function(
            adObjType,
            adObjName,
            objDistinguishedName,
            throwOnNotFound
        ) {
            var adObj;
            var adObjs;
            var adObjsFound;

            // Default throwOnNotFound to true, unless explicitly set to false.
            throwOnNotFound = throwOnNotFound !== false;

            this.log.debug("Finding Active Directory object with name '" + adObjName +
                            "' of type '" + adObjType + "'");
            try {
                adObjs = ActiveDirectory.search(adObjType, adObjName, this.adHost);
            } catch (e) {
                throw new Error("Find Active Directory object failed: " + e);
            }

            adObjsFound = adObjs.filter(
                function(adObj) {
                    return adObj.name.toLowerCase() === adObjName.toLowerCase();
                }
            );

            if (adObjsFound.length > 1) {
                if (objDistinguishedName) {
                    this.log.debug("Extending search using Distinguished Name '" + objDistinguishedName + "'");
                    for (var i = 0; i < adObjsFound.length; i++) {
                        if (adObjsFound[i].distinguishedName.toLowerCase() === objDistinguishedName.toLowerCase()) {
                            adObj = adObjsFound[i];
                        }
                    }
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
                var errorMessage = "No Active Directory object found for '" + adObjName +
                "' of type '" + adObjType + "'";

                if (throwOnNotFound) {
                    throw new Error(errorMessage);
                } else {
                    this.log.warn(errorMessage);
                }
            }

            return adObj;
        };
    }

    return ActiveDirectoryService;
});