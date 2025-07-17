const path = require("path");

const filename = path.basename(__filename, ".test.js");

describe("LockingService", function () {
    let capturedName;

    beforeEach(function () {
        const loggerInstance = {
            debug: jasmine.createSpy("debug"),
            warn: jasmine.createSpy("warn"),
            info: jasmine.createSpy("info"),
            error: jasmine.createSpy("error"),
        };

        function LoggerConstructor(type, name) {
            capturedName = name;
            return loggerInstance;
        }

        const getModuleMock = jasmine
            .createSpy("getModule")
            .and.callFake(function (moduleName) {
                if (moduleName === "com.simplygeek.vcf.orchestrator.logging") {
                    return {
                        Logger: jasmine
                            .createSpy("Logger")
                            .and.returnValue(LoggerConstructor),
                    };
                }
                // if (moduleName === "com.simplygeek.vcf.orchestrator.locking") {
                //     return {
                //         LockingService: require(path.resolve(
                //             __dirname,
                //             "../../../../../../../main/resources/com/simplygeek/vcf/orchestrator/locking/LockingService"
                //         ))
                //     }
                // }
                throw new Error("Unknown module: " + moduleName);
            });

        System = {
            getModule: getModuleMock,
            sleep: jasmine.createSpy("sleep"),
        };

        LockingSystem = {
            lock: jasmine.createSpy("lock"),
            unlock: jasmine.createSpy("unlock"),
        };
    });

    const LockingService = System.getModule(
        "com.simplygeek.vcf.orchestrator.locking"
    ).LockingService();

    it("should pass the filename as log name", function () {
        const expectedFileName = path
            .basename(__filename, ".test.js")
            .replace(".", "");
        const lockingService = new LockingService();

        expect(capturedName).toBe(expectedFileName);
    });

    it("should successfully acquire a lock on first attempt", function () {
        LockingSystem.lock.and.returnValue(true);

        const lockingService = new LockingService();
        const result = lockingService.createLock("user1", "lock1");

        expect(result).toBeTrue();
        expect(LockingSystem.lock).toHaveBeenCalledWith("lock1", "user1");
        expect(System.sleep).not.toHaveBeenCalled();
        expect(lockingService.log.debug).toHaveBeenCalledWith(
            "Creating lock for owner 'user1' and id 'lock1'"
        );

        expect(lockingService.log.debug).toHaveBeenCalledWith(
            "Lock created successfully"
        );
    });

    it("should retry acquiring lock before succeeding", function () {
        LockingSystem.lock.and.returnValues(false, true);

        const lockingService = new LockingService();
        const result = lockingService.createLock("user2", "lock2", 2, 1);

        expect(result).toBeTrue();
        expect(System.sleep).toHaveBeenCalled();
    });

    it("should auto-remove and reacquire lock if retries exhausted", function () {
        LockingSystem.lock.and.returnValues(false, false, true);

        const lockingService = new LockingService();
        const result = lockingService.createLock("user3", "lock3", 2, 1, true);

        expect(result).toBeTrue();
        expect(LockingSystem.unlock).toHaveBeenCalledWith("lock3", "user3");
    });

    it("should throw if autoRemoveLock is false and retries exhausted", function () {
        LockingSystem.lock.and.returnValue(false);

        const lockingService = new LockingService();

        expect(function () {
            lockingService.createLock("user4", "lock4", 1, 1, false);
        }).toThrowError("Creating lock failed after 1 attempts. Aborting.");
    });

    it("should successfully remove a lock", function () {
        const lockingService = new LockingService();

        lockingService.removeLock("user5", "lock5");

        expect(LockingSystem.unlock).toHaveBeenCalledWith("lock5", "user5");
    });

    it("should throw if unlock fails", function () {
        LockingSystem.unlock.and.throwError("Unlock failed");

        const lockingService = new LockingService();

        expect(function () {
            lockingService.removeLock("user6", "lock6");
        }).toThrowError(/Unlock failed/);
    });
});
