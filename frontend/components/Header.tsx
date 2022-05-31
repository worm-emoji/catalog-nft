import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="px-6 m-4 w-100 flex justify-between text-white items-center">
      <div>
        <Link href="/">
          <a>mint.luke.cat</a>
        </Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}
