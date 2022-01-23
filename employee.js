var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var employee = new net.Socket();

employee.connect(PORT,HOST,function(){
    console.log('employee conected')
    readline.question('\n',input=>{
        employee.write(input)
    })
})

employee.on('data',function(data){
    console.log('employee on ')
    readline.question(data + '\n',input=>{
        employee.write(input)
    })
    
})
