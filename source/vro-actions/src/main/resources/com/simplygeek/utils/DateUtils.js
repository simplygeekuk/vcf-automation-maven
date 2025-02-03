/**
 * Write a brief description of the purpose of the action.
 * @returns {Any} - describe the return type as well
 */
(function () {
    /**
     * Defines the DateUtils class.
     * @class
     *
     * @returns {Any} Returns an instance of the DateUtils Class.
     */

    function DateUtils () {}

    /**
     * Defines the addMonthsToDate method.
     * @method
     * @public
     * @param {Date} inputDate - The input date.
     * @param {number} months - The number of months to add/remove from the inputDate.
     *                          Note: This can also be a negative value.
     *
     * @returns {Date} The updated Date.
     */

    DateUtils.prototype.addMonthsToDate = function (
        inputDate,
        months
    ) {
        if (!inputDate || !(inputDate instanceof Date)) {
            throw new ReferenceError(
                "inputDate is required and must " +
                "be of type 'Date'"
            );
        }
        if (!months || typeof months !== "number") {
            throw new ReferenceError(
                "months is required and must " +
                "be of type 'number' and a value other than 0"
            );
        }
        var dateUpdated = inputDate;
        var month = (inputDate.getUTCMonth() + months) % 12;
        //create a new Date object that gets the last day of the desired month
        var last = new Date(inputDate.getUTCFullYear(), month + 1, 0);

        //compare dates and set appropriately
        if (inputDate.getDate() <= last.getDate()) {
            dateUpdated.setMonth(month);
        } else {
            dateUpdated.setMonth(month, last.getDate());
        }

        return dateUpdated;
    };

    /**
     * Defines the getISODate method.
     * @method
     * @public
     * @param {Date} inputDate - The input date.
     *
     * @returns {Date} The Date in ISO 8601 format (YYYY-MM-DD).
     */

    DateUtils.prototype.getISODate = function (
        inputDate
    ) {
        if (!inputDate || !(inputDate instanceof Date)) {
            throw new ReferenceError(
                "inputDate is required and must " +
                "be of type 'Date'"
            );
        }

        var month = inputDate.getUTCMonth() + 1; // months from 1-12
        var day = inputDate.getUTCDate();
        var year = inputDate.getUTCFullYear();
        var dateISOFormat = year + "-" + month + "-" + day;

        return dateISOFormat;
    };

    return DateUtils;
});