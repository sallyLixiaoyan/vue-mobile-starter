#!/usr/bin/env node

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, readdirSync, statSync, rmSync } from 'fs'
import { resolve, dirname, basename, join } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { prompts } from './prompts.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = resolve(__dirname, '..')

// ─── 颜色工具 ───
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
}
const log = {
  info: (msg) => console.log(`${c.cyan}?${c.reset} ${msg}`),
  success: (msg) => console.log(`${c.green}✓${c.reset} ${msg}`),
  warn: (msg) => console.log(`${c.yellow}!${c.reset} ${msg}`),
  error: (msg) => console.log(`${c.red}✗${c.reset} ${msg}`),
  step: (num, msg) => console.log(`\n${c.bold}${c.green}[${num}/3]${c.reset} ${msg}`),
}

// ─── 递归复制目录 ───
function copyDir(src, dest, skipItems) {
  mkdirSync(dest, { recursive: true })
  for (const item of readdirSync(src)) {
    if (SKIP_ITEMS.has(item) || (skipItems && skipItems.has(item))) continue
    const srcPath = join(src, item)
    const destPath = join(dest, item)
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath, skipItems)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

// ─── 跳过的文件 ───
const SKIP_ITEMS = new Set([
  'node_modules',
  'dist',
  '.git',
  'create',
  '.DS_Store',
  'pnpm-lock.yaml',
  'README.md',
])

// ─── 处理 AI 工具配置 ───
function handleAITools(dir, aiTools) {
  const hasClaude = aiTools?.includes('claude')
  const hasCursor = aiTools?.includes('cursor')

  // Claude Code
  if (!hasClaude) {
    const claudeDir = join(dir, '.claude')
    const claudeMd = join(dir, 'CLAUDE.md')
    if (existsSync(claudeDir)) rmSync(claudeDir, { recursive: true })
    if (existsSync(claudeMd)) rmSync(claudeMd)
  }

  // Cursor
  if (!hasCursor) {
    const cursorDir = join(dir, '.cursor')
    const cursorRules = join(dir, '.cursorrules')
    if (existsSync(cursorDir)) rmSync(cursorDir, { recursive: true })
    if (existsSync(cursorRules)) rmSync(cursorRules)
  }
}

// ─── 主流程 ───
async function main() {
  console.log('')
  console.log(`${c.bold}  ____    _              __      _      __  __ `)
  console.log(`${c.bold} |  _ \\  | |   ___  ___  \\ \\    / /__  | \\/ | `)
  console.log(`${c.bold} | |_) | | |  / _ \\/ _ \\  \\ \\  / / _ \\ | |\\/| |`)
  console.log(`${c.bold} |  __/  | | |  __/  __/   \\ \\/ /  __/ | |  | |`)
  console.log(`${c.bold} |_|     |_|  \\___|\\___|    \\_/  \\___| |_|  |_|`)
  console.log(`${c.reset}`)
  console.log(`  Vue 3 移动端项目脚手架`)
  console.log('')

  // 收集用户输入
  const answers = await prompts()

  // 目标路径
  const targetDir = resolve(process.cwd(), answers.projectName)

  if (existsSync(targetDir)) {
    log.error(`目录已存在: ${targetDir}`)
    process.exit(1)
  }

  // Step 1: 复制模板
  log.step(1, `创建项目目录: ${c.cyan}${answers.projectName}${c.reset}`)
  copyDir(TEMPLATE_DIR, targetDir, new Set([basename(targetDir)]))

  // 处理 AI 工具配置
  handleAITools(targetDir, answers.aiTools)

  // Step 2: 替换模板变量
  log.step(2, '生成项目配置')
  generateFiles(targetDir, answers)

  // Step 3: 初始化 Git
  log.step(3, '初始化 Git 仓库')
  try {
    execSync('git init', { cwd: targetDir, stdio: 'pipe' })
    log.success('Git 仓库初始化完成')
  } catch {
    log.warn('Git 初始化失败，请手动执行: git init')
  }

  // 完成
  console.log('')
  console.log(`${c.bold}${c.green}  项目创建成功！${c.reset}`)
  console.log('')
  console.log(`  进入项目:`)
  console.log(`    ${c.cyan}cd ${answers.projectName}${c.reset}`)
  console.log('')
  console.log(`  安装依赖:`)
  console.log(`    ${c.cyan}pnpm install${c.reset}`)
  console.log('')
  console.log(`  启动开发:`)
  console.log(`    ${c.cyan}pnpm dev${c.reset}`)
  console.log('')
  if (answers.aiTools?.length > 0) {
    const toolNames = {
      claude: 'Claude Code (.claude)',
      cursor: 'Cursor (.cursorrules)',
    }
    const toolsDisplay = answers.aiTools.map(t => toolNames[t] || t).join('、')
    console.log(`  ${c.bold}AI 工具配置: ${toolsDisplay}${c.reset}`)
  }
  console.log('')
}

// ─── 生成定制化文件 ───
function generateFiles(dir, answers) {
  // package.json
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'))
  pkg.name = answers.projectName
  pkg.version = '0.0.1'
  if (answers.description) pkg.description = answers.description
  // 新项目不需要 bin 和 files 字段
  delete pkg.bin
  delete pkg.files
  // 新项目使用 pnpm 作为包管理器
  pkg.packageManager = 'pnpm@11.1.2'
  writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')

  // index.html title
  let html = readFileSync(join(dir, 'index.html'), 'utf-8')
  html = html.replace('Vue Mobile Starter', answers.projectTitle)
  writeFileSync(join(dir, 'index.html'), html)

  // .env 文件
  const envContent = `# 应用标题
VITE_APP_TITLE=${answers.projectTitle}

# API 基础地址
VITE_API_BASE_URL=/api

# API 超时时间（毫秒）
VITE_API_TIMEOUT=10000
`
  writeFileSync(join(dir, '.env'), envContent)
  writeFileSync(join(dir, '.env.development'), envContent.replace('/api', 'http://localhost:3001/api'))
  writeFileSync(join(dir, '.env.production'), envContent)
}

main().catch((err) => {
  log.error(err.message)
  process.exit(1)
})