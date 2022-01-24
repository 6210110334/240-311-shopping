var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var customer = new net.Socket();

customer.connect(PORT, HOST, function () {
  customer.write('customer');
});

customer.on("data", function (data) {
  console.log(data.toString())
  readline.question("Select Product: ", (input) => {
    customer.write(input);
  });
});
