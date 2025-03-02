
// 复制模板文件
import {fileURLToPath} from "node:url";
import path from "node:path";
import fs from "node:fs";


const renameFiles = {
  '.gitignore': '_gitignore',
};

// 递归重命名文件
function renameCopiedFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // 如果是目录，递归调用 renameCopiedFiles
      renameCopiedFiles(filePath);
    } else if (renameFiles[file]) {
      const oldPath = filePath;
      const newPath = path.join(dir, renameFiles[file])
      fs.renameSync(oldPath, newPath);
    }
  });
}

function copyTemplateFiles(targetDir) {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../template-canyon-origin');

  // **使用 fs.cpSync 递归复制**
  fs.cpSync(templateDir, targetDir, { recursive: true });

  // 复制完成后重命名文件
  renameCopiedFiles(targetDir);
}

// 主函数
async function main() {
  copyTemplateFiles('template-canyon');
}

main();
