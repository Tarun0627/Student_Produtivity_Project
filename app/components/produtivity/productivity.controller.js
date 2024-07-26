const ProductivityModel = require('../produtivity/productivity.model');

class ProductivityController {
    constructor() {
        this.Productivity = new ProductivityModel();
    }

    /**
     * Creates a new productivity record.
     * @param {Object} req - The request object containing the data for the new productivity record.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async createProductivity(req, res, next) {
        try {
            console.log('Creating Productivity');
            const productivity = await this.Productivity.post(req.body);
            res.json(productivity);
        } catch (error) {
            console.error("Error occurred while creating productivity data", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Fetches productivity data based on the specified criteria.
     * @param {Object} req - The request object containing criteria for fetching productivity data.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async fetchProductivity(req, res, next) {
        try {
            const productivityData = await this.Productivity.get(req.body);
            res.json(productivityData);
        } catch (error) {
            console.error("Error occurred while fetching productivity data", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Updates an existing productivity record.
     * @param {Object} req - The request object containing the ID of the productivity record to update and the new data.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async updateProductivity(req, res, next) {
        try {
            console.log('updateProductivity');
            const productivityId = req.params.id;
            const newData = req.body;
            const result = await this.Productivity.put({ _id: productivityId }, newData);
            res.json(result);
        } catch (error) {
            console.error("Error occurred while updating productivity data", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Deletes a productivity record.
     * @param {Object} req - The request object containing the ID of the productivity record to delete.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async deleteProductivity(req, res, next) {
        try {
            const productivityId = req.params.id;
            const result = await this.Productivity.delete({ _id: productivityId });
            res.json(result);
        } catch (error) {
            console.error("Error occurred while deleting productivity data", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductivityController;


