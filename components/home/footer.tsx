import Image from "next/image";
import { InstagramIcon, LinkedInIcon, XIcon } from "../icons";

function Footer() {
  return (
    <footer className="w-full py-8 text-sm text-neutral-600">
      <div className="mx-auto flex w-[90%] max-w-6xl flex-col items-center gap-4">
        {/* Top Row */}
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo + Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:justify-start">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-light-1.png"
                alt="Zep_logo"
                width={28}
                height={28}
                className="size-12"
              />
              <Image
                src="/logo-light-2.png"
                alt="zep_logo"
                height={40}
                width={140}
                className="size-14 cursor-pointer object-contain"
              />
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-neutral-500">
              <a
                href="#"
                className="transition-all duration-300 hover:text-black"
              >
                Terms and Conditions
              </a>
              <span>|</span>
              <a
                href="#"
                className="transition-all duration-300 hover:text-black"
              >
                Privacy Policy
              </a>
              <span>|</span>
              <a
                href="#"
                className="transition-all duration-300 hover:text-black"
              >
                Update Notes
              </a>
              <span>|</span>
              <a
                href="#"
                className="transition-all duration-300 hover:text-black"
              >
                Guide
              </a>
            </nav>
          </div>
        </div>
        {/* Divider */}
        <div className="h-px w-full bg-neutral-200" />

        {/* Bottom Info */}
        <div className="flex w-full items-center justify-between">
          <p className="max-w-2xl text-start text-xs leading-relaxed text-neutral-500">
            Zeep | Address: Nerul, Navi Mumbai | Phone: 7977965884 | Email:
            rajmane5884@gmail.com <br />© 2025 Zeep. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-neutral-500 transition duration-300 hover:scale-110 hover:text-pink-500"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="#"
              className="text-neutral-500 transition duration-300 hover:scale-110 hover:text-black"
            >
              <XIcon className="size-5" />
            </a>
            <a
              href="#"
              className="text-neutral-500 transition duration-300 hover:scale-110 hover:text-blue-800"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;