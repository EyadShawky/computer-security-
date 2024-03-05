import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const VigenereCipher = () => {
  const [inputText, setInputText] = useState('');
  const [encodedResult, setEncodedResult] = useState('');
  const [decodedResult, setDecodedResult] = useState('');
  const [key, setKey] = useState('');

  const encrypt = (plaintext, k) => {
    if (k.length <= 1) {
      alert("Keyword should be at least 2 characters long");
      return;
    }
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      ciphertext += String.fromCharCode((((plaintext.charCodeAt(i) - 97) + (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
    }
    return ciphertext;
  }

  const decrypt = (ciphertext, k) => {
    if (k.length <= 1) {
      alert("Keyword should be at least 2 characters long");
      return;
    }
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i++) {
      plaintext += String.fromCharCode((((ciphertext.charCodeAt(i) - 97) - (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
    }
    return plaintext;
  }

  const vigenerecipherButtonFunction = () => {
    const enteredKey = key.toLowerCase().replace(/[^a-z]/g, "");
    const message = inputText.toLowerCase().replace(/[^a-z]/g, "");

    if (enteredKey === "" || message === "") {
      alert("Please enter key and message to be ciphered!");
      return;
    }

    const result = encrypt(message, enteredKey);
    setEncodedResult(result);
  }

  const vigeneredecipherButtonFunction = () => {
    const enteredKey = key.toLowerCase().replace(/[^a-z]/g, "");
    const message = inputText.toLowerCase().replace(/[^a-z]/g, "");

    if (enteredKey === "" || message === "") {
      alert("Please enter key and message to be deciphered!");
      return;
    }

    const result = decrypt(message, enteredKey);
    setDecodedResult(result);
  }

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>Vigenere Cipher</h1>
      </div>
      <Tabs
        defaultActiveKey="1"
        centered
        className='tabs'
        items={[
          {
            label: 'Encode',
            key: '1',
            children: (
              <div className='container card-page'>
                <div className='card container'>
                  <Input
                    prefix={<EyeOutlined />}
                    className="site-form-item-icon input-card "
                    placeholder="Enter text to encode"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Encoded result"
                    readOnly
                    value={encodedResult}
                  />
                  <button className="btn btn-primary mt-4" onClick={vigenerecipherButtonFunction}><RocketOutlined /> Encode <RocketOutlined /> </button>
                </div>
              </div>
            ),
          },
          {
            label: 'Decode',
            key: '2',
            children: (
              <div className='container card-page'>
                <div className='card container'>
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card "
                    placeholder="Enter text to decode"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Decoded result"
                    readOnly
                    value={decodedResult}
                  />
                  <button className="btn btn-primary mt-4" onClick={vigeneredecipherButtonFunction}><RocketOutlined /> Decode <RocketOutlined /> </button>
                </div>
              </div>
            ),
          },
        ]}
      />
      <div className='container d-flex justify-content-center'>
        <Link to="/"><button className='btn btn-primary-back'><RollbackOutlined />  back To Home </button></Link>
      </div>
    </>
  )
}

export default VigenereCipher;