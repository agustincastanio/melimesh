const Cluster = require('../models/cluster.model.js');

// Retrieve and return all clusters from the database.
exports.findAll = (req, res) => {
    Cluster.find({},'-_id')
    .then(clusters => {
        res.send({
            "version_info": "0",
            "resources": clusters
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clusters."
        });
    });
};