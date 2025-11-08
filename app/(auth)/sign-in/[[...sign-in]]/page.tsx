import { SignIn } from "@clerk/nextjs";

// TODO: Create a custom sign-in page
const SignInPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
};

export default SignInPage;
