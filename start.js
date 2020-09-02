const { spawn } = require('child_process');
const ls = spawn('./gradlew', ['simulateJava'], {cwd: './TestProject'});

// ls = spawn('java', ['-Xmx1024M', '-Xms1024M', '-jar', './../craftbukkit-1.8.7-R0.1-SNAPSHOT-latest.jar', 'nogui'], {cwd: '/some/path/'});

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data.toString());
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data.toString());
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});