"use client";

import Link from "next/link";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { useDisconnect } from "@reown/appkit/react";
import { useWalletInfo } from "@reown/appkit/react";
import { useAccount, useDisconnect as useWagmiDisconnect } from "wagmi";
import { ChevronDown, LogOut, Menu, Wallet, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // AppKit hooks
  const { address: appkitAddress, isConnected: appkitIsConnected } = useAppKitAccount();
  const { open, close } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { disconnect: appkitDisconnect } = useDisconnect();

  // Wagmi hooks
  const { address: wagmiAddress, isConnected: wagmiIsConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();

  const address = appkitAddress || wagmiAddress;
  const isConnected = appkitIsConnected || wagmiIsConnected;

  useEffect(() => setMounted(true), []);

  const truncateAddress = (addr: string | undefined) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  const getWalletIcon = () => {
    const sanitizeImageUrl = (url: string) => {
      if (!url) return null;
      try {
        const trimmedUrl = url.trim();
        if (trimmedUrl.startsWith('data:')) {
          return trimmedUrl;
        }
        new URL(trimmedUrl);
        return trimmedUrl;
      } catch {
        return null;
      }
    };

    if (walletInfo?.icon) {
      const sanitizedUrl = sanitizeImageUrl(walletInfo.icon);
      if (sanitizedUrl) {
        return (
          <Image
            src={sanitizedUrl}
            alt={walletInfo.name || "Wallet"}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
            onError={() => {}}
            unoptimized
          />
        );
      }
    }

    if (connector?.icon) {
      const sanitizedUrl = sanitizeImageUrl(connector.icon);
      if (sanitizedUrl) {
        return (
          <Image
            src={sanitizedUrl}
            alt={connector.name || "Wallet"}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
            onError={() => {}}
            unoptimized
          />
        );
      }
    }

    return <Wallet className="w-6 h-6 text-indigo-400" />;
  };

  const getWalletName = () => walletInfo?.name || connector?.name || "Connected Wallet";

  const handleConnect = async () => {
    try {
      await open();
    } catch (error: unknown) {
      console.error("Connection error:", error instanceof Error ? error.message : String(error));
    }
  };

  const handleDisconnect = () => {
    setIsDropdownOpen(false);
    try {
      if (appkitIsConnected) {
        appkitDisconnect();
      }
      if (wagmiIsConnected) {
        wagmiDisconnect();
      }
      close();
    } catch (error: unknown) {
      console.error("Disconnect error:", error instanceof Error ? error.message : String(error));
    }
  };

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-menu-toggle]")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-indigo-400 font-bold text-xl flex items-center gap-2">
                <span className="text-2xl">🎖️</span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dev3Arena Badges
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`transition-colors ${isActive("/") ? "text-indigo-400 font-medium" : "text-gray-300 hover:text-indigo-400"}`}
            >
              Home
            </Link>
            <Link
              href="/badges"
              className={`transition-colors ${isActive("/badges") ? "text-indigo-400 font-medium" : "text-gray-300 hover:text-indigo-400"}`}
            >
              My Badges
            </Link>
            <Link
              href="/tasks"
              className={`transition-colors ${isActive("/tasks") ? "text-indigo-400 font-medium" : "text-gray-300 hover:text-indigo-400"}`}
            >
              Tasks
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-indigo-500/30 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    {getWalletIcon()}
                    <span className="text-white font-medium hidden sm:block">
                      {truncateAddress(address)}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-indigo-500/30 rounded-lg shadow-xl py-2">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-xs text-gray-400 mb-1">Connected with</p>
                      <p className="text-white font-medium">{getWalletName()}</p>
                      <p className="text-xs text-indigo-400 mt-1 font-mono">{address}</p>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              data-menu-toggle
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden py-4 space-y-2 border-t border-slate-700"
          >
            <Link
              href="/"
              className={`block px-4 py-2 rounded-lg transition-colors ${isActive("/") ? "text-indigo-400 bg-indigo-500/10" : "text-gray-300 hover:bg-slate-800"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/badges"
              className={`block px-4 py-2 rounded-lg transition-colors ${isActive("/badges") ? "text-indigo-400 bg-indigo-500/10" : "text-gray-300 hover:bg-slate-800"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Badges
            </Link>
            <Link
              href="/tasks"
              className={`block px-4 py-2 rounded-lg transition-colors ${isActive("/tasks") ? "text-indigo-400 bg-indigo-500/10" : "text-gray-300 hover:bg-slate-800"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tasks
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
