
const UserController = require('./user.controller')

class UserRoute {
    constructor(app) {
        this.app = app;
        this.userController = new UserController();
        this.initRoutes();  
    }
    initRoutes() {

        this.app.post('/student/tasks/fetch', (req, res) => {
            this.userController.fetchTask(req, res)
        });

        this.app.post('/students/tasks/fetch', (req, res) => {
            this.userController.fetchTasks(req, res)
        });

        this.app.post('/student/users/fetch', (req, res) => {
            this.userController.fetchProductivity(req, res)
        });
        this.app.post('/students/users/fetch', (req, res) => {
            this.userController.fetchAllDetail(req, res)
        });
    }
}

module.exports = UserRoute;