import React, { useState } from 'react';
import axios from 'axios';

interface SignResponse {
  signature: string;
}

interface VerifyResponse {
  status: boolean;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [verificationStatus, setVerificationStatus] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post<SignResponse>('http://localhost:8080/sign', { message });
      setSignature(res.data.signature);
      setVerificationStatus('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post<VerifyResponse>('http://localhost:8080/verify', { message, signature });
      setVerificationStatus(res.data.status ? 'Signature is VALID' : 'Signature is INVALID');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <img src="https://imgs.search.brave.com/bSaQfmeLvi1MDx6osuu4sv-6f9nj0Oged70-oJei-yI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LWxvZ29zLmNvbS8y/MDE2LzExL0hvbmV5/d2VsbF9sb2dvLnBu/Zw" alt="Honeywell Logo" height={50} />
      <h2>Digital Signature App</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows={5}
        style={{ width: '100%' }}
      />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>

      {signature && (
        <>
          <p><strong>Signature (Base64):</strong></p>
          <textarea readOnly value={signature} style={{ width: '100%' }} />
          <br /><br />
          <button onClick={handleVerify}>Verify</button>
        </>
      )}

      {verificationStatus && (
        <p><strong>Verification Status:</strong> {verificationStatus}</p>
      )}
    </div>
  );
};

export default App;
