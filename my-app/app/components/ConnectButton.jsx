import React, { useState, useEffect } from 'react';
import { setAllowed, getPublicKey, isAllowed } from '@stellar/freighter-api';

export default function ConnectButton() {
  const [publicKey, setPublicKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const allowed = await isAllowed();
      if (allowed) {
        const key = await getPublicKey();
        setPublicKey(key);
        setIsConnected(true);
      }
    };
    checkConnection();
  }, []);

  const handleConnect = async () => {
    try {
      await setAllowed();
      const key = await getPublicKey();
      setPublicKey(key);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to Freighter:', error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected!</p>
          <p>Public Key: {`${publicKey.substring(0, 8)}...${publicKey.substring(publicKey.length - 8)}`}</p>
        </div>
      ) : (
        <button onClick={handleConnect}>
          Connect to Freighter
        </button>
      )}
    </div>
  );
}