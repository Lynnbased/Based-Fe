// context/appkit.tsx
"use client";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { baseSepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { ReactNode } from "react";

// Project ID from Reown Cloud (same as Billoq's)
const projectId = "a9fbadc760baa309220363ec867b732e";

// Create metadata object
const metadata = {
  name: "Dev3Arena On-Chain Badges",
  description: "Claim your learning achievements as verifiable on-chain NFT badges",
  url: "https://dev3arena-badges.vercel.app",
  icons: ["https://dev3arena-badges.vercel.app/logo.png"],
};

// Supported networks - Base Sepolia for testnet
const supportedNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [baseSepolia];

// Log environment info for debugging
console.log(`🌍 Dev3Arena AppKit Environment: Testnet`);
console.log(`📡 Supported Networks:`, supportedNetworks.map(n => n.name));

// Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: supportedNetworks,
  projectId,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
    emailShowWallets: false,
  },
  allWallets: 'SHOW',
  enableExplorer: true,
  enableOnramp: false, // Disable on-ramp for testnet
});

interface AppKitProps {
  children: ReactNode;
}

export function AppKit({ children }: AppKitProps) {
  return <>{children}</>;
}
