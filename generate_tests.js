const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend', 'src', 'components');
const folders = ['common', 'home', 'layout'];

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.jsx') && !file.endsWith('.test.jsx'));
  
  files.forEach(file => {
    const componentName = file.replace('.jsx', '');
    const testFilePath = path.join(dirPath, `${componentName}.test.jsx`);
    
    const testContent = `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ${componentName} } from './${componentName}.jsx';

describe('${componentName} Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <${componentName} />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <${componentName} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
`;
    fs.writeFileSync(testFilePath, testContent, 'utf8');
    console.log(`Created test for ${componentName}`);
  });
});
