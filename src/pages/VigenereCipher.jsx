import { EyeInvisibleOutlined, EyeOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import {  Input, Tabs } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const VigenereCipher = () => {

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
                <Input prefix={<EyeOutlined />} className="site-form-item-icon input-card " placeholder="Enter text to encode" />
                <button className="btn btn-primary mt-4"><RocketOutlined /> Encode <RocketOutlined /> </button>
                <Input prefix={<EyeInvisibleOutlined />} className="site-form-item-icon input-card mt-4" placeholder="Encoded result" readOnly />
              </div>
            </div>
          ),
        },
        {
          label: 'deCode',
          key: '2',
          children: (
            <div className='container card-page'>
              <div className='card container'>
                <Input prefix={<EyeInvisibleOutlined />} className="site-form-item-icon input-card " placeholder="Enter text to decode" />
                <button className="btn btn-primary mt-4"> <RocketOutlined /> Decode <RocketOutlined /> </button>
                <Input prefix={<EyeOutlined />} className="site-form-item-icon input-card mt-4" placeholder="decode result" readOnly />
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

export default VigenereCipher
