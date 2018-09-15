module.exports = (app) => {
    const cds = require('../controllers/cds.controller.js');

    // Retrieve all clusters
    app.post('/v2/discovery:clusters', cds.findAll);
}