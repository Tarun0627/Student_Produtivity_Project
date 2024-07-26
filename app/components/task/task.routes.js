const TaskController = require('./task.controller');

/**
 * TaskRoute class represents the route configuration for task-related endpoints.
 * It defines routes for fetching, creating, updating, and deleting tasks.
 */
class TaskRoute {
    /**
     * Constructor for the TaskRoute class.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
        this.taskController = new TaskController();
        this.initRoutes();
    }

    /**
     * Initializes the routes for task-related endpoints.
     */
    initRoutes() {
        // Route to fetch tasks
        this.app.get('/student/task/fetch', (req, res) => {
            this.taskController.fetchTask(req, res);
        });

        // Route to create a task
        this.app.post('/student/task/create', (req, res) => {
            this.taskController.createTask(req, res);
        });

        // Route to update a task
        this.app.put('/student/task/update/:id', (req, res) => {
            this.taskController.updateTask(req, res);
        });

        // Route to delete a task
        this.app.delete('/student/task/delete/:id', (req, res) => {
            this.taskController.deleteTask(req, res);
        });
    }
}

module.exports = TaskRoute;
