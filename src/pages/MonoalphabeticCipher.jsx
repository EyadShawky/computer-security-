import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const MonoalphabeticCipher = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [userKey, setUserKey] = useState('');

  const handleCipher = (isEncrypt) => {
    if (isEncrypt) {
      cipher();
    } else {
      decipher();
    }
  };

  const cipher = () => {
    const key = userKey.toUpperCase();
    let result = '';

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i].toUpperCase();
      const index = alphabetArr.indexOf(char);

      if (index !== -1) {
        result += key[index % key.length];
      } else {
        result += char;
      }
    }

    setOutputText(result);
  };

  const decipher = () => {
    const key = userKey.toUpperCase();
    let result = '';

    for (let i = 0; i < outputText.length; i++) {
      const char = outputText[i].toUpperCase();
      const index = key.indexOf(char);

      if (index !== -1) {
        result += alphabetArr[index];
      } else {
        result += char;
      }
    }

    setDecryptedText(result);
  };

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>Monoalphabetic Cipher</h1>
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
                    value={inputText} onChange={e => setInputText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="text"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter custom key"
                    value={userKey} onChange={e => setUserKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Encrypted result"
                    readOnly
                    value={outputText}
                  />
                  <button className="btn btn-primary mt-4" onClick={() => handleCipher(true)}><RocketOutlined /> Encrypt <RocketOutlined /> </button>
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
                    prefix={<EyeOutlined />}
                    className="site-form-item-icon input-card "
                    placeholder="Enter text to decode"
                    value={outputText}
                    onChange={e => setOutputText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="text"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter custom key"
                    value={userKey}
                    onChange={e => setUserKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Decrypted result"
                    readOnly
                    value={decryptedText}
                  />
                  <button className="btn btn-primary mt-4" onClick={() => handleCipher(false)}><RocketOutlined /> Decrypt <RocketOutlined /> </button>
                </div>
              </div>
            ),
          },
        ]}
      />

      <div className='container d-flex justify-content-center' >
        <Link to="/"><button className='btn btn-primary-back'><RollbackOutlined />  Back To Home </button></Link>
      </div>
    </>
  );
}

export default MonoalphabeticCipher;
