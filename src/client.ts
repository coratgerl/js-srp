import { outputBytes, getRandomString, N, g, sha256 } from './utils'

export const generateSalt = () => getRandomString(outputBytes)

export const generateEphemeral = () => {
  const salt = generateSalt()

  // a = random()
  const a = BigInt(salt.startsWith('0x') ? salt : `0x${salt}`)

  // A = g^a % N
  const A = g ** a % N

  return { a, A }
}

export const getPrivateKey = ({
  salt,
  username,
  password,
}: { salt: string; username: string; password: string }) => {
  const saltBigInt = BigInt(salt.startsWith('0x') ? salt : `0x${salt}`)

  // x = SHA(s | SHA(U | ":" | p))
  return sha256(`${saltBigInt}${sha256(`${username}:${password}`)}`)
}

export const getVerifier = (privateKey: string) => {
  const privateKeyBigInt = BigInt(
    privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`,
  )

  // v = g^x % N
  return (g ** privateKeyBigInt % N).toString(16)
}

export const getSession = ({
  a,
  B,
  s,
  I,
  x,
}: {
  a: string
  B: string
  s: string
  I: string
  x: string
}) => {
  const aBigInt = BigInt(a.startsWith('0x') ? a : `0x${a}`)
  const BBigInt = BigInt(B.startsWith('0x') ? B : `0x${B}`)
  const sBigInt = BigInt(s.startsWith('0x') ? s : `0x${s}`)
  const xBigInt = BigInt(x.startsWith('0x') ? x : `0x${x}`)

  // A = g^a % N
  const A = g ** aBigInt % N

  // The client MUST abort authentication if B % N is zero.
  if (BBigInt % N === BigInt(0))
    throw new Error('The server sent invalid B (ephemeral)')
}
