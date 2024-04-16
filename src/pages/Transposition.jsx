import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';


const Transposition = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [cipheredText, setCipheredText] = useState('');
  const [decipheredText, setDecipheredText] = useState('');

  const hasDuplicates = (text = '') => {
    for (const char of text)
      if (text.indexOf(char) !== text.lastIndexOf(char))
        return true;
    return false;
  }

  const compareFunction = (char1 = '', char2) => {
    if (char1.charCodeAt(0) < char2.charCodeAt(0)) return -1;
    if (char1.charCodeAt(0) > char2.charCodeAt(0)) return 1;
    return 0;
  }

  const fillMatrixFromPlainText = (plainText, key) => {
    const mat = [];
    let filling = ' ';
    const rows = Math.ceil((plainText.length / key.length));
    for (let i = 0; i < rows; i++)
      mat[i] = plainText.substr(i * key.length, key.length).split('');

    const missingChars = key.length - mat[rows - 1].length;
    if (missingChars > 0)
      mat[rows - 1].push(...filling.repeat(missingChars).split(''));

    return mat;
  }

  const fillMatrixFromCipheredText = (ciphered, key = '') => {
    const matrix = [];
    const rows = Math.ceil((ciphered.length / key.length));
    const keyAsc = key.split('').sort(compareFunction);

    for (let i = 0; i < rows; i++)
      matrix[i] = [];

    for (let k = 0; k < ciphered.length; k++) {
      const i = (k + rows) % rows;
      const j = Math.floor((k + rows) / rows) - 1;
      const col = key.indexOf(keyAsc[j]);
      matrix[i][col] = ciphered.charAt(k);
    }
    return matrix;
  }

  const cipher = (mat, key) => {
    const keyAsc = key.split('').sort(compareFunction);
    let textCiphered = '';
    for (const char of keyAsc) {
      const index = key.indexOf(char);
      for (let j = 0; j < mat.length; j++)
        textCiphered += mat[j][index];
    }
    return textCiphered;
  }

  const decipher = (matrix) => {
    let text = '';
    for (let i = 0; i < matrix.length; i++) {
      text += matrix[i].join('');
    }
    return text;
  }

  const handleEncrypt = () => {
    if (!text || !key) return;
    if (hasDuplicates(key)) {
      alert('The key has repeated characters');
      return;
    }
    const mat = fillMatrixFromPlainText(text, key);
    setCipheredText(cipher(mat, key));
  }

  const handleDecrypt = () => {
    if (!cipheredText || !key) return;
    if (hasDuplicates(key)) {
      alert('The key has repeated characters');
      return;
    }
    const matrix = fillMatrixFromCipheredText(cipheredText, key);
    const decipheredText = decipher(matrix);
    setDecipheredText(decipheredText);
  }

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>Transposition Cipher</h1>
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
                    id="text"
                    value={text} onChange={(e) => setText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter key"
                    id="key"
                    value={key} onChange={(e) => setKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Encrypted result"
                    readOnly
                    id="ciphered" value={cipheredText}
                  />
                  <button className="btn btn-primary mt-4" onClick={handleEncrypt}><RocketOutlined /> Encrypt <RocketOutlined /> </button>
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
                    type="text"
                    id="text"
                    value={cipheredText}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter key"
                    id="key"
                    value={key} onChange={(e) => setKey(e.target.value)}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Decrypted result"
                    id="deciphered" value={text}
                  />
                  <button className="btn btn-primary mt-4" onClick={handleDecrypt}><RocketOutlined /> Decrypt <RocketOutlined /> </button>
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


export default Transposition;

