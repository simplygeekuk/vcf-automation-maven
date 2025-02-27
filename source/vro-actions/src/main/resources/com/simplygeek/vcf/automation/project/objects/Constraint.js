/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the Constraint class.
     * @class
     * @param {Array/Any} conditions - The Constraint conditions.
     *
     * @returns {Any} Returns an instance of the Constraint Class.
     */

    function Constraint (
        conditions
    ) {
        // Mandatory parameters, defaults and type checking.
        if (!conditions || !Array.isArray(conditions)) {
            throw new TypeError("conditions is required and must be of type 'Array/object'");
        } else if (conditions && conditions.length > 0) {
            conditions.forEach(
                function(item) {
                    if (typeof item !== "object") {
                        throw new TypeError("conditions not of type 'Array/object'");
                    }
                }
            );
        }

        // Construct Object
        this.conditions = conditions;
    }

    return Constraint;
});