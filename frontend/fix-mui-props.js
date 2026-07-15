import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove `item` prop from <Grid item ...>
  content = content.replace(/<Grid([^>]*?)\s+item\s*(>|\s[^>]*>)/g, '<Grid$1$2');

  // Move alignItems="X" into sx={{ alignItems: 'X' }}
  // We'll just do a very simple and safe regex for the specific lines we found.
  const propsToMove = ['alignItems', 'textAlign', 'justifyContent', 'flexWrap'];

  propsToMove.forEach(prop => {
    const regex = new RegExp(`\\s+${prop}="([^"]+)"`, 'g');
    
    // Find all tags that have this prop
    content = content.replace(new RegExp(`(<[A-Z][a-zA-Z]*[^>]*?)\\s+${prop}="([^"]+)"([^>]*>)`, 'g'), (match, before, value, after) => {
      // Check if there is already an sx={{ ... }}
      if (before.includes('sx={{') || after.includes('sx={{')) {
        // Complex, we will just add it if possible, or skip
        // Safer to just append to sx.
        if (after.match(/sx=\{\{/)) {
           return before + after.replace(/sx=\{\{/, `sx={{ ${prop}: '${value}', `);
        } else if (before.match(/sx=\{\{/)) {
           return before.replace(/sx=\{\{/, `sx={{ ${prop}: '${value}', `) + after;
        }
      }
      // No sx found, create one
      return `${before} sx={{ ${prop}: '${value}' }}${after}`;
    });
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});
