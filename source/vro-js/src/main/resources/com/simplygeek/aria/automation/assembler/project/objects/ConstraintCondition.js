/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the ConstraintCondition class.
     * @class
     * @param {Any} tag - The tag object to add.
     * @param {string} [enforcement] - The condition enforcement.
     * @param {string} [occurrence] - The condition occurrence.
     *
     * @returns {Any} Returns an instance of the ConstraintCondition Class.
     */

    function ConstraintCondition (
        tag,
        enforcement,
        occurrence
    ) {
        // Mandatory parameters, defaults and type checking.
        var validEnforcementTypes = [
            "HARD",
            "SOFT"
        ];
        var validOccurrenceTypes = [
            "MUST_OCCUR",
            "MUST_NOT_OCCUR"
        ];

        if (!tag || typeof tag !== "object") {
            throw new ReferenceError(
                "tag is required and must " +
                "be of type 'object'"
            );
        }
        if (enforcement && typeof enforcement !== "string") {
            throw new TypeError("enforcement not of type 'string'");
        } else if (enforcement && validEnforcementTypes.indexOf(enforcement.toUpperCase()) < 0) {
            throw new ReferenceError("Unsupported enforcement type '" + enforcement + "'." +
                                     " Supported enforcement types: " + validEnforcementTypes.join(", "));
        }
        if (occurrence && typeof occurrence !== "string") {
            throw new TypeError("occurrence not of type 'string'");
        } else if (occurrence && validOccurrenceTypes.indexOf(occurrence.toUpperCase()) < 0) {
            throw new ReferenceError("Unsupported occurrence type '" + occurrence + "'." +
                                     " Supported occurrence types: " + validOccurrenceTypes.join(", "));
        }

        // Construct Object
        this.type = "TAG";
        if (enforcement) this.enforcement = enforcement;
        this.occurrence = occurrence ? occurrence.toUpperCase() : "MUST_OCCUR";
        this.expression = tag;
    }

    return ConstraintCondition;
});