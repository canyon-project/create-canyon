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
function createTargetDir(projectName:string) {
  const targetDir = path.resolve(cwd, projectName);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
}

// 复制模板文件
function copyTemplateFiles(targetDir:string) {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../template-canyon');
  const filesToCopy = fs.readdirSync(templateDir);
  filesToCopy.forEach((file) => {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(targetDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      const subFiles = fs.readdirSync(sourcePath);
      subFiles.forEach((subFile) => {
        const subSourcePath = path.join(sourcePath, subFile);
        const subTargetPath = path.join(targetPath, subFile);
        fs.copyFileSync(subSourcePath, subTargetPath);
      });
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// 主函数
async function main() {
  const projectName = await getProjectName();
  const targetDir = createTargetDir(projectName);
  copyTemplateFiles(targetDir);
}

main();