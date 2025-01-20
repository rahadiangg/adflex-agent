import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bus Schedule",
  description: "Real-time bus schedule information",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          padding: "20px", 
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          color: "white", 
          fontSize: "24px", 
          fontWeight: "bold",
          borderRadius: "0 0 0 10px"
        }}>
          {new Date().toLocaleString()}
        </div>
        {children}
      </body>
    </html>
  )
}

