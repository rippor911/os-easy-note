const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) files.push(...walkDir(full));
        else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
    }
    return files;
}

const docsDir = 'docs';
let totalFixed = 0;

for (const file of walkDir(docsDir)) {
    let content = fs.readFileSync(file, 'utf-8');
    const pat = /!\[([^\]]*)\]\(C:\\Users\\.*?\)/gm;
    const matches = content.match(pat);
    if (!matches) continue;
    
    let newContent = content;
    for (const m of matches) {
        const fixed_m = m.replace(/\\/g, '/');
        newContent = newContent.replace(m, fixed_m);
    }
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf-8');
        totalFixed++;
        console.log('Fixed ' + matches.length + ' paths in: ' + file);
    }
}

console.log('\nTotal fixed: ' + totalFixed + ' files');