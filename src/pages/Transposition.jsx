import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Transposition = () => {
  function rot13(form, shift) {
    var newstr = "";
    for (var i = 0; i < form.length; i++) {
      var charCode = form.charCodeAt(i);
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        var shiftAmount = charCode <= 90 ? 65 : 97;
        newstr += String.fromCharCode((charCode - shiftAmount - shift + 26) % 26 + shiftAmount);
      } else {
        newstr += form[i];
      }
    }
    return newstr;
  }

  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [encodedResult, setEncodedResult] = useState('');
  const [decodedResult, setDecodedResult] = useState('');

  const handleEncode = () => {
    const upCase = inputText.toUpperCase();
    const encrypted = rot13(upCase, -shift);
    setEncodedResult(encrypted);
    setDecodedResult('');
  }

  const handleDecode = () => {
    const upCase = inputText.toUpperCase();
    const decrypted = rot13(upCase, shift);
    setDecodedResult(decrypted);
    setEncodedResult('');
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleShiftChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setShift(isNaN(value) ? 1 : Math.max(1, Math.min(25, value)));
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
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    min="1"
                    max="25"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter shift value"
                    value={shift}
                    onChange={handleShiftChange}
                  />
                  <Input
                    prefix={<EyeInvisibleOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Encrypted result"
                    readOnly
                    value={encodedResult}
                  />
                  <button className="btn btn-primary mt-4" onClick={handleEncode}><RocketOutlined /> Encrypt <RocketOutlined /> </button>

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
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <Input
                    prefix={<FunctionOutlined />}
                    type="number"
                    min="1"
                    max="25"
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Enter shift value"
                    value={shift}
                    onChange={handleShiftChange}
                  />
                  <Input
                    prefix={<EyeOutlined />}
                    className="site-form-item-icon input-card mt-4"
                    placeholder="Decrypted result"
                    readOnly
                    value={decodedResult}
                  />
                                    <button className="btn btn-primary mt-4" onClick={handleDecode}><RocketOutlined /> Decrypt <RocketOutlined /> </button>

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
  )
}

export default Transposition;