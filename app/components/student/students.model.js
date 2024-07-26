const { Student } = require('../../modals/index');

/**
 * StudentModel class represents the data access layer for students.
 * It provides methods for interacting with the Student model.
 */
class StudentModel {
    /**
     * Constructor for the StudentModel class.
     * Initializes a new instance of Student.
     */
    constructor() {
        this.Student = Student;
    }

    /**
     * Fetches students based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to filter students.
     * @returns {Promise<Array>} - A promise that resolves to an array containing the fetched students.
     */
    async get(whereObj) {
        try {
            const students = await this.Student.find(whereObj);
            return students;
        } catch (error) {
            return Error(`Error fetching students: ${error.message}`);
        }
    }

    /**
     * Creates a new student with the provided data.
     * @param {Object} data - The data object containing student details.
     * @returns {Promise<Object>} - A promise that resolves to the created student object.
     */
    async post(data) {
        try {
            const result = await this.Student.create(data);
            return result;
        } catch (error) {
            return Error(`Error creating student: ${error.message}`);
        }
    }

    /**
     * Updates an existing student based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the student to update.
     * @param {Object} newData - The data object containing updated student details.
     * @returns {Promise<Object>} - A promise that resolves to the result of the update operation.
     */
    async put(whereObj, newData) {
        try {
            const result = await this.Student.updateOne(whereObj, newData);
            return result;
        } catch (error) {
            return Error(`Error updating students: ${error.message}`);
        }
    }

    /**
     * Deletes a student based on the provided criteria.
     * @param {Object} whereObj - The criteria object used to identify the student to delete.
     * @returns {Promise<Object>} - A promise that resolves to the result of the delete operation.
     */
    async delete(whereObj) {
        try {
            const result = await this.Student.deleteOne(whereObj);
            return result;
        } catch (error) {
            return Error(`Error deleting students: ${error.message}`);
        }
    }
}

module.exports = StudentModel;
