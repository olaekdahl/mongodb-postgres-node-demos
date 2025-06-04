# mongodb-node-demos

````bash
openssl genrsa -out ca.key 4096
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.pem -subj "/CN=MyMongoLocalCA"
openssl genrsa -out mongo.key 4096
openssl req -new -key mongo.key -out mongo.csr -subj "/CN=localhost"
openssl x509 -req -in mongo.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out mongo.crt -days 365 -sha256

openssl genrsa -out mongo-certs/client.key 4096

openssl req -new -key mongo-certs/client.key \
            -out mongo-certs/client.csr \
            -subj "/CN=nodeClient"

openssl x509 -req  -in  mongo-certs/client.csr \
             -CA  mongo-certs/ca.pem \
             -CAkey mongo-certs/ca.key \
             -CAcreateserial \
             -out mongo-certs/client.crt \
             -days 365 -sha256

cat mongo-certs/client.key mongo-certs/client.crt > mongo-certs/client.pem
````

````bash
sudo mongod \
  --dbpath /data/db \
  --tlsMode requireTLS \
  --tlsCertificateKeyFile ./mongo-certs/mongo.pem \
  --tlsCAFile           ./mongo-certs/ca.pem \
  --bind_ip 127.0.0.1 \
  --port 27017
````

````bash
sudo mongod --dbpath ~/data/db
````

````bash
mongosh --host localhost
use demo
db.demo.insertOne({ name: "alice", password: "superSecret123" })
````

````bash
use admin
db.createUser({
  user:  "mdbRoot",
  pwd:   "S3cure#PW",
  roles: [ { role: "root", db: "admin" } ]
})
````

````bash
use securedb 
db.createUser({
  user:  "appUser",
  pwd:   "Str0ngPW!",
  roles: [
     { role: "read", db: "securedb" },
  ]
})
````

````bash
sudo tshark -i lo -a duration:60 -d tcp.port==27017,mongo -w /tmp/mongo-cleartext.pcapng
````

````bash
sudo tshark -r /tmp/mongo-cleartext.pcapng -Y 'tcp.port == 27017' -d tcp.port==27017,mongo -O mongo
| less -R
````

