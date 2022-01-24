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
          sock.write("Ready for Employee client");
          stateEMP = 1;
          break;
        case 1:
          productList.push(txt);
          console.log("Employee add product success");
          sock.write("Num of Product is " + productList.length);
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
            sock.emit("success");
            stateCTM = 2;
          } else {
            for (var i = 0; i < productList.length; i++) {
              if (txt == productList[i]) {
                isHasProduct = true;
              }
            }
            if (isHasProduct) {
              selectProductList.push(txt);
              console.log("Customer select product success");
              sock.write("Success to select " + txt);
              isHasProduct = false;
            } else {
              console.log("Customer failed to select " + txt);
              sock.write("Failed to select " + txt);
            }
          }
          break;
      }
    });

    sock.on("success", function () {
      sock.write("Order success");
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
