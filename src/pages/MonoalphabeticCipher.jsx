import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const MonoalphabeticCipher = () => {
  const [inputText, setInputText] = useState('');
  const [encodedResult, setEncodedResult] = useState('');
  const [decodedResult, setDecodedResult] = useState('');
  const [key, setKey] = useState('');
  const [shuffledArr, setShuffledArr] = useState([]);
  const alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const shuffle = (array) => {
    let shuffledArray = array.slice(0, array.length);
    let currentIndex = shuffledArray.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  };

  const cipher = () => {
    if (key.length !== 26) {
      alert("Key must be 26 characters in length");
      return;
    }

    const shuffled = shuffle(key.split(''));
    setShuffledArr(shuffled);
    console.log("Key : " + shuffled.join('').replace(/,/g, ''));

    const textArr = inputText.split('');

    const cipheredText = textArr.map((char) => {
      if ((char === ' ') || (char === '\t') || (char === '\n') || (alphabetArr.indexOf(char.toUpperCase()) === -1)) {
        return char;
      } else {
        return shuffled[alphabetArr.indexOf(char.toUpperCase())];
      }
    }).join('').replace(/,/g, '');

    console.log(cipheredText);
    setEncodedResult(cipheredText);
  };

  const decipher = () => {
    if (key.length !== 26) {
      alert("Key must be 26 characters in length");
      return;
    }

    const textArr = inputText.split('');

    const decipheredText = textArr.map((char) => {
      if ((char === ' ') || (char === '\t') || (char === '\n') || (alphabetArr.indexOf(char.toUpperCase()) === -1)) {
        return char;
      } else {
        return alphabetArr[shuffledArr.indexOf(char.toUpperCase())];
      }
    }).join('').replace(/,/g, '');

    console.log(decipheredText);
    setDecodedResult(decipheredText);
  };

  return (
    <>
      <div className='container d-flex justify-content-center'>
        <h1>MonoalphabeticCipher</h1>
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
                  <button className="btn btn-primary mt-4" onClick={cipher}><RocketOutlined /> Encode <RocketOutlined /> </button>
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
                  <button className="btn btn-primary mt-4" onClick={decipher}><RocketOutlined /> Decode <RocketOutlined /> </button>

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
  );
};

export default MonoalphabeticCipher;