import * as net from 'net';
import {Peticion, Respuesta} from './comando';

if (process.argv.length < 3) {
  console.log('Se debe especificar algun comando');
} else {
  const cliente = net.connect({port: 60300});

  const peticion: Peticion = {
    comando: process.argv[2],
    argumentos: [],
  };
  console.log(`Connection start`);

  if (process.argv.length > 3) {
    peticion.argumentos = process.argv.splice(3);
  }
  cliente.write(JSON.stringify(peticion));
  cliente.end();

  let data = '';
  cliente.on('data', (dataChunk) => {
    data += dataChunk;
  });

  cliente.on('end', () => {
    console.log(`Connection finish`);
    const salida: Respuesta = JSON.parse(data);
    console.log(salida.mensaje);
  });

  cliente.on('error', (err) => {
    console.log(`No se pudo establecer la conexion`);
  });
}
