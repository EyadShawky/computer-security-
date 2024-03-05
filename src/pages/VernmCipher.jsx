import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const VernmCipher = () => {
  const [inputText, setInputText] = useState('');
  const [encodedResult, setEncodedResult] = useState('');
  const [decodedResult, setDecodedResult] = useState('');
  const [key, setKey] = useState('');

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const encodeMessage = (message, enteredKey) => {
    let output = '';
    const nText = [];
    const kText = [];

    for (const i of message) {
      nText.push(alphabet.indexOf(i.toLowerCase()));
    }

    for (const i of enteredKey) {
      kText.push(alphabet.indexOf(i.toLowerCase()));
    }

    for (let i in nText) {
      output += alphabet[(nText[i] + kText[i]) % 26];
    }

    return output;
  }

  const decodeMessage = (message, enteredKey) => {
    let output = '';
    const nText = [];
    const kText = [];

    for (const i of message) {
      nText.push(alphabet.indexOf(i.toLowerCase()));
    }

    for (const i of enteredKey) {
      kText.push(alphabet.indexOf(i.toLowerCase()));
    }

    for (let i in nText) {
      output += alphabet[(nText[i] - kText[i]) < 0 ? 26 + (nText[i] - kText[i]) : (nText[i] - kText[i]) % 26];
    }

    return output;
  }

  const cipherButtonFunction = () => {
    if (key === '' || inputText === '') {
      alert("Please enter key and message to be ciphered!");
      return;
    }

    if (inputText.length !== key.length) {
      alert("Text and Key have to be the same length.");
      return;
    }

    const result = encodeMessage(inputText, key);
    setEncodedResult(result);
  }

  const decipherButtonFunction = () => {
    if (key === '' || inputText === '') {
      alert("Please enter key and message to be deciphered!");
      return;
    }

    if (inputText.length !== key.length) {
      alert("Text and Key have to be the same length.");
      return;
    }

    const result = decodeMessage(inputText, key);
    setDecodedResult(result);
  }

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>Vernam Cipher</h1>
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
                  <button className="btn btn-primary mt-4" onClick={cipherButtonFunction}><RocketOutlined /> Encode <RocketOutlined /> </button>
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
                  <button className="btn btn-primary mt-4" onClick={decipherButtonFunction}><RocketOutlined /> Decode <RocketOutlined /> </button>

                </div>
              </div>
            ),
          },
        ]}
      />
      <div className='container d-flex justify-content-center' >
        <Link to="/"><button className='btn btn-primary-back'><RollbackOutlined />  back To Home </button></Link>
      </div>
    </>
  )
}

export default VernmCipher;