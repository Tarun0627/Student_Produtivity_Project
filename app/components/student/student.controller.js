const StudentModel = require("./students.model");

class StudentController {
    constructor() {
        this.Student = new StudentModel();
    }

    /**
     * Creates a new student record.
     * @param {Object} req - The request object containing the data for the new student record.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async createStudent(req, res, next) {
        try {
            const task = await this.Student.post(req.body);
            res.json(task);
        } catch (error) {
            console.error("Error occurred while creating a task for the student", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Fetches tasks for a specific student.
     * @param {Object} req - The request object containing the student ID.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async fetchStudent(req, res, next) {
        try {
            const studentId = req.params.d; 
            const tasks = await this.Student.get({ studentId });
            res.json(tasks);
        } catch (error) {
            console.error("Error occurred while fetching tasks for the student", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Updates a task for a specific student.
     * @param {Object} req - The request object containing the task ID and the new data.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async updateStudent(req, res, next) {
        try {
            const taskId = req.params.id;
            const newData = req.body;
            const result = await this.Student.put({ _id: taskId }, newData);
            res.json(result);
        } catch (error) {
            console.error("Error occurred while updating the student task", error.message);
            res.status(500).json({ error: error.message });
        }
    }
    /**
     * Deletes a task for a specific student.
     * @param {Object} req - The request object containing the task ID.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async deleteStudent(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const result = await this.Student.delete({ _id: taskId });
            res.json(result);
        } catch (error) {
            console.error("Error occurred while deleting the student task", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = StudentController;





