import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import ItemsSearchPage from './pages/ItemsSearchPage';
import AdministrationPage from './pages/AdministrationPage';
import RegisterProductPage from './pages/RegisterProductPage';
import LogInPage from './pages/LogInPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const links = [
  { display: "Home", url: "/", active: false },
  { display: "Novo Produto", url: "/register-product", active: false },
  { display: "People", url: "#", active: false },
  { display: "Perfomance", url: "#", active: false },
  { display: "Development", url: "#", active: false },
  { display: "Reports", url: "#", active: false },
  { display: "Admin", url: "/admin", active: false },
  { display: "Sair", url: "/logout", active: false },
];

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ItemsSearchPage links={links}/>} />
      <Route path="/admin" element={<AdministrationPage links={links}/>} />
      <Route path="/register-product" element={<RegisterProductPage links={links}/>} />
      <Route path="/login" element={<LogInPage/>} />
      {/* <Route path="/sigin" element={<SigInPage/>} /> */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
