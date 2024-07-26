// import TaskTbl
const { TaskTbl } = require('../../modals/index');

class TaskModel {
    /**
     * Constructor for TaskModel class.
     * Initializes a new instance of TaskTbl.
     */
    constructor() {
        this.Task = TaskTbl;
    }

    /**
     * Fetches tasks based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to filter tasks.
     * @returns {Array} - An array containing the fetched tasks.
     */
    async get(whereObj) {
        try {
            const tasks = await this.Task.find(whereObj.tasks);
            return tasks;
        } catch (error) {
            return Error(`Error fetching task: ${error.message}`);
        }
    }

    /**
     * Creates a new task with the provided data.
     * @param {Object} data - The data object containing task details.
     * @returns {Object} - The created task object.
     */
    async post(data) {
        try {
            const result = await this.Task.create(data);
            return result;
        } catch (error) {
            return Error(`Error creating task: ${error.message}`);
        }
    }

    /**
     * Updates an existing task based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the task to update.
     * @param {Object} newData - The data object containing updated task details.
     * @returns {Object} - The result of the update operation.
     */
    async put(whereObj, newData) {
        try {
            const result = await this.Task.updateOne(whereObj, newData);
            return result;
        } catch (error) {
            return Error(`Error updating task: ${error.message}`);
        }
    }

    /**
     * Deletes a task based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the task to delete.
     * @returns {Object} - The result of the delete operation.
     */
    async delete(whereObj) {
        try {
            const result = await this.Task.deleteOne(whereObj);
            return result;
        } catch (error) {
            return Error(`Error deleting task: ${error.message}`);
        }
    }
}

module.exports = TaskModel;

