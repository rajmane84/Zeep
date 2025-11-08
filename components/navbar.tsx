"use client";
import { useState } from "react";
import {
  CaretDownIcon,
  CaretUpIcon,
  CheveronDown,
  MoonIcon,
  SunIcon,
} from "./icons";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";
import { SignupBtn, SigninBtn } from "./authentication";

type NavbarSubOption = {
  name: string;
  description?: string;
  logo: string;
};

type NavbarOption = {
  name: string;
  isExpandable: boolean;
  options?: NavbarSubOption[];
  redirectTo?: string;
};

const navbarOptions: NavbarOption[] = [
  {
    name: "About",
    isExpandable: true,
    options: [
      {
        name: "zep",
        description:
          "Freely utilize virtual Spaces with our convenient platform.",
        logo: "/globe.svg",
      },
    ],
  },
  {
    name: "Customer Support",
    isExpandable: true,
    options: [
      {
        name: "Official Guide",
        logo: "/globe.svg",
      },
      {
        name: "Announcement",
        logo: "/globe.svg",
      },
      {
        name: "Update Notes",
        logo: "/globe.svg",
      },
      {
        name: "FAQ",
        logo: "/globe.svg",
      },
      {
        name: "Blog",
        logo: "/globe.svg",
      },
      {
        name: "Asset store",
        logo: "/globe.svg",
      },
    ],
  },
  {
    name: "Explore",
    isExpandable: false,
    redirectTo: "/explore",
  },
  {
    name: "Pricing",
    isExpandable: false,
    redirectTo: "/pricing",
  },
];

const Navbar = () => {
  const router = useRouter();
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 2);
  });

  // Some issue is there in this
  const handleRedirect = () => {
    if(!isSignedIn){
      router.push("/")
    }

    router.push("/home/spaces")
  }

  return (
    <motion.div
      className={clsx(
        "fixed inset-x-0 top-0 z-50 h-16 w-full bg-white/80 text-black backdrop-blur-md transition-all duration-300",
        isScrolled ? "shadow-md" : "shadow-none",
      )}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
        <div className="flex h-full items-center gap-8">
          <Image
            src={"/next.svg"}
            alt="zep_logo"
            height={30}
            width={30}
            className="size-18 cursor-pointer"
            onClick={handleRedirect}
          />
          <div className="flex items-center gap-4">
            {navbarOptions.map((option) => (
              <NavbarButton key={option.name} option={option} />
            ))}
          </div>
        </div>

        {isSignedIn ? (
          <div className="flex h-full items-center gap-6">
            <div
              onClick={() => setIsProfileOptionsOpen(!isProfileOptionsOpen)}
              className="flex h-full cursor-pointer items-center gap-2"
            >
              <span className="text-sm text-neutral-500">rajmane84</span>
              {!isProfileOptionsOpen ? (
                <CaretDownIcon className="size-3 fill-neutral-400" />
              ) : (
                <CaretUpIcon className="size-3 fill-neutral-400" />
              )}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MoonIcon className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SunIcon className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center gap-6">
            <SignedOut>
              <SigninBtn />
              <SignupBtn />
            </SignedOut>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const NavbarButton = ({ option }: { option: NavbarOption }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsHovered(false), 150);
    setCloseTimeout(timeout);
  };

  const handleClick = () => {
    if (!option.isExpandable && option.redirectTo) {
      router.push(option.redirectTo);
    }
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={clsx(
          "flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
          isHovered ? "bg-neutral-200" : "hover:bg-neutral-100",
        )}
      >
        {option.name}
        {option.isExpandable && (
          <motion.div
            initial={false}
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <CheveronDown className="size-4 stroke-black" />
          </motion.div>
        )}
      </button>

      {option.isExpandable && isHovered && option.options && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 z-50 mt-2 w-56 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg"
        >
          {option.options.map((sub) => (
            <button
              key={sub.name}
              onClick={() => alert(`Clicked on ${sub.name}`)}
              className="flex w-full cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-blue-100/20"
            >
              <Image
                src={sub.logo}
                alt={sub.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{sub.name}</span>
                {sub.description && (
                  <span className="text-xs text-neutral-500">
                    {sub.description}
                  </span>
                )}
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
