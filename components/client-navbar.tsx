"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const ClientNavbar = () => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/sign-in", "/sign-up"];

  if (hideNavbarRoutes.includes(pathname)) return null;

  return <Navbar />;
};

export default ClientNavbar;
