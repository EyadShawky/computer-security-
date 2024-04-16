import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar__color">
      <div className='container'>

        <button className="navbar-toggler navbar-toggler-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
              <Link to='/play-fair' className="nav-link color__nav">Play Fair</Link>
            </li>
            <li className="nav-item">
              <Link to='/transposition' className="nav-link color__nav">Transposition</Link>
            </li>
            <li className="nav-item">
              <Link to='/railfance' className="nav-link color__nav">RailFance</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Header;
