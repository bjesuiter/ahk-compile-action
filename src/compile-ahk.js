const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');

/**
 * Github Core Docs: https://github.com/actions/toolkit/tree/main/packages/core
 * Github Exec Docs: https://github.com/actions/toolkit/tree/main/packages/exec
 */

 async function run() {
    try {
        const inScript = core.getInput('in_script', { required: true });
        const githubActionPath = path.join(__dirname, '..');

        const compileParams = ['/in', inScript];

        let stdout = "";
        let stderr = "";

        await exec.exec(path.join(githubActionPath, 'AutoHotkey_1.1.33.06', 'Compiler', 'Ahk2Exe.exe' ), compileParams, {
          stdout: (data) => {
            stdout += data.toString();
          },
          stderr: (data) => {
            stderr += data.toString();
          },
        });

        if (stderr.length > 0) {
          core.setFailed(stderr);
        }

        core.setOutput('out_exe', `${path.basename(inScript)}.exe`)
    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run()