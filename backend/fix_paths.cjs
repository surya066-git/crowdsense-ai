const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/tests/middlewares');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace any ../../../src/ with ../../
    content = content.replace(/\.\.\/\.\.\/\.\.\/src\//g, '../../');
    // Also replace any remaining ../../../ with ../../ just in case
    content = content.replace(/\.\.\/\.\.\/\.\.\//g, '../../');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
