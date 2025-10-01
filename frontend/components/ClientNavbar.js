"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientNavbar() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password") return null; // hide on login/register
  return <Navbar />;
}
