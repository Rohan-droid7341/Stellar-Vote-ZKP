'use client';
import React, { useState } from 'react';
import { createWorkspace } from '../../lib/soroban';
import { getPublicKey } from '@stellar/freighter-api';


export default function CreateWorkspace() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workspaceId, setWorkspaceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setWorkspaceId(null);

    try {
      const userKey = await getPublicKey();
      const id = await createWorkspace(name, description, userKey);
      setWorkspaceId(id);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Create a New Workspace</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Workspace'}
        </button>
      </form>
      {workspaceId && <p>Workspace created with ID: {workspaceId}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}