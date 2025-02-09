/**
 * Executes the provided command in the virtual machine using Guest Tools
 * @param {VC:VirtualMachine} vcVirtualMachine - The vCenter VirtualMachine.
 * @param {string} guestUsername - The username used for guest login.
 * @param {SecureString} guestPassword - The password used for guest login.
 * @param {string} commandPath - The absolute command path.
 * @param {string} commandArguments - The arguments to pass to the command (Optional).
 * @param {number} expectedExitCode - The expected exit code (Optional).
 * @param {string} workingDirectory - The command working directory (Optional).
 * @param {Array/string} environmentVariables - The environment variables to set (Optional).
 * @param {number} maxWaitTime - The maximum wait time in seconds (Optional).
 *
 * @returns {void} - no return value.
 */
(function (
    vcVirtualMachine,
    guestUsername,
    guestPassword,
    commandPath,
    commandArguments,
    expectedExitCode,
    workingDirectory,
    environmentVariables,
    maxWaitTime
) {
    if (!vcVirtualMachine || System.getObjectType(vcVirtualMachine) !== "VC:VirtualMachine") {
        throw new ReferenceError(
            "vcVirtualMachine is required and must be of type 'VC:VirtualMachine'"
        );
    }
    if (!guestUsername || typeof guestUsername !== "string") {
        throw new ReferenceError("guestUsername is required and must be of type 'string'");
    }
    if (!guestPassword || typeof guestPassword !== "string") {
        throw new ReferenceError("guestPassword is required and must be of type 'string'");
    }
    if (!commandPath || typeof commandPath !== "string") {
        throw new ReferenceError("commandPath is required and must be of type 'string'");
    }
    if (!commandPath || typeof commandPath !== "string") {
        throw new ReferenceError("commandPath is required and must be of type 'string'");
    }
    if (commandArguments && typeof commandArguments !== "string") {
        throw new TypeError("commandArguments must be of type 'string'");
    }
    if (workingDirectory && typeof workingDirectory !== "string") {
        throw new TypeError("commandArguments must be of type 'string'");
    }
    if (environmentVariables && !Array.isArray(environmentVariables)) {
        throw new ReferenceError("environmentVariables is required and must be of type 'Array/string'");
    } else if (environmentVariables && environmentVariables.length > 0) {
        environmentVariables.forEach(
            function(item) {
                if (typeof item !== "object") {
                    throw new TypeError("environmentVariables not of type 'Array/string'");
                }
            }
        );
    }
    if (!vcVirtualMachine.guest ||
        !vcVirtualMachine.guest.toolsRunningStatus ||
        vcVirtualMachine.guest.toolsRunningStatus !== "guestToolsRunning") {
        throw new Error("VMware Tools is not running on the VM. Ensure it is installed and operational.");
    }

    var log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
        "Action",
        "runCommandInGuest"
    );

    if (maxWaitTime <= 0 || typeof maxWaitTime !== "number" || isNaN(maxWaitTime)) {
        log.warn("Invalid or missing maxWaitTime. Using default value: 300 seconds.");
        maxWaitTime = 300;
    }
    if (expectedExitCode <= 0 || typeof expectedExitCode !== "number" || isNaN(expectedExitCode)) {
        log.warn("Invalid or missing expectedExitCode. Using default value: 0.");
        expectedExitCode = 0;
    }

    var interactiveSession = false;
    var sdkConnection = vcVirtualMachine.sdkConnection;
    var guestOperationsManager = sdkConnection.guestOperationsManager;
    var guestAuth = new VcNamePasswordAuthentication();
    var guestProgramSpec = new VcGuestProgramSpec();
    var processManager = guestOperationsManager.processManager;
    var pid;
    var sleepInterval = 5; // Polling interval in seconds
    var elapsedTime = 0;

    // Execute the command
    try {
        // Set Guest Authentication
        guestAuth.username = guestUsername;
        guestAuth.password = guestPassword;
        guestAuth.interactiveSession = interactiveSession;

        // Set Guest ProgramSpec
        guestProgramSpec.programPath = commandPath;
        guestProgramSpec.arguments = commandArguments;
        if (workingDirectory) guestProgramSpec.workingDirectory = workingDirectory;
        if (environmentVariables && environmentVariables.length > 0) guestProgramSpec.envVariables = environmentVariables;

        try {
            pid = processManager.startProgramInGuest(vcVirtualMachine, guestAuth, guestProgramSpec);
            log.info("Command executed successfully. Process ID: " + pid);
        } catch (e) {
            throw new Error(e.message);
        }

        log.info("Waiting for process " + pid + " to complete...");
        while (elapsedTime < maxWaitTime) {
            var processes = processManager.listProcessesInGuest(vcVirtualMachine, guestAuth, [pid]);

            if (processes.length > 0) {
                var process = processes[0];

                if (process.endTime !== null) {
                    log.info("Process completed with exit code: " + process.exitCode);
                    log.debug(process);
                    if (process.exitCode !== expectedExitCode) {
                        throw new Error("Unexpected exit code: " + process.exitCode);
                    }
                    break;
                }
            } else {
                log.warn("Process not found. It may have already completed.");
                break;
            }

            log.info("Process " + pid + " is still running...");
            System.sleep(sleepInterval * 1000);
            elapsedTime += sleepInterval;
        }

        // If the process did not complete within the timeout.
        if (process.endTime === null) {
            throw new Error("Process did not complete within " + maxWaitTime + " seconds.");
        }
    } catch (e) {
        throw new Error("Failed to execute command: " + e.message);
    }
});