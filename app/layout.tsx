"use client";
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { SessionProvider } from 'next-auth/react';
import '@rainbow-me/rainbowkit/styles.css';

import {
	getDefaultWallets,
	RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
	filecoin, polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
	[filecoin, polygonMumbai],
	[
		alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
		publicProvider()
	]
);

const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	projectId: "80a60229dbce417b5b1561edd9ed6c61",
	chains
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>
						<SessionProvider>
							<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
								<div className="relative flex flex-col h-screen">
									<Navbar />
									<main className="container mx-auto max-w-7xl px-6 flex-grow">
										{children}
									</main>
								</div>
							</Providers>
						</SessionProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</body>
		</html>
	);
}
