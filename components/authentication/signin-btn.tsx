import { SignInButton } from "@clerk/nextjs";
import clsx from "clsx";

const SigninBtn = () => {
  return (
    <SignInButton>
      <button
        className={clsx(
          "cursor-pointer rounded-lg border px-3 py-1.5 font-medium text-[#8581ff] transition-all duration-300",
          "border-neutral-100 hover:bg-blue-100/25 hover:border-neutral-200/50",
        )}
      >
        Sign In
      </button>
    </SignInButton>
  );
};

export default SigninBtn;
