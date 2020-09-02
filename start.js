const { spawn } = require('child_process');
const fs = require('fs').promises;
const { LiveStream } = require('./live-stream');

// delete simulateJava.log (maybe not)
// kill -9 [simulation PID]
// fuser -k 8080/tcp

async function getSimulationPid() {
    return new Promise(async (resolve, reject) => {
        try { 
            resolve(await fs.readFile('/workspace/testFRCOnlineIDE/TestProject/build/pids/simulateJava.pid', 'utf8'));
        } catch(e) {
            reject();
        }
    });
}

async function killSimulationPid() { 
    return new Promise(async resolve => {
        try {
            const pid = await getSimulationPid();
            const childProcess = spawn('kill', ['-9', pid]);
            childProcess.on('exit', function (code) {
                resolve();
            }); 
        } catch(e) {
            resolve();
        }
    });
}

async function killSimulationPort() { 
    return new Promise(async resolve => {
        const childProcess = spawn('fuser', ['-k', '8080/tcp']);
        childProcess.on('exit', function (code) {
            resolve();
        }); 
    });
}

async function start() {
    await killSimulationPid();
    await killSimulationPort();

    const childProcess = spawn('./gradlew', ['simulateJava'], {cwd: './TestProject'});
    childProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data.toString());
    });

    childProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data.toString());
    });

    const simulateLog = '/workspace/testFRCOnlineIDE/TestProject/build/stdout/simulateJava.log';

    childProcess.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
        const liveStream = new LiveStream(simulateLog, text => {
            console.log('text:', text);
        });
    });
}

start();
