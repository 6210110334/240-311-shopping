var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var customer = new net.Socket();
var state = 0;
var txt;

customer.connect(PORT, HOST, function () {
  customer.write("customer");
});

customer.on("data", function (data) {
  txt = data.toString();
  console.log(txt);
  if (txt == "Order success.") {
    state = 1;
  }
  switch (state) {
    case 0:
      readline.question("Select Product: ", (input) => {
        customer.write(input);
      });
      break;
    case 1:
  }
});
