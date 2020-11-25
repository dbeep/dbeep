/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const spawnBuild = require('@dbeep/devkits/spawn-build');

spawnBuild('.', (projects) =>
  projects.filter((project) => project.packageName.startsWith('@dbeep/')),
);
