const { Socket } = require("dgram");
var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

var productList = [];
var selectProductList = [];
var isHasProduct = false;
var stateEMP = 0;
var stateCTM = 0;
var client = null;
var txt;

net
  .createServer(function (sock) {
    sock.on("data", function (data) {
      txt = data.toString();
      if (txt == "employee" && stateEMP == 0) {
        client = "employee";
      }
      if (txt == "customer" && stateCTM == 0) {
        client = "customer";
      }
      sock.emit(client);
    });

    sock.on("employee", function () {
      switch (stateEMP) {
        case 0:
          sock.write("Ready for Employee client.");
          stateEMP = 1;
          break;
        case 1:
          productList.push(txt);
          console.log("Employee add product success.");
          sock.write("Num of Product is " + productList.length);
          break;
        case 2:
          console.log("case 3");
          break;
      }
    });

    sock.on("customer", function () {
      switch (stateCTM) {
        case 0:
          sock.write("Product List :\n" + productList);
          stateCTM = 1;
          break;
        case 1:
          if (txt == "order") {
            stateCTM = 2;
          } else {
            for (var i = 0; i < productList.length; i++) {
              if (txt == productList[i]) {
                isHasProduct = true;
              }
            }
            if (isHasProduct) {
              selectProductList.push(txt);
              console.log("Customer select product success.");
              sock.write("Select " + txt + " success.");
              isHasProduct = false;
            } else {
              sock.write("Failed to select " + txt);
            }
          }
          break;
        case 2:
          sock.write("Order success.");
          break;
      }
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
