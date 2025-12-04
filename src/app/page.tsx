import { GoogleSignIn } from "@/components/GoogleSignIn";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-600 mb-8">Sign in to continue</p>
        <GoogleSignIn />
      </div>
    </div>
  );
}