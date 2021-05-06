import * as net from 'net';
import {spawn} from 'child_process';

const servidor = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('Client connected');
  let comando = '';
  connection.on('data', (dataChunk) => {
    comando += dataChunk;
  });


  connection.on('end', () => {
    console.log('Peticion recibida');

    const solicitud = JSON.parse(comando);
    const cat = spawn(solicitud.comando, solicitud.argumentos);

    let salida = '';
    cat.stdout.on('data', (dataChunk) => {
      salida += dataChunk;
    });

    cat.on('close', (peticion) => {
      if (peticion == 0) {
        connection.write(`Salida del comando: \n${salida}\n`, () => {
          connection.end();
        });
      } else {
        connection.write(`Se ha producido un error, puede ser debido a los parámetros del comando\n`, () => {
          connection.end();
        });
      }
    });
  });

  connection.on('error', (err) => {
    if (err) {
      console.log(`No se pudo establecer la conexion`);
    }
  });

  connection.on('close', () => {
    console.log('Cliente desconectado');
  });
});

servidor.listen(50000, () => {
  console.log('Esperando a que se conecte el cliente');
});
