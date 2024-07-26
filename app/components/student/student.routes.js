const StudentController = require('./student.controller');

/**
 * StudentRoute class represents the route configuration for student-related endpoints.
 * It defines routes for fetching, creating, updating, and deleting student data.
 */
class StudentRoute {
    /**
     * Constructor for the StudentRoute class.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
        this.studentController = new StudentController();
        this.initRoutes();
    }

    /**
     * Initializes the routes for student-related endpoints.
     */
    initRoutes() {
        // Route to fetch student data
        this.app.get('/student/fetch', (req, res) => {
            this.studentController.fetchStudent(req, res);
        });

        // Route to create student data
        this.app.post('/student/create', (req, res) => {
            this.studentController.createStudent(req, res);
        });

        // Route to update student data
        this.app.put('/student/update/:id', (req, res) => {
            this.studentController.updateStudent(req, res);
        });

        // Route to delete student data
        this.app.delete('/student/delete/:id', (req, res) => {
            this.studentController.deleteStudent(req, res);
        });
    }
}

module.exports = StudentRoute;


