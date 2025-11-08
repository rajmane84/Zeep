"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/home/spaces");
  }

  return <div>Landing Page</div>;
};

export default Home;
