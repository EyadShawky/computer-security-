import React from 'react';
import landing from '../lottie/security.json'
import Lottie from 'lottie-react';
const Home = () => {
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-lg-6 d-flex align-items-center text-home">
          <div className='p-5'>
            <h1 className='text-header'>SecureCipher</h1>
            <p className='text-body'>SecureCipher offers a diverse range of encryption algorithms tailored for varying security needs, including the simple yet historic Caesar Cipher, the straightforward Monoalphabetic Cipher, the sophisticated Vigenère Cipher with its polyalphabetic encryption, and the ultimate in security, the mathematically unbreakable Vernam Cipher. This selection caters to both beginners and experts, ensuring secure, encrypted communication for all users.</p>
          </div>
        </div>
        <div className="col-lg-6 overflow-hidden">
          <Lottie animationData={landing} className='img-landing'/>
        </div>
      </div>
    </div>
  );
}

export default Home;
