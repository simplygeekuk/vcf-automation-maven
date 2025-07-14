describe("Logger", function () {
    let systemLog, systemWarn, systemError, systemDebug;

    beforeEach(function () {
        System = {
            log: jasmine.createSpy("log"),
            warn: jasmine.createSpy("warn"),
            error: jasmine.createSpy("error"),
            debug: jasmine.createSpy("debug")
        };
    });

    var Logger = System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger();

    it("should throw a TypeError for non-string logSource", function () {
        expect(() => new Logger(123, "myAction")).toThrowError(TypeError, "logSource not of type 'string'");
    });

    it("should throw a ReferenceError for unsupported logSource", function () {
        expect(() => new Logger("invalidSource", "myAction")).toThrowError(ReferenceError);
    });

    it("should set type and name", function () {
        const logger = new Logger("action", "myAction");

        expect(logger.type).toEqual("action");
        expect(logger.name).toEqual("myAction");
    });

    it("should log an info message", function () {
        const logger = new Logger("action", "myAction");
        logger.info("Test message");

        expect(System.log).toHaveBeenCalledWith(
            "[action: myAction] Test message"
        );
    });

    it("should log an empty info message", function () {
        const logger = new Logger("action", "myAction");
        logger.info();

        expect(System.log).toHaveBeenCalledWith("[action: myAction]");
    });

    it("should log a warning message", function () {
        const logger = new Logger("workflow", "myWorkflow");
        logger.warn("Warning issued");

        expect(System.warn).toHaveBeenCalledWith("[workflow: myWorkflow] Warning issued");
    });

    it("should log an error message", function () {
        const logger = new Logger("action", "myAction");
        logger.error("An error occurred");

        expect(System.error).toHaveBeenCalledWith("[action: myAction] An error occurred");
    });

    it("should log a debug message", function () {
        const logger = new Logger("workflow", "debugFlow");
        logger.debug("Debugging...");

        expect(System.debug).toHaveBeenCalledWith("[workflow: debugFlow] Debugging...");
    });
});