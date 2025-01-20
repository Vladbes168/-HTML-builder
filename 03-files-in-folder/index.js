const { log } = require('console');
const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((file) => {
      const fileName = file.name;
      fs.stat(path.join(__dirname, 'secret-folder', fileName), (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        const fileSizeInBytes = (stats.size / 1024).toFixed(2) + 'kB';
        const fileExtansion = fileName.split('.')[1];
        const fileNameWithoutExtansion = fileName.split('.')[0];

        console.log(
          `${fileNameWithoutExtansion} - ${fileExtansion} - ${fileSizeInBytes}`,
        );
      });
    });
  },
);
