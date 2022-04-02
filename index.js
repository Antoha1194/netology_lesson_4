const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const {stdin, stdout} = require('process');
const readline = require('node:readline/promises');
const rl = readline.createInterface(stdin, stdout);

const coin = {
    1: 'Орел',
    2: 'Решка'
}

rl.write('Орел(1) или Решка(2)?\n');
rl.on('line', stdin => {
    
    let number = Math.round(Math.random()*(2-1)+1);
    console.log(`Выпал(а) ${coin[number]}`);
    let date = new Date();
    myEmitter.emit('writeLog', `Выпал(а): ${coin[number]} > Ответ: ${coin[stdin]}\n`);
    console.log('Монетка брошена');
});


const myEmitter = new MyEmitter();

const logFile = process.argv[2];
const writeStream = fs.createWriteStream(logFile);

myEmitter.on('writeLog', (data) => {  
        let date = new Date();
        dateText = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 
        writeStream.write(`${dateText}  - ${data}`, 'UTF8');
})

myEmitter.on('message', (message) => {
    console.log(message, '???');
})

myEmitter.on('error', (err) => {
    console.log(err.message);
})
