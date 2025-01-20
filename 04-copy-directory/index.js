const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  try {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files-copy');

    try {
      await fs.rm(targetDir, { recursive: true });
    } catch (err) {
      console.log(err);
    }
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    const copyPromises = files.map(async (file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      const fileContent = await fs.readFile(sourcePath);

      await fs.writeFile(targetPath, fileContent);
    });

    await Promise.all(copyPromises);
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

copyDir();
