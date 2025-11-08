import { SignUp } from "@clerk/nextjs";

// TODO: Create a custom sign-up page
const SignUpPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <SignUp
        path="/sign-up" // CRITICAL: Tells Clerk the component lives here
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
};

export default SignUpPage;
