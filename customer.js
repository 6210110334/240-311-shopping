var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var customer = new net.Socket();

customer.connect(PORT,HOST,function(){
    console.log('customer conected')
    readline.question('\n',input=>{
        customer.write(input)
    })
})

customer.on('data',function(data){
    readline.question(data + '\n',input=>{
        customer.write(input)
    })
})
