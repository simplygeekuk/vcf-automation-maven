/**
 * Performs a graceful shutdown of the virtual machine. Optional to forcefully shutdown.
 * @param {VC:VirtualMachine} vcVirtualMachine - The vCenter VM object.
 *
 * @returns {void} - no return value.
 */
(function (
    vcVirtualMachine
){
    if (!vcVirtualMachine || System.getObjectType(vcVirtualMachine) !== "VC:VirtualMachine") {
        throw new ReferenceError(
            "vcVirtualMachine is required and must be of type 'VC:VirtualMachine'"
        );
    }

    var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
        "Action",
        "shutdownVM"
    );
    var timeout = 240;
    var pollingRate = 2;
    var vcTask;
    // Check VM power state
    var powerState = vcVirtualMachine.runtime.powerState.value;

    log.debug("VM Power State: " + powerState);

    if (powerState === "poweredOff") {
        log.info("VM is already powered off.");
    } else {
        // Check if VMware Tools is running
        var toolsStatus = vcVirtualMachine.guest.toolsRunningStatus;

        log.debug("VMware Tools Status: " + toolsStatus);

        if (toolsStatus === "guestToolsRunning") {
            try {
                log.info("Initiating Guest OS shutdown...");
                vcVirtualMachine.shutdownGuest();
                log.info("Guest OS shutdown initiated.");
                while (true) {
                    var status = vcVirtualMachine.runtime.powerState.value;

                    if (status === "poweredOff") {
                        break;
                    }
                    if (timeout <= 0) {
                        throw new Error("Timeout: VM '" + vcVirtualMachine.name + "' is still powered on");
                    }
                    log.info("Guest OS is still shutting down...");
                    timeout -= pollingRate;
                    System.sleep(pollingRate * 1000);
                }
                log.info("Guest OS shutdown complete.");
            } catch (e) {
                throw new Error("Failed to initiate Guest OS shutdown: " + e);
            }
        } else {
            try {
                log.info("VMware Tools not running or installed. Attempting forced power off...");
                vcTask = vcVirtualMachine.powerOffVM_Task();
                System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(
                    vcTask,
                    true,
                    pollingRate
                ) ;
                log.info("VM powered off forcefully.");
            } catch (e) {
                throw new Error("Failed to power off VM: " + e);
            }
        }
    }
});