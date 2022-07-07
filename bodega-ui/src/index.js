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
import ReservationsPage from './pages/ReservationsPage';
import LogInPage from './pages/LogInPage';
import SignInPage from './pages/SignInPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const links = [
  { display: "Home", url: "/", active: false, userTypes: [1] },
  { display: "Novo Produto", url: "/register-product", active: false, userTypes: [2] },
  { display: "Reservas", url: "/reservations", active: false, userTypes: [1] },
  { display: "Admin", url: "/admin", active: false, userTypes: [2] },
];

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ItemsSearchPage links={links}/>} />
      <Route path="/admin" element={<AdministrationPage links={links}/>} />
      <Route path="/register-product" element={<RegisterProductPage links={links}/>} />
      <Route path="/reservations" element={<ReservationsPage links={links}/>} />
      <Route path="/login" element={<LogInPage/>} />
      <Route path="/signin" element={<SignInPage/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
