const { exec } = require('child_process');

function runPythonScript() {
  const command = 'python "D:\\worker\\Worker_2022\\worker-proctoring-moodle\\test.py"';
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Jalankan skrip Python setiap 60 detik
setInterval(runPythonScript, 60000);
