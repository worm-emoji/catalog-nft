import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <div className="px-6 m-4 w-full flex space-between text-white align-center justify-center">
      <div className="h-7">luke.cat</div>
      <div className=" h-7">
        <ConnectButton />
      </div>
    </div>
  )
}
