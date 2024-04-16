import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RailFance() {
  const [enteredKey, setEnteredKey] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const encodeMessage = (message, rows) => {
    message = message.split(" ").join("");
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    for (let char of message.split("")) {
      fence[rail].push(char);
      rail += change;

      if (rail === rows - 1 || rail === 0) change = -change;
    }

    let r = '';
    for (let rail of fence) r += rail.join("");

    return r;
  };

  const decodeMessage = (message, rows) => {
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    message.split("").forEach(char => {
      fence[rail].push(char);
      rail += change;

      if (rail === rows - 1 || rail === 0) change = -change;
    });

    const rFence = [];
    for (let i = 0; i < rows; i++) rFence.push([]);

    let i = 0;
    let s = message.split("");
    for (let r of fence) {
      for (let j = 0; j < r.length; j++) rFence[i].push(s.shift());
      i++;
    }

    rail = 0;
    change = 1;
    let r = "";
    for (let i = 0; i < message.length; i++) {
      r += rFence[rail].shift();
      rail += change;

      if (rail === rows - 1 || rail === 0) change = -change;
    }

    return r;
  };

  const cipherButtonFunction = () => {
    if (enteredKey === '' || inputMessage === '') {
      setError("Please enter key and message to be ciphered/deciphered!");
      return;
    }

    const result = encodeMessage(inputMessage, parseInt(enteredKey));
    setResult(result);
    setError('');
  };

  const decipherButtonFunction = () => {
    if (enteredKey === '' || inputMessage === '') {
      setError("Please enter key and message to be ciphered/deciphered!");
      return;
    }

    const result = decodeMessage(inputMessage, parseInt(enteredKey));
    setResult(result);
    setError('');
  };

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>RailFance Cipher</h1>
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
                    id="inputMessage"
                    value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    min="1"
                    max="25"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter Key"
                    id="enteredKey"
                    value={enteredKey}
                    onChange={(e) => setEnteredKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Encrypted result"
                    readOnly
                    id="result"
                    value={result}
                  />
                  <button className="btn btn-primary mt-4" onClick={cipherButtonFunction}><RocketOutlined /> Encrypt <RocketOutlined /> </button>

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
                    className="site-form-item-icon input-card"
                    placeholder="Enter text to decode"
                    id="inputMessage"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    min="1"
                    max="25"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter Key"
                    id="enteredKey"
                    value={enteredKey} onChange={(e) => setEnteredKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Decrypted result"
                    readOnly
                    id="result"
                    value={result}
                  />
                  <button className="btn btn-primary mt-4" onClick={decipherButtonFunction}><RocketOutlined /> Decrypt <RocketOutlined /> </button>

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

export default RailFance;
