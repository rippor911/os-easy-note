const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = __dirname;

const files = [
  'docs/IO管理/5_2 IO软硬件组成.md',
  'docs/IO管理/5_3 IO控制方式.md',
  'docs/IO管理/5_4 IO缓冲管理.md',
  'docs/IO管理/5_5 IO设备管理与性能问题.md',
  'docs/硬盘管理/6_1 磁盘概述.md',
  'docs/硬盘管理/6_2 磁盘的组织与调度.md',
  'docs/硬盘管理/6_3 RAID.md',
  'docs/文件系统/7_1 文件系统基本概念.md',
  'docs/文件系统/7_2 文件系统实现方式.md',
  'docs/进程与线程/4_5 进程间通信.md',
  'docs/进程与线程/4_6 调度.md',
];

const PLACEHOLDER = '<!-- TODO: 补充图片 -->';
const IMAGE_REGEX = /image-\d+\.png/g;

let totalTodoBefore = 0;
let totalTodoAfter = 0;
let totalImagesFound = 0;
let totalReplacements = 0;

for (const file of files) {
  const filePath = path.join(REPO_ROOT, file);
  console.log(`\n=== Processing: ${file} ===`);

  // 1. Read current file
  const currentContent = fs.readFileSync(filePath, 'utf-8');
  const todoCountBefore = (currentContent.match(/<!-- TODO: 补充图片 -->/g) || []).length;
  totalTodoBefore += todoCountBefore;
  console.log(`  TODO placeholders found: ${todoCountBefore}`);

  // 2. Get original file from git
  let originalContent;
  try {
    originalContent = execSync(`git show f36ce46:"${file}"`, {
      cwd: REPO_ROOT,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err) {
    console.error(`  ERROR: Failed to get original content from git: ${err.message}`);
    continue;
  }

  // 3. Extract image filenames from original
  const imageFilenames = [];
  let match;
  while ((match = IMAGE_REGEX.exec(originalContent)) !== null) {
    imageFilenames.push(match[0]);
  }
  totalImagesFound += imageFilenames.length;
  console.log(`  Original images found: ${imageFilenames.length}`);

  if (imageFilenames.length !== todoCountBefore) {
    console.log(`  WARNING: Mismatch! Images (${imageFilenames.length}) vs TODOs (${todoCountBefore})`);
  }

  // 4. Replace placeholders in order
  let imgIndex = 0;
  const newContent = currentContent.replace(
    /<!-- TODO: 补充图片 -->/g,
    () => {
      if (imgIndex < imageFilenames.length) {
        const replacement = `![](../images/${imageFilenames[imgIndex]})`;
        imgIndex++;
        return replacement;
      }
      // If more TODOs than images, keep the placeholder
      return PLACEHOLDER;
    }
  );

  const replacementsMade = imgIndex;
  totalReplacements += replacementsMade;
  console.log(`  Replacements made: ${replacementsMade}`);

  // 5. Write back
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  File written successfully.`);

  // Verify
  const verifyContent = fs.readFileSync(filePath, 'utf-8');
  const todoCountAfter = (verifyContent.match(/<!-- TODO: 补充图片 -->/g) || []).length;
  totalTodoAfter += todoCountAfter;
  if (todoCountAfter > 0) {
    console.log(`  WARNING: ${todoCountAfter} TODO placeholders remain!`);
  } else {
    console.log(`  VERIFIED: No remaining TODO placeholders.`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Total TODO placeholders before: ${totalTodoBefore}`);
console.log(`Total original images found:   ${totalImagesFound}`);
console.log(`Total replacements made:       ${totalReplacements}`);
console.log(`Total TODO placeholders after:  ${totalTodoAfter}`);
console.log(`==============================`);