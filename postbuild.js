const fs = require('fs');
fs.rmdirSync('../build', { recursive: true });
fs.renameSync('build', '../build');