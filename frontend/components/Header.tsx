import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <div className="px-6 m-4 w-100 flex justify-between text-white items-center">
      <div>
        <a href="https://luke.cat">luke.cat</a>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}
