var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

let db = [];

net
  .createServer(function (sock) {
    var state = 0; //idle
    var current_key = null;

    sock.on("data", function (data) {
      console.log("test");
      switch (state) {
        case 0:
            sock.write("HELLO");
            db.push(data)
            console.log(db);
            if (data == "out") state = 1; //wait for key
            break;
        case 1:
          console.log("case 2");
          break;
        case 2:
        
          console.log("case 3");
          break;
      }
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);
