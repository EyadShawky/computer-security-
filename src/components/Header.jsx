import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar__color">
        <div className='container'>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link to='/caesar-cipher' className="nav-link color__nav">Caesar Cipher</Link>
              </li>
              <li className="nav-item">
                <Link to='/monoalphabetic-cipher' className="nav-link color__nav">Monoalphabetic Cipher</Link>
              </li>
              <li className="nav-item">
                <Link to='/vigenere-cipher' className="nav-link color__nav">Vigenère Cipher</Link>
              </li>
              <li className="nav-item">
                <Link to='/Vernm-cipher' className="nav-link color__nav">Vernm Cipher</Link>
              </li>
              
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Header;
