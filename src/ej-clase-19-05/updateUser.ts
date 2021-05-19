import {MongoClient} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'users';

interface UserInterface {
  nombre: string,
  apellido: string,
  correo: string,
  edad?: number,
  contraseña: string,
}

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<UserInterface>('users').updateOne({
    correo: 'alu0101235929@ull.edu.es',
  }, {
    $set: {
      edad: 20,
      contraseña: '7654321',
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});
