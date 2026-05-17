/**
 * 日志工具
 * 替代 console.log，支持日志级别和环境判断
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

// 根据环境设置最低日志级别
const MIN_LEVEL =
  import.meta.env.MODE === 'production' ? 'warn' : 'debug'

class Logger {
  private level: LogLevel

  constructor(level: LogLevel) {
    this.level = level
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level]
  }

  private formatMessage(level: LogLevel, ...args: unknown[]): string {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`
    return `${prefix} ${args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg) : arg
    ).join(' ')}`
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', ...args))
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', ...args))
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', ...args))
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', ...args))
    }
  }
}

export const logger = new Logger(MIN_LEVEL)