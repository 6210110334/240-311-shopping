const { Socket } = require("dgram");
var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

let productList = [];
let selectProductList = [];
var stateEMP = 0;
var stateCTM = 0;
var client = null;

net
  .createServer(function (sock) {
    sock.on("data", function (data) {
      if (data == "employee" && stateEMP == 0) {
        client = "employee";
      }
      if (data == "customer" && stateCTM == 0) {
        client = "customer";
      }
      if (client == "employee") {
        switch (stateEMP) {
          case 0:
            sock.write("Ready for Employee client.");
            stateEMP = 1;
            break;
          case 1:
            productList.push(data);
            console.log("Employee add product success.");
            sock.write("Num of Product is " + productList.length);
            break;
          case 2:
            console.log("case 3");
            break;
        }
      } else if (client == "customer") {
        switch (stateCTM) {
          case 0:
            sock.write("Product List :\n" + productList);
            stateCTM = 1;
            break;
          case 1:
            if (data == "order") {
              stateCTM = 2;
            } else {
              selectProductList.push(data);
              console.log("Customer select product success.")
              sock.write("Select success.");
            }
            break;
          case 2:
            sock.write("Order success.");
            break;
        }
      }
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
