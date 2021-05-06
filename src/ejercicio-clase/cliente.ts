import * as net from 'net';

if (process.argv.length < 3) {
  console.log('Se debe especificar algun comando');
} else {
  const cliente = net.connect({port: 50000});

  const peticion = {
    comando: process.argv[2],
    argumentos: [``],
  };
  console.log(`Connection start`);

  if (process.argv.length > 3) {
    peticion.argumentos = process.argv.splice(3);
  }
  cliente.write(JSON.stringify(peticion), () => {
    cliente.end();
  });

  let data = '';
  cliente.on('data', (dataChunk) => {
    data += dataChunk;
  });

  cliente.on('end', () => {
    console.log(`Connection finish`);
    console.log(data);
  });

  cliente.on('error', (err) => {
    console.log(`No se pudo establecer la conexion`);
  });
}
