module.exports = (app) => {
    const clusters = require('../controllers/cluster.controller.js');

    // Create a new Cluster
    app.post('/clusters', clusters.create);

    // Retrieve all Cluster
    app.get('/clusters', clusters.findAll);

    // Retrieve a single Cluster with name
    app.get('/cluster/:name', clusters.findOne);

    // Update a Cluster with name
    app.put('/cluster/:name', clusters.update);

    // Delete a Cluster with name
    app.delete('/cluster/:name', clusters.delete);
}