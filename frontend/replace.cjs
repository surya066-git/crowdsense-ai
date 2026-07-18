const fs = require('fs');
const path = require('path');

function replaceJest(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceJest(fullPath);
    } else if (fullPath.includes('.test.js') || fullPath.includes('.test.jsx') || fullPath.includes('jest.setup.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('jest.')) {
        content = content.replace(/jest\./g, 'vi.');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceJest('src');
replaceJest('tests');
console.log('Replaced jest with vi successfully.');
