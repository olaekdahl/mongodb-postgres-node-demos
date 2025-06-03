import { MongoClient } from 'mongodb';
import path from 'path';

const client = new MongoClient('mongodb://localhost:27017', {
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

  await users.insertOne({ name: 'Alice' });
  const result = await users.findOne();
  console.log(result);
} catch (err) {
  console.error('Connection failed:', err);
} finally {
  await client.close();
}
