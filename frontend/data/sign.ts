import { encodeAbiParameters, Hex, keccak256, parseAbiParameters } from 'viem'
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(process.env.SIGNING_KEY as Hex)

export const getSignature = (id: number): Promise<Hex> => {
  // pack id as an ABI encoded string (solidity does same)
  const encoded = encodeAbiParameters(
      parseAbiParameters('uint256'),
      [BigInt(id)]
  )
  // keccak256 hash
  const hash = keccak256(encoded)
  // sign with pk
  return account.signMessage({ message: hash })
}
