"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🚀 Soroban Workspaces</h1>
      <div className="flex gap-6">
        <button
          onClick={() => router.push("/create")}
          className="px-6 py-3 bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700"
        >
          Create Workspace
        </button>
        <button
          onClick={() => router.push("/join")}
          className="px-6 py-3 bg-green-600 rounded-2xl shadow-lg hover:bg-green-700"
        >
          Join Workspace
        </button>
      </div>
    </div>
  );
}
