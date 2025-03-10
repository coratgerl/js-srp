import { describe, expect, it } from 'bun:test'
import { sha256 } from './utils'

describe('Utils', () => {
  it('should hash a string with sha256', async () => {
    const bunHashedVersion = new Bun.CryptoHasher('sha256')
      .update('hello world')
      .digest('hex')

    const hashed = await sha256('hello world')

    expect(hashed).toBe(bunHashedVersion)
  })
})
