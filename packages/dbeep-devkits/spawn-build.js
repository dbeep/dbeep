/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const Hjson = require('hjson');

function watchBuild(projectName, projectDir) {
  const logMsg = (msg) => {
    console.log(`${projectName}: ${msg}`);
  };

  const buildWatcher = spawn('npm', ['run', 'build:w'], {
    cwd: projectDir,
    detached: true,
  });

  buildWatcher.stdout.on('data', function (data) {
    logMsg(data);
  });

  buildWatcher.stderr.on('data', (data) => {
    logMsg(`stderr: ${data}`);
  });

  buildWatcher.on('close', (code) => {
    logMsg(`Process exited with code ${code}`);
  });
}

module.exports = function (rootDir, projectsFilter) {
  const rushJson = Hjson.parse(
    fs.readFileSync(path.resolve(rootDir, 'rush.json')).toString(),
  );
  const projects =
    typeof projectsFilter === 'function'
      ? projectsFilter(rushJson.projects)
      : rushJson.projects;
  projects.forEach((project) => {
    const dir = path.resolve(rootDir, project.projectFolder);
    const pkg = require(dir + '/package.json');
    if (pkg.scripts && Object.keys(pkg.scripts).includes('build:w')) {
      watchBuild(project.packageName, dir);
    }
  });
};
