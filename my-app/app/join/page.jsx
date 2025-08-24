"use client";
import { useState } from "react";
import { invokeContract } from "../../lib/soroban";

export default function JoinWorkspacePage() {
  const [workspaceId, setWorkspaceId] = useState("");
  const [result, setResult] = useState(null);

  async function handleJoin() {
    const res = await invokeContract("join_workspace", [workspaceId]);
    setResult(res);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Join a Workspace</h2>
      <input
        type="text"
        placeholder="Workspace ID"
        value={workspaceId}
        onChange={(e) => setWorkspaceId(e.target.value)}
        className="px-4 py-2 rounded mb-4 text-black"
      />
      <button
        onClick={handleJoin}
        className="px-6 py-3 bg-green-600 rounded-xl hover:bg-green-700"
      >
        Join
      </button>

      {result && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg w-96 break-words">
          <h3 className="font-bold">Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
