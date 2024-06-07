import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.action";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const loggeIn = { firstName: "Shrevan", lastName: "Shetty" };
  const loggeInUser = await getLoggedInUser();
  console.log(loggeInUser);
  if (!loggeInUser) redirect("/sign-in");
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggeInUser} />

      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={38} height={30} alt="menu icon" />
          <div>
            <MobileNav user={loggeInUser} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
