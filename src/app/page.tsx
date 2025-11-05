"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Award, CheckCircle2, Zap, Shield, Sparkles, ArrowRight, Users, Trophy } from "lucide-react";

export default function Home() {
  const { isConnected: appkitIsConnected } = useAppKitAccount();
  const { isConnected: wagmiIsConnected } = useAccount();
  const isConnected = appkitIsConnected || wagmiIsConnected;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">On-Chain Learning Credentials</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Claim Your
              <br />
              Learning Achievements
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your learning progress into <span className="text-indigo-400 font-semibold">verifiable on-chain NFT badges</span>.
              Proof of participation. Proof of skill. Forever on Base.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isConnected ? (
                <>
                  <Link
                    href="/tasks"
                    className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold text-lg shadow-xl shadow-indigo-500/50 hover:shadow-indigo-500/70 flex items-center gap-2"
                  >
                    View Available Tasks
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/badges"
                    className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-indigo-500/30 text-indigo-300 rounded-xl transition-all duration-200 font-semibold text-lg"
                  >
                    My Badges
                  </Link>
                </>
              ) : (
                <div className="px-8 py-4 bg-slate-800/50 border border-indigo-500/30 text-indigo-300 rounded-xl font-semibold text-lg">
                  Connect your wallet to get started
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Why Dev3Arena Badges?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your learning journey deserves permanent, verifiable recognition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Verifiable Credentials</h3>
              <p className="text-gray-400 leading-relaxed">
                Every badge is an ERC-721 NFT stored on Base Sepolia, providing cryptographic proof of your achievements.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Instant Claim</h3>
              <p className="text-gray-400 leading-relaxed">
                Complete learning tasks and claim your badges instantly. No waiting, no intermediaries.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Showcase Achievements</h3>
              <p className="text-gray-400 leading-relaxed">
                Display your earned badges in your wallet or portfolio. Show the world what you've learned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect Wallet</h3>
              <p className="text-gray-400">
                Connect your MetaMask or compatible wallet to Base Sepolia testnet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Complete Tasks</h3>
              <p className="text-gray-400">
                View available learning tasks and complete the requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Claim Badge</h3>
              <p className="text-gray-400">
                Claim your NFT badge and verify it on-chain forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">Available Badges</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle2 className="w-8 h-8 text-pink-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-400">Badges Claimed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isConnected && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Earning Badges?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect your wallet and begin your journey to verifiable on-chain credentials
              </p>
              <p className="text-sm text-indigo-300">
                Your wallet will prompt you to switch to Base Sepolia testnet
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
