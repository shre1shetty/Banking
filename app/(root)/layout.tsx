import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggeIn = { firstName: "Shrevan", lastName: "Shetty" };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggeIn} />

      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={38} height={30} alt="menu icon" />
          <div>
            <MobileNav user={loggeIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
