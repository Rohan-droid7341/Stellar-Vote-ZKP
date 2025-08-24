"use client";
import { useState } from "react";
import { invokeContract } from "../../lib/soroban";

export default function CreateWorkspacePage() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);

  async function handleCreate() {
    const res = await invokeContract("create_workspace", [name]);
    setResult(res);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Create a Workspace</h2>
      <input
        type="text"
        placeholder="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 rounded mb-4 text-black"
      />
      <button
        onClick={handleCreate}
        className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
      >
        Create
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
