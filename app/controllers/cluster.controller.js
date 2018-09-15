const Cluster = require('../models/cluster.model.js');

// Create and Save a new Cluster
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Cluster name can not be empty"
        });
    }

    // Create a Cluster
    const cluster = new Cluster({
        name: req.body.name,
        connect_timeout: req.body.connect_timeout,
        lb_policy: req.body.lb_policy,
        type: req.body.type,
        hosts: req.body.hosts
    });

    // Save Cluster in the database
    cluster.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Cluster."
            });
        });
};

// Retrieve and return all clusters from the database.
exports.findAll = (req, res) => {
    Cluster.find()
        .then(clusters => {
            res.send(clusters);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clusters."
            });
        });
};

// Find a single cluster with a name
exports.findOne = (req, res) => {
    Cluster.findOne({ name: req.params.name })
        .then(cluster => {
            if (!cluster) {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.name
                });
            }
            res.send(cluster);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving cluster with name " + req.params.name
            });
        });
};

// Update a cluster identified by the name in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Cluster name can not be empty"
        });
    }

    // Find cluster and update it with the request body
    Cluster.findOneAndUpdate({ name: req.params.name }, {
        connect_timeout: req.body.connect_timeout,
        lb_policy: req.body.lb_policy,
        type: req.body.type,
        hosts: req.body.hosts
    }, { new: true })
        .then(cluster => {
            if (!cluster) {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.name
                });
            }
            res.send(cluster);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.cluster
                });
            }
            return res.status(500).send({
                message: "Error updating cluster with name " + req.params.name
            });
        });
};

// Delete a cluster with the specified name in the request
exports.delete = (req, res) => {
    Cluster.findOneAndRemove({ name: req.params.name })
        .then(cluster => {
            if (!cluster) {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.name
                });
            }
            res.send({ message: "Cluster deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cluster not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Could not delete cluster with name " + req.params.name
            });
        });
};