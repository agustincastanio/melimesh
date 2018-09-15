const mongoose = require('mongoose');

const ClusterSchema = mongoose.Schema({
    '@type': {
        type: 'String',
        default: "type.googleapis.com/envoy.api.v2.Cluster"
    },
    name: {
        type: 'String',
        unique : true, 
        required : true
    },
    connect_timeout: {
        type: 'String'
    },
    lb_policy: {
        type: 'String'
    },
    type: {
        type: 'String'
    },
    hosts: {
        type: [
            'Mixed'
        ],
        default: []
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Cluster', ClusterSchema);