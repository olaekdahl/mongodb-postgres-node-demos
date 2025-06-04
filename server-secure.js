import { MongoClient } from 'mongodb';
import path from 'path';

// const uri = 'mongodb://appUser:Str0ngPW!@localhost:27017/securedb?authSource=securedb'
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {
  tls: true,
  tlsCAFile:           path.resolve('./mongo-certs/ca.pem'),
  tlsCertificateKeyFile: path.resolve('./mongo-certs/client.pem'),
//   tlsAllowInvalidHostnames: true
});

try {
  await client.connect();
  console.log('Connected to MongoDB with TLS');

  const db = client.db('securedb');
  const users = db.collection('users');

  await users.insertOne({ name: 'Bob' });
  const result = await users.find().toArray();
  console.log(result);
} catch (err) {
  console.error('Connection failed:', err);
} finally {
  await client.close();
}
