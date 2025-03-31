import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ServerInitializer from "@/components/ServerInitializer";
import { Toaster } from "sonner";
import { siteConfig } from "./config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  icons: [{
    url: "/scribeFlow.webp",
    href: "/scribeFlow.webp"
  }]
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
         <ServerInitializer />
        <div className="bg-[url('/paperboard-texture.jpg')] fixed inset-0 -z-10 opacity-50" />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster richColors />
        <footer className="py-10 border-t-2">
          <div className="container text-center px-4 mx-auto">
            <p>© 2025 ScribeFlow. All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
