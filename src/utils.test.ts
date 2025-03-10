import { describe, expect, it } from 'bun:test'
import { getRandomString, sha256 } from './utils'

describe('Utils', () => {
  it('should hash a string with sha256', async () => {
    const bunHashedVersion = new Bun.CryptoHasher('sha256')
      .update('hello world')
      .digest('hex')

    const hashed = await sha256('hello world')

    expect(hashed).toBe(bunHashedVersion)
  })

  it('should generate random string in hex', () => {
    const randomString = getRandomString(10)

    expect(randomString.length).toBe(10)

    // Check if the string is a valid hex string
    expect(randomString.match(/^[0-9a-fA-F]+$/)).toBeTruthy()
  })
})
