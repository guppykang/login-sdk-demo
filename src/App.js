import React, { useEffect, useState } from 'react';

const MoonpayWalletSDK = require('@moonpay/login-sdk').MoonpayWalletSDK;

const sdk = new MoonpayWalletSDK({
  loginDomain: 'https://buy-sandbox.moonpay.com',
  secureWalletDomain: 'https://web3.moonpay.com',
  apiKey: 'pk_test_123',
});

export default function App() {
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [unsignedMessage, setUnsignedMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');

  useEffect(() => {
    sdk.init().then(() => {
      console.log('sdk did init');
      setProvider(sdk.provider);
    });
  }, []);

  useEffect(() => {
    if (provider) {
      getAllWalletInfo();
    }
  }, [provider]);

  const getAllWalletInfo = async () => {
    if (!provider) return;
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    setAddress(address);
    setBalance(balance.toString());
  };

  const signMessage = async () => {
    if (!provider) return;
    const signer = provider.getSigner();
    const signature = await signer.signMessage(unsignedMessage);
    setSignedMessage(signature);
  };

  const containerStyle = {
    width: '50%',
    margin: '0 auto',
    marginTop: '10px',
    color: 'gray',
  };

  const headerStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '1rem',
  };

  const textAreaStyle = {
    padding: '1rem',
    border: '2px solid #ccc',
    borderRadius: '0.25rem',
    width: '100%',
    backgroundColor: 'lightgray',
    height: '10rem',
    marginTop: '1rem',
  };

  const buttonStyle = {
    margin: '1rem',
    padding: '0.75rem',
    border: '2px solid #ccc',
    width: '200px',
    backgroundColor: '#7D00FF',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '50%',
  };

  const resultTextAreaStyle = {
    ...textAreaStyle,
    backgroundColor: 'lightgray',
    height: '10rem',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      {/* header */}
      <div style={headerStyle}>
        <h1>Moonpay Wallet SDK</h1>
        <p>
          This is a demo of the Moonpay Wallet SDK. You can use this SDK to
          integrate Moonpay's secure wallet into your dApp.
        </p>
      </div>

      {/* wallet info */}
      <div style={headerStyle}>
        <h2>Wallet Info</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>Address:</span> {address}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Balance:</span> {balance}
        </p>
      </div>

      {/* sign message */}
      <div style={headerStyle}>
        <h2>Sign a message</h2>
        <textarea
          style={textAreaStyle}
          value={unsignedMessage}
          onChange={(e) => setUnsignedMessage(e.target.value)}
        />
        <button style={buttonStyle} onClick={signMessage}>
          Sign Message
        </button>
        <p>
          <span style={{ fontWeight: 'bold' }}>Signed Message:</span>
        </p>
        <textarea disabled style={resultTextAreaStyle} value={signedMessage} />
      </div>
    </div>
  );
}
