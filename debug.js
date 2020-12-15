
// debug
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
if (argv.debug) {
  const heapdump = require("heapdump");
  const readline = require('readline');
  const fs = require('fs');
  const path = require('path');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('close', ()  => {
    process.exit(0);
  });

  rl.on('line', (input) => {
    const inputArr = input.split(' ');
    const command = inputArr.shift();
    const inputArgv = minimist(inputArr);
    if (command === 'heapdump') {
      // node --expose-gc server.js --debug
      if (global.gc) {
        global.gc();
      }

      const dir = path.resolve(__dirname, 'heapsnapshot');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const dateStr = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Shanghai'
      }).replace(/,/g, '/').replace(/\s/g, '').replace(/\//g, '-');
      const filename = (inputArgv.f || dateStr) + '.heapsnapshot';

      heapdump.writeSnapshot(path.resolve(dir, filename), (err, filename) => {
        if (!err) {
          console.log("Heap dump written to", filename);
        }
      });
    }
  });
}
