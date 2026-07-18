const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/tests');
files.filter(f => f.endsWith('.js') && (f.includes('middlewares') || f.includes('services') || f.includes('controllers') || f.includes('engine') || f.includes('repositories') || f.includes('utils'))).forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Replace '../../../' with '../../' for subfolders of src
  const oldContent = content;
  content = content.replace(/(['"])\.\.\/\.\.\/\.\.\/(middlewares|services|controllers|utils|engine|config|firebase|repositories|errors|models)\//g, '$1../../$2/');
  
  if (content !== oldContent) {
    fs.writeFileSync(f, content);
  }
});
