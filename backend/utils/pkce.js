import crypto from 'crypto'

export function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('hex')
}

export function generateCodeChallenge(codeVerifier) {
  return crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url') // works in latest Node versions
}
