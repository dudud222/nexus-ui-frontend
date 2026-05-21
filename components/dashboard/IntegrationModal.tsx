"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Copy, Check, X, Terminal, Code, Hash, Box } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface AppData {
    id?: string;
    name: string;
    secret?: string;
    webhookUrl?: string;
    ownerId?: string;
    status: string;
    version?: string;
    createdAt?: any;
}
interface IntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    app: AppData;
}

const languages = [
    { id: "cpp", label: "C++", icon: Code },
    { id: "python", label: "Python", icon: Terminal },
    { id: "csharp", label: "C#", icon: Hash },
    { id: "nodejs", label: "Node.js", icon: Box },
];

export function IntegrationModal({ isOpen, onClose, app }: IntegrationModalProps) {
    const [activeLang, setActiveLang] = useState("cpp");
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const getCode = (lang: string) => {
        switch (lang) {
            case "cpp":
                return `// Nexus Auth C++ Integration Guide
/*
 * Prerequisites:
 * 1. libcurl (https://curl.se/libcurl/)
 * 2. nlohmann/json (https://github.com/nlohmann/json)
 * 3. NexusAuth.hpp (Download below)
 */

#include "NexusAuth.hpp"
#include <iostream>

int main() {
    // 1. Initialize with your specific application credentials
    // You can find these in the application detailed view.
    Nexus::Auth::Init(
        "${app.name}", 
        "${app.ownerId}", 
        "${app.secret}",
        "${app.version}",
        "${window.location.origin}/api/v1"
    );

    std::string user, pass, key;
    std::cout << "Username: "; std::cin >> user;
    std::cout << "Password: "; std::cin >> pass;

    // 2. Simple Login flow
    if (Nexus::Auth::Login(user, pass)) {
        std::cout << "Successfully authenticated!" << std::endl;
        
        // 3. Fetch a secure server-side variable
        // This value is never stored on the client disk.
        std::string secretKey = Nexus::Auth::GetVar("INTERNAL_API_KEY");
        std::cout << "Fetched secret: " << secretKey << std::endl;
        
        // Start your protected logic here...
    } else {
        std::cout << "Authentication failed. Access denied." << std::endl;
    }

    return 0;
}`;
            case "python":
                return `# Nexus Auth Python SDK
# Requires: requests, pycryptodome (if using encryption)

from nexus_auth import api

# 1. Initialize API
key = api(
    name="${app.name}",
    ownerid="${app.ownerId}",
    secret="${app.secret}",
    version="${app.version}",
    url="${window.location.origin}/api/v1/"
)


def main():
    print(f"Initializing {key.name}...")
    key.init()

    # 2. Login
    user = input("Username: ")
    pw = input("Password: ")

    if key.login(user, pw):
        print(f"Welcome back, {key.user_data.username}!")
        print(f"Subscription expires: {key.user_data.expires}")
    else:
        print(f"Error: {key.response.message}")

if __name__ == "__main__":
    main()`;
            case "csharp":
                return `// Nexus Auth C# Integration Guide
// 1. Download NexusAuth.cs (from the button below) and add it to your project.
// 2. Add: using Nexus.Sdk;

using System;
using System.Threading.Tasks;
using Nexus.Sdk;

namespace MyApp 
{
    class Program 
    {
        // Define Auth instance globally or passes it around
        public static NexusAuth App = new NexusAuth(
            "${app.name}", 
            "${app.ownerId}", 
            "${app.secret}", 
            "${app.version}",
            "${window.location.origin}/api/v1"
        );

        static async Task Main(string[] args)
        {
            Console.WriteLine("Initializing...");
            
            // 1. Initialize Connection
            if (!await App.InitializeAsync())
            {
                Console.WriteLine("Failed to connect to Nexus Auth!");
                Console.ReadKey();
                return;
            }
            Console.WriteLine("Connected!");

            // 2. User Login
            Console.Write("Username: ");
            string user = Console.ReadLine();
            Console.Write("Password: ");
            string pass = Console.ReadLine();

            if (await App.LoginAsync(user, pass))
            {
                 Console.WriteLine($"Welcome back, {App.User.Username}!");
                 Console.WriteLine($"HWID: {App.User.Hwid}");
                 
                 // Example: Check a subscription
                 // if (App.User.Subscriptions.Exists(s => s.subscription == "vip")) ...
            }
            else
            {
                 Console.WriteLine("Login failed.");
            }
            
            Console.ReadKey();
        }
    }
}`;

            case "nodejs":
                return `// Nexus Auth Node.js Integration Guide
/**
 * Prerequisites:
 * npm install axios
 * nexus_auth.js (Download below)
 */

const Auth = require('./nexus_auth');

async function main() {
    console.log("Initializing ${app.name}...");

    // 1. Setup credentials
    const isReady = await Auth.init(
        "${app.name}",
        "${app.ownerId}",
        "${app.secret}",
        "${app.version}",
        "${window.location.origin}/api/v1"
    );

    if (!isReady) {
        console.error("Failed to connect to Nexus servers.");
        return;
    }

    // 2. Perform Login/Register
    const username = "test_user";
    const password = "secure_password";

    if (await Auth.login(username, password)) {
        console.log("Successfully logged in!");

        // 3. Fetch server-side variables
        const salt = await Auth.getVar("ENCRYPTION_SALT");
        console.log("System Salt:", salt);
    } else {
        console.log("Authentication failed.");
    }
}

main();`;
            default:
                return "// Select a language";
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getCode(activeLang));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md transition-all">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-5xl"
            >
                <GlassCard className="flex flex-col overflow-hidden border-violet-500/20 shadow-2xl shadow-violet-500/10 !bg-[#0f0f11]/90 max-h-[90vh]">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <Code className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Integration Code</h2>
                                <p className="text-sm text-slate-400">Implementation guide for <span className="text-violet-400 font-mono font-medium">{app.name}</span></p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 hover:bg-white/5 rounded-full transition-all text-slate-400 hover:text-white hover:rotate-90 duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[500px]">
                        {/* Sidebar */}
                        <div className="w-full md:w-60 bg-[#0a0a0c]/50 border-r border-white/5 p-4 space-y-2 overflow-y-auto">
                            <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">SDK Language</p>
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setActiveLang(lang.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 relative group overflow-hidden ${activeLang === lang.id
                                        ? "text-white bg-gradient-to-r from-violet-600/20 to-violet-600/5 border border-violet-500/20 shadow-lg shadow-violet-500/5"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                                        }`}
                                >
                                    {activeLang === lang.id && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute inset-0 bg-violet-600/10 rounded-xl"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <lang.icon className={`w-4 h-4 relative z-10 ${activeLang === lang.id ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                                    <span className="relative z-10">{lang.label}</span>
                                    {activeLang === lang.id && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]" />}
                                </button>
                            ))}
                        </div>

                        {/* Code Area */}
                        <div className="flex-1 bg-[#050505] flex flex-col min-w-0 relative">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    <span className="ml-3 text-xs text-slate-500 font-mono">main.{activeLang === 'nodejs' ? 'js' : activeLang === 'python' ? 'py' : activeLang}</span>
                                </div>
                                <PremiumButton
                                    onClick={handleCopy}
                                    className={`h-8 px-4 text-xs font-medium border transition-all ${copied
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                        }`}
                                >
                                    {copied ? (
                                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center">
                                            <Check className="w-3.5 h-3.5 mr-1.5" /> Copied!
                                        </motion.div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Code
                                        </div>
                                    )}
                                </PremiumButton>
                            </div>

                            {/* Editor */}
                            <div className="flex-1 overflow-auto custom-scrollbar p-6">
                                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                                    <code className="block whitespace-pre">{getCode(activeLang)}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t border-white/5 bg-[#0a0a0c] flex justify-between items-center backdrop-blur-xl">
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Downloads</span>

                            {activeLang === 'cpp' && (
                                <a href="/sdk/cpp/NexusAuth.hpp" download className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 transition-all">
                                    <Code className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium text-violet-300">NexusAuth.hpp</span>
                                </a>
                            )}
                            {activeLang === 'python' && (
                                <a href="/sdk/python/nexus_auth.py" download className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 transition-all">
                                    <Terminal className="w-3.5 h-3.5 text-yellow-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium text-yellow-300">nexus_auth.py</span>
                                </a>
                            )}
                            {activeLang === 'csharp' && (
                                <a href="/sdk/csharp/NexusAuth.cs" download className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-all">
                                    <Hash className="w-3.5 h-3.5 text-green-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium text-green-300">NexusAuth.cs</span>
                                </a>
                            )}
                            {activeLang === 'nodejs' && (
                                <a href="/sdk/nodejs/nexus_auth.js" download className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-all">
                                    <Box className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium text-orange-300">nexus_auth.js</span>
                                </a>
                            )}
                        </div>
                        <PremiumButton onClick={onClose} variant="secondary" className="px-6">
                            Done
                        </PremiumButton>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
