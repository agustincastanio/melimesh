## Running the Sandbox

### Step 1: Install Docker and Docker Compose

### Step 2: Clone the repo, and start all containers

```
$ git clone https://github.com/agustincastanio/melimesh.git
$ cd melimesh/examples/
$ docker-compose up --build -d
$ docker-compose ps
```

### Step 3: Create new cluster

```
$ docker-compose exec front-envoy /bin/bash

$ cat > create_cluster.json << EOF
{
    "name": "service1",
    "connect_timeout": "1s",
    "lb_policy": "round_robin",
    "type": "strict_dns"
}
EOF

$ curl --header "Content-Type: application/json" \
  --request POST \
  --data @create_cluster.json \
  http://cds:3000/clusters
```

### Step 4: Add hosts to the cluster

```
$ cat > update_cluster.json << EOF
{
  "name": "service1",
  "connect_timeout": "1s",
  "lb_policy": "round_robin",
  "type": "strict_dns",
  "hosts": [
    {
      "socket_address": {
        "address": "host1",
        "port_value": 80
      }
    },
    {
      "socket_address": {
        "address": "host2",
        "port_value": 80
      }
    },
    {
      "socket_address": {
        "address": "host3",
        "port_value": 80
      }
    }
  ]
}
EOF

$ curl --header "Content-Type: application/json" \
  --request PUT \
  --data @update_cluster.json \
  http://cds:3000/cluster/service1
```

### Step 5: Verify envoy dynamic resources 

```
$ curl http://localhost:9901/config_dump

[...]

  "dynamic_active_clusters": [
    {
     "version_info": "0",
     "cluster": {
      "name": "service1",
      "type": "STRICT_DNS",
      "connect_timeout": "1s",
      "hosts": [
       {
        "socket_address": {
         "address": "host1",
         "port_value": 80
        }
       },
       {
        "socket_address": {
         "address": "host2",
         "port_value": 80
        }
       },
       {
        "socket_address": {
         "address": "host3",
         "port_value": 80
        }
       }
      ]
     },

[...]
```

### Step 6: Delete cluster 

```
$ curl --header "Content-Type: application/json" \
  --request DELETE \
  http://cds:3000/cluster/service1
```


## TODO
* Implement RDS,EDS,LDS
* Use proto3 and grpc