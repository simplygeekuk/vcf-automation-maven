/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the LockingService class.
     * @class
     *
     * @returns {Any} An instance of the LockingService class.
     */

    function LockingService() {
        this.log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
            "Action",
            "LockingService"
        );

        /**
         * Defines the createLock method.
         * @method
         * @public
         * @param {string} lockOwner - the lock owner.
         * @param {string} lockId - the unique (per lock) id.
         * @param {number} [retryMaxAttempts] - The maximum number of attempts to retry lock.
         * @param {number} [retryDelay] - The delay between retry attempts.
         * @param {boolean} [autoRemoveLock] - Auto remove the lock if one is already present and
         *                                     the max retry attempts has been reached.
         *
         * @returns {boolean} - Return the lock status.
         */

        this.createLock = function (
            lockOwner,
            lockId,
            retryMaxAttempts,
            retryDelay
        ) {
            if (!lockOwner || typeof lockOwner !== "string") {
                throw new ReferenceError(
                    "lockOwner is required and must " +
                    "be of type 'string'"
                );
            }
            if (!lockId || typeof lockId !== "string") {
                throw new ReferenceError(
                    "lockId is required and must " +
                    "be of type 'string'"
                );
            }
            if (retryMaxAttempts && typeof retryMaxAttempts !== "number") {
                throw new ReferenceError(
                    "retryMaxAttempts is required and must " +
                    "be of type 'number'"
                );
            }
            if (retryDelay && typeof retryDelay !== "number") {
                throw new ReferenceError(
                    "retryDelay is required and must " +
                    "be of type 'number'"
                );
            }

            retryMaxAttempts = retryMaxAttempts || 5;
            retryDelay = retryDelay || 60;
            var lockAcquired = false;
            var autoRemoveLock = autoRemoveLock !== false;
            var retryAttempt = 1;

            do {
                try {
                    this.log.debug(
                        "Creating lock for owner '" + lockOwner +
                        "' and id '" + lockId + "'"
                    );
                    lockAcquired = LockingSystem.lock(lockId,lockOwner);
                    if (lockAcquired) {
                        this.log.debug("Lock created successfully");
                        break;
                    } else {
                        this.log.debug(
                            "Failed to create lock, retrying..." +
                            retryAttempt + " of " + retryMaxAttempts
                        );
                    }
                } catch (e) {
                    throw new Error(
                        "Unexpected error occurred when trying to create lock: " + e
                    );

                }
                if (!lockAcquired && retryAttempt < retryMaxAttempts) {
                    System.sleep(retryDelay * 1000);
                }
                retryAttempt++;
            } while (!lockAcquired && (retryAttempt <= retryMaxAttempts));

            if (!lockAcquired) {
                if (autoRemoveLock) {
                    this.log.warn(
                        "Creating lock failed after " + retryMaxAttempts.toString() +
                        " attempts. Auto removing lock."
                    );
                    try {
                        this.log.debug("Attempting to remove lock");
                        LockingSystem.unlock(lockId,lockOwner);
                        this.log.debug("Lock removed successfully");

                        this.log.debug("Attempting to re-acquire lock");
                        lockAcquired = LockingSystem.lock(lockId,lockOwner);
                        if (lockAcquired) {
                            this.log.debug("Lock created successfully");
                        } else {
                            throw new Error(
                                "Failed to re-acquire lock"
                            );
                        }
                    } catch (e) {
                        throw new Error(
                            "Unexpected error occurred when trying to recreate lock: " + e
                        );
                    }
                } else {
                    throw new Error(
                        "Creating lock failed after " + retryMaxAttempts.toString() +
                        " attempts. Aborting."
                    );
                }
            }

            return lockAcquired;
        };

        /**
         * Defines the removeLock method.
         * @method
         * @public
         * @param {string} lockOwner - the lock owner.
         * @param {string} lockId - the unique (per lock) id.
         */

        this.removeLock = function (
            lockOwner,
            lockId
        ) {
            if (!lockOwner || typeof lockOwner !== "string") {
                throw new ReferenceError(
                    "lockOwner is required and must " +
                    "be of type 'string'"
                );
            }
            if (!lockId || typeof lockId !== "string") {
                throw new ReferenceError(
                    "lockId is required and must " +
                    "be of type 'string'"
                );
            }

            this.log.debug("Removing lock for owner '" + lockOwner + "' and id '" + lockId + "'");
            try {
                LockingSystem.unlock(lockId,lockOwner);
            } catch (e) {
                throw new Error("Unexpected error when trying to remove lock: " + e);
            }

            this.log.debug("Lock successfully removed");
        };
    }

    return LockingService;
});