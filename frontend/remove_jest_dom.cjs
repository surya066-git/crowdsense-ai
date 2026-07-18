const fs = require('fs');
const path = require('path');

function removeJestDom(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeJestDom(fullPath);
    } else if (fullPath.includes('.test.js') || fullPath.includes('.test.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('import \'@testing-library/jest-dom\'') || content.includes('import "@testing-library/jest-dom"')) {
        content = content.replace(/import\s+['"]@testing-library\/jest-dom['"];?\r?\n/g, '');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

removeJestDom('src');
removeJestDom('tests');
console.log('Removed jest-dom imports.');
