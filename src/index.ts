import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mri from 'mri';
import prompts from 'prompts';

// 解析命令行参数
const argv = mri<{
  template?: string;
  targetDir?: string;
}>(process.argv.slice(2), {
  alias: { t: 'template', d: 'targetDir' },
  string: ['template', 'targetDir'],
});

const cwd = process.cwd();

// 获取项目名称
async function getProjectName() {
  let projectName = argv._[0];
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: '请输入项目名称:',
    });
    projectName = response.projectName;
  }
  return projectName;
}

// 创建目标目录
function createTargetDir(projectName: string) {
  const targetDir = path.resolve(cwd, projectName);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
}

// 定义需要重命名的文件映射
const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
};

// 递归重命名文件
function renameCopiedFiles(dir: string) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // 如果是目录，递归调用 renameCopiedFiles
      renameCopiedFiles(filePath);
    } else if (renameFiles[file]) {
      const oldPath = filePath;
      const newPath = path.join(dir, renameFiles[file]!);
      fs.renameSync(oldPath, newPath);
    }
  });
}

// 复制模板文件
function copyTemplateFiles(targetDir: string) {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../template-canyon');

  // **使用 fs.cpSync 递归复制**
  fs.cpSync(templateDir, targetDir, { recursive: true });

  // 复制完成后重命名文件
  renameCopiedFiles(targetDir);
}

// 主函数
async function main() {
  const projectName = await getProjectName();
  const targetDir = createTargetDir(projectName);
  copyTemplateFiles(targetDir);
}

main();
