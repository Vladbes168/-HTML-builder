const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello, enter text !');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    writeStream.write(input + '\n');
    console.log(
      'The text was written, enter the following text or write "exit" to exit',
    );
  }
});

rl.on('close', () => {
  console.log('Your text has been saved!');
  process.exit(0);
});

process.on('beforeExit', () => {
  console.log('Finish program');
});

process.on('SIGINT', () => {
  console.log('\nДо свидания! Ваш текст был сохранен.');
  rl.close();
});
