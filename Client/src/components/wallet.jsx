// src/components/WalletGenerator.js

import React, { useState } from 'react';
import axios from 'axios';

function WalletGenerator() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8000/generateWallet');
      setWallet(response.data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={generateWallet}>
        Connect
      </button>

      {loading && <p>Loading...</p>}
      
      {error && <p>Error: {error}</p>}

      {wallet && (
        <div>
          <p>{wallet.walletAddress}</p>
        </div>
      )}
    </div>
  );
}

export default WalletGenerator;