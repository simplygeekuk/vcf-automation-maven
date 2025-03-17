/**
 * Performs a power on of a virtual machine.
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
        "startVM"
    );
    var timeout = 240;
    var pollingRate = 2;
    var vcTask;
    // Check VM power state
    var powerState = vcVirtualMachine.runtime.powerState.value;

    log.debug("VM Power State: " + powerState);

    if (powerState === "poweredOn") {
        log.info("VM is already powered on.");
    } else {
        try {
            log.info("Powering on VM.");
            vcTask = vcVirtualMachine.powerOnVM_Task();
            System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(
                vcTask,
                true,
                pollingRate
            );
            System.getModule("com.vmware.library.vc.vm.tools").vim3WaitToolsStarted(
                vcVirtualMachine,
                pollingRate,
                timeout
            );
            log.info("VM powered on successfully.");
        } catch (e) {
            throw new Error("Failed to power on VM: " + e);
        }
    }
});