import { ethers } from 'ethers'
import { keccak256 } from '@ethersproject/keccak256'
import { env } from 'process'

const key = new ethers.utils.SigningKey(
  '0x0123456789012345678901234567890123456789012345678901234567890123',
)
const coder = new ethers.utils.AbiCoder()

export const getSignature = (id: number): string => {
  // pack id as an ABI encoded string (solidity does same)
  const encoded = coder.encode(['uint256'], [id])
  // keccak256 hash
  const hash = keccak256(encoded)
  // sign with pk
  return key.signDigest(hash).compact
}
