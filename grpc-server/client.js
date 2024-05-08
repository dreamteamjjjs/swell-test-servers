const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('helloworld.proto');
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const client = new hello_proto.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  const user = 'world';
  client.sayHello({ name: user }, function (err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

main();
