const ProductivityController = require('./productivity.controller');

/**
 * ProductivityRoute class represents the route configuration for productivity-related endpoints.
 * It defines routes for fetching, creating, updating, and deleting productivity data.
 */
class ProductivityRoute {
    /**
     * Constructor for the ProductivityRoute class.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
        this.productivityController = new ProductivityController();
        this.initRoutes();
    }

    /**
     * Initializes the routes for productivity-related endpoints.
     */
    initRoutes() {
        // Route to fetch productivity data
        this.app.get('/productivity/fetch', (req, res) => {
            this.productivityController.fetchProductivity(req, res);
        });

        // Route to create productivity data
        this.app.post('/productivity/create', (req, res) => {
            this.productivityController.createProductivity(req, res);
        });

        // Route to update productivity data
        this.app.put('/productivity/update/:id', (req, res) => {
            this.productivityController.updateProductivity(req, res);
        });

        // Route to delete productivity data
        this.app.delete('/productivity/delete/:id', (req, res) => {
            this.productivityController.deleteProductivity(req, res);
        });
    }
}

module.exports = ProductivityRoute;
