import { g, getRandomString, N, outputBytes } from './utils'

export const generateSalt = () => getRandomString(outputBytes)

// Verifier is stored in the backend (database, file, etc.)
export const generateEphemeral = (verifier: string) => {
  // b = random()
  const b = BigInt(generateSalt())

  const bigIntVerifier = BigInt(
    verifier.startsWith('0x') ? verifier : `0x${verifier}`,
  )

  // B = (v + g^b) % N
  const B = (bigIntVerifier + g ** b) % N

  return { b, B }
}
