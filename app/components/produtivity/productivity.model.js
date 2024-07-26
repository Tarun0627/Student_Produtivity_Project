const { ProductivityTbl } = require('../../modals/index');

/**
 * productivityModel class represents the data access layer for productivity data.
 * It provides methods for interacting with the ProductivityTbl model.
 */
class productivityModel {
    /**
     * Constructor for the productivityModel class.
     * Initializes a new instance of ProductivityTbl.
     */
    constructor() {
        this.Productivity = ProductivityTbl;
    }

    /**
     * Fetches productivity data based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to filter productivity data.
     * @returns {Promise<Array>} - A promise that resolves to an array containing the fetched productivity data.
     */
    async get(whereObj) {
        try {
            const productivity = await this.Productivity.find(whereObj);
            return productivity;
        } catch (error) {
            return Error(`Error fetching productivity data: ${error.message}`);
        }
    }

    /**
     * Creates a new productivity data record with the provided data.
     * @param {Object} data - The data object containing productivity data details.
     * @returns {Promise<Object>} - A promise that resolves to the created productivity data object.
     */
    async post(data) {
        try {
            const result = await this.Productivity.create(data);
            return result;
        } catch (error) {
            return Error(`Error creating productivity data: ${error.message}`);
        }
    }

    /**
     * Updates an existing productivity data record based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the productivity data to update.
     * @param {Object} newData - The data object containing updated productivity data details.
     * @returns {Promise<Object>} - A promise that resolves to the result of the update operation.
     */
    async put(whereObj, newData) {
        try {
            const result = await this.Productivity.updateOne(whereObj, newData);
            return result;
        } catch (error) {
            return Error(`Error updating productivity data: ${error.message}`);
        }
    }

    /**
     * Deletes a productivity data record based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the productivity data to delete.
     * @returns {Promise<Object>} - A promise that resolves to the result of the delete operation.
     */
    async delete(whereObj) {
        try {
            const result = await this.Productivity.deleteOne(whereObj);
            return result;
        } catch (error) {
            return Error(`Error deleting productivity data: ${error.message}`);
        }
    }
}

module.exports = productivityModel;

