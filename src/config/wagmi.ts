// config/wagmi.ts
import { baseSepolia } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';

// For Dev3Arena badges, we use Base Sepolia testnet
export const supportedChains: readonly [Chain, ...Chain[]] = [baseSepolia];

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [baseSepolia.id]: http(),
  },
});
