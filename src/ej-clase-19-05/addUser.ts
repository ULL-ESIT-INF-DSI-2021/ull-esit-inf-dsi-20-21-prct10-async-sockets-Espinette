import * as mongoose from 'mongoose';
import validator from 'validator';

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface UserInterface {
  nombre: string,
  apellido: string,
  correo: string,
  edad?: number,
  contraseña: string,
}

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('No se trata de una direccion de correo');
      }
    },
  },
  edad: {
    type: String,
    validate: (value: string) => {
      if ((parseInt(value, 10) < 0) && (Number.isInteger(parseInt(value, 10)))) {
        throw new Error('La edad introducida no es valida');
      }
    },
  },
  contraseña: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserInterface>('User', UserSchema);

const note = new User({
  nombre: 'Alejandro',
  apellido: 'Gomez de Leon',
  correo: 'alu0101000001@ull.edu.es',
  edad: 19,
  contraseña: '1234567',
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
