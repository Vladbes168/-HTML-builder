const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  try {
    const stylesPath = path.join(__dirname, 'styles');
    const distPath = path.join(__dirname, 'project-dist');

    await fs.mkdir(distPath, { recursive: true });

    const files = await fs.readdir(stylesPath, { withFileTypes: true });
    let allStyles = [];

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesPath, file.name);
        const fileContent = await fs.readFile(filePath, 'utf-8');

        allStyles.push(fileContent);
      }
    }
    const bundleContent = allStyles.join('\n');

    await fs.writeFile(path.join(distPath, 'bundle.css'), bundleContent);
  } catch (error) {
    console.log('Произошла ошибка:', error);
  }
}

mergeStyles();
