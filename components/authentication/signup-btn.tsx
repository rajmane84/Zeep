"use client";
import { SignUpButton } from "@clerk/nextjs";
import clsx from "clsx";

const SignupBtn = () => {
  return (
    <SignUpButton mode="redirect">
      <button
        className={clsx(
          "cursor-pointer rounded-lg border px-3 py-1.5 font-medium text-white transition-all duration-300",
          "border-[#8581ff] bg-[#6C63FF] hover:text-shadow-xs",
          "from-[#6556F3] to-[#5D7CFF] hover:bg-linear-to-tr",
        )}
      >
        Start for free
      </button>
    </SignUpButton>
  );
};

export default SignupBtn;
