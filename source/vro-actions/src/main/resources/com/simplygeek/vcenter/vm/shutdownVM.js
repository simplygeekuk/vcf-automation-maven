/**
 * Performs a graceful shutdown of the virtual machine.
 * @param {VC:VirtualMachine} vcVirtualMachine - The vCenter VM object.
 * @param {boolean} forceShutdown - Whether to forcefully power off if graceful shutdown fails.
 *
 * @returns {void} - no return value.
 */
(function (
    vcVirtualMachine,
    forceShutdown
){
    if (!vcVirtualMachine || System.getObjectType(vcVirtualMachine) !== "VC:VirtualMachine") {
        throw new ReferenceError(
            "vcVirtualMachine is required and must be of type 'VC:VirtualMachine'"
        );
    }
    if (typeof forceShutdown !== "boolean") {
        throw new ReferenceError(
            "Invalid input: forceShutdown must be a boolean (true or false)."
        );
    }

    var log = new (System.getModule("com.simplygeek.aria.orchestrator.logging").Logger())(
        "Action",
        "shutdownVM"
    );
    // Check VM power state
    var powerState = vcVirtualMachine.runtime.powerState;

    log.info("VM Power State: " + powerState);

    if (powerState === "poweredOff") {
        log.info("VM is already powered off.");
    } else {
        // Check if VMware Tools is running
        var toolsStatus = vcVirtualMachine.guest.toolsRunningStatus;

        log.info("VMware Tools Status: " + toolsStatus);

        if (toolsStatus === "guestToolsRunning") {
            try {
                log.info("Initiating Guest OS shutdown...");
                vcVirtualMachine.shutdownGuest();  // Graceful shutdown via VMware Tools
                log.info("Guest OS shutdown initiated.");
            } catch (e) {
                log.error("Error shutting down guest: " + e);
                throw "Failed to initiate Guest OS shutdown.";
            }
        } else {
            try {
                log.info("VMware Tools not running or installed. Attempting Power Off...");
                vcVirtualMachine.powerOffVM_Task(); // Force shutdown if tools are unavailable
                return "VM powered off forcefully.";
            } catch (e) {
                log.error("Error powering off VM: " + e);
                throw "Failed to power off VM.";
            }
        }
    }
});