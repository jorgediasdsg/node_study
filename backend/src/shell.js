const { exec } = require('child_process');

console.log("=== Rodando comandos em Shell ===");

function run (command){
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(stdout)
    });
}
run("echo $USER")

const os = require('os');

// console.log(os.cpus());
// console.log(os.totalmem()/1000000000);
// console.log(os.freemem()/1000000000);
// console.log(os.networkInterfaces());
// console.log(os.platform());
// console.log(os.release());
console.log(os.type());
console.log(os.version());