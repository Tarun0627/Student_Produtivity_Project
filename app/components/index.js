const User = require('./user/user.routes');
const Task = require('./task/task.routes');
const Productivity = require('./produtivity/productivity.routers');
const Student = require("./student/student.routes");
class Components {
    constructor(app) {
        this.app = app;
        this.initModules();
    }
    initModules() {
         const userObj = new User(this.app);
         const studentObj = new Student(this.app);
         const taskObj = new Task(this.app);
         const productivityObj = new Productivity(this.app);  
    }
}

module.exports = Components;
