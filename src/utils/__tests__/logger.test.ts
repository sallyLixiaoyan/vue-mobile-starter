import { describe, it, expect } from 'vitest'
import { logger, LOG_LEVELS } from '../logger'

describe('logger', () => {
  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  it('should have correct log levels', () => {
    expect(LOG_LEVELS.debug).toBe(0)
    expect(LOG_LEVELS.info).toBe(1)
    expect(LOG_LEVELS.warn).toBe(2)
    expect(LOG_LEVELS.error).toBe(3)
  })

  it('should log debug in development', () => {
    // 在开发环境下应该能输出 debug 日志
    if (import.meta.env.MODE !== 'production') {
      expect(() => logger.debug('test')).not.toThrow()
    }
  })

  it('should log info', () => {
    expect(() => logger.info('test')).not.toThrow()
  })

  it('should log warn', () => {
    expect(() => logger.warn('test')).not.toThrow()
  })

  it('should log error', () => {
    expect(() => logger.error('test')).not.toThrow()
  })
})