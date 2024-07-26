
const express = require('express');
const DBConnection = require('./db');
const Components = require('./components/index');



class Server {

    constructor() {
            this.port = process.env.PORT|| 4001;
            this.app = express();
            // this.initMiddleware();
            this.initializeDbConnection();
            this.initializeApp();
            // this.startServer();
        }
        initializeDbConnection() {
            this.connection = new DBConnection()
        }
        initializeApp() {
            this.setComponents();
            this.initMiddleware();
            this.initConfig();
        }
        setComponents() {
            this.components = new Components(this.app);
        }

        initMiddleware() {
            this.app.use(express.json())
        }
    
        initConfig() {
            this.app.set('port', this.port);
        }
      
    
        startServer() {  
            this.app.listen(this.port, () => {
                console.log(`Server is running on port : ${this.port}`); // eslint-disable-line no-console
            });
        }
    }
module.exports =Server ;

