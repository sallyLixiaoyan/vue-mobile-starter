import readline from 'readline'

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  dim: '\x1b[2m',
}

function question(rl, prompt, defaultValue) {
  return new Promise((resolve) => {
    const displayPrompt = defaultValue
      ? `${c.cyan}?${c.reset} ${prompt} ${c.reset}(${c.dim}${defaultValue}${c.reset}): `
      : `${c.cyan}?${c.reset} ${prompt}: `
    rl.question(displayPrompt, (answer) => {
      resolve(answer.trim() || defaultValue || '')
    })
  })
}

function multiSelect(prompt, options, defaults) {
  return new Promise((resolve) => {
    const selected = new Set(defaults || [])
    let currentIndex = 0

    const render = () => {
      process.stdout.write('\x1b[K')
      const lines = []
      lines.push(`${c.cyan}?${c.reset} ${prompt} ${c.dim}(↑↓ 切换，空格 选择，回车 认认)${c.reset}\n`)

      options.forEach((opt, index) => {
        const checkbox = selected.has(opt.value) ? `[${c.green}✓${c.reset}]` : '[ ]'
        const isCurrent = index === currentIndex
        const label = isCurrent ? `${c.bold}${opt.label}${c.reset}` : opt.label
        const pointer = isCurrent ? `${c.cyan}›${c.reset} ` : '  '
        lines.push(`${pointer}${checkbox} ${label}`)
      })

      process.stdout.write(`\x1b[${options.length + 2}F`)
      lines.forEach(line => {
        process.stdout.write(`\x1b[K${line}\n`)
      })
    }

    console.log('')
    console.log(`${c.cyan}?${c.reset} ${prompt} ${c.dim}(↑↓ 切换，空格 选择，回车 确认)${c.reset}`)
    options.forEach((opt, index) => {
      const checkbox = selected.has(opt.value) ? `[${c.green}✓${c.reset}]` : '[ ]'
      const isCurrent = index === currentIndex
      const label = isCurrent ? `${c.bold}${opt.label}${c.reset}` : opt.label
      const pointer = isCurrent ? `${c.cyan}›${c.reset} ` : '  '
      console.log(`${pointer}${checkbox} ${label}`)
    })

    process.stdin.setRawMode(true)
    process.stdin.resume()

    const cleanup = () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
    }

    process.stdin.on('data', (key) => {
      const keyStr = key.toString()

      if (keyStr === '\x1b[A' || keyStr === 'k') {
        currentIndex = (currentIndex - 1 + options.length) % options.length
        render()
      }
      else if (keyStr === '\x1b[B' || keyStr === 'j') {
        currentIndex = (currentIndex + 1) % options.length
        render()
      }
      else if (keyStr === ' ' || keyStr === 'x') {
        const opt = options[currentIndex]
        if (selected.has(opt.value)) {
          selected.delete(opt.value)
        } else {
          selected.add(opt.value)
        }
        render()
      }
      else if (keyStr === '\r' || keyStr === '\n') {
        cleanup()
        process.stdout.write(`\x1b[${options.length + 1}F`)
        const selectedLabels = Array.from(selected).map(v => {
          const opt = options.find(o => o.value === v)
          return opt ? opt.label : v
        })
        process.stdout.write(`\x1b[K${c.green}✔${c.reset} ${prompt} ${c.dim}${selectedLabels.join(', ') || '无'}${c.reset}\n`)
        for (let i = 0; i < options.length; i++) {
          process.stdout.write('\x1b[K\n')
        }
        process.stdout.write(`\x1b[${options.length}F`)
        resolve(Array.from(selected))
      }
      else if (keyStr === '\x03') {
        cleanup()
        process.exit(1)
      }
    })
  })
}

export async function prompts(cliProjectName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  console.log('')
  console.log(`${c.bold}请输入项目配置:${c.reset}`)
  console.log('')

  // 项目名称（必填）- 支持 CLI 参数
  let projectName = cliProjectName || await question(rl, '项目名称 (kebab-case，必填)', 'my-mobile-app')
  while (!projectName) {
    projectName = await question(rl, '项目名称 (必填)', 'my-mobile-app')
  }

  // 项目标题
  const projectTitle = cliProjectName
    ? projectName // CLI 模式下使用项目名作为标题
    : await question(rl, '项目标题', projectName)

  // 项目描述
  const description = cliProjectName
    ? '' // CLI 模式下跳过描述
    : await question(rl, '项目描述', '')

  rl.close()

  // AI 工具选择（多选）- CLI 模式下默认选择 Claude
  const aiTools = cliProjectName
    ? ['claude']
    : await multiSelect(
      'AI 编码工具',
      [
        { label: 'Claude Code (.claude)', value: 'claude' },
        { label: 'Cursor (.cursorrules)', value: 'cursor' },
      ],
      ['claude'],
    )

  return {
    projectName,
    projectTitle: projectTitle || projectName,
    description,
    aiTools,
  }
}