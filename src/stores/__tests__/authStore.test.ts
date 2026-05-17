import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have initial state', () => {
    const store = useAuthStore()
    expect(store.token).toBeNull()
    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })

  it('should login correctly', () => {
    const store = useAuthStore()
    store.login('test-token', {
      id: '1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
    })

    expect(store.token).toBe('test-token')
    expect(store.user?.name).toBe('Test User')
    expect(store.isLoggedIn).toBe(true)
  })

  it('should logout correctly', () => {
    const store = useAuthStore()
    store.login('test-token', {
      id: '1',
      name: 'Test User',
    })
    store.logout()

    expect(store.token).toBeNull()
    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })

  it('should update user correctly', () => {
    const store = useAuthStore()
    store.login('test-token', {
      id: '1',
      name: 'Test User',
    })

    store.updateUser({ name: 'Updated User', email: 'test@example.com' })

    expect(store.user?.name).toBe('Updated User')
    expect(store.user?.email).toBe('test@example.com')
  })
})