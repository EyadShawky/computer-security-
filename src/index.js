import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import ErrorPage from './pages/Error';
import Home from './pages/home';
import LayoutMain from './components/Layout';
import CaesarCipher from './pages/CaesarCipher';
import MonoalphabeticCipher from './pages/MonoalphabeticCipher';
import VernmCipher from './pages/VernmCipher';
import VigenereCipher from './pages/VigenereCipher';


const route = createBrowserRouter([
  { path: '/', element: <LayoutMain />, children:[
    {index:true , element:<Home />},
    {path:"caesar-cipher" , element:<CaesarCipher />},
    {path:"monoalphabetic-cipher" , element:<MonoalphabeticCipher />},
    {path:"vigenere-cipher" , element:<VigenereCipher />},
    {path:"Vernm-cipher" , element:<VernmCipher  />},
    {path:"/*" , element:<ErrorPage/>},
  ] },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);


