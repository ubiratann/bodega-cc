import React from 'react';
import AuthService from '../services/AuthService';
import { Navigate } from "react-router-dom";
import './SignInPage.css';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: {},
      name: "",
      password: "",
      email: "",
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = { 
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password,
      typeId: 1 };
    AuthService.createUser(userData).then((res) => {
      this.setState({redirect: true});
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Navigate to="/login"/>
      );
    }
    return (
      <div className="App Signin">
        <form className="signin-page" onSubmit={this.handleSubmit}>
          <h5>Registrar novo Usuário</h5>
          <div className="input-container">
            <label>Username </label>
            <input type="text" required value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
          <div className="input-container">
            <label>Email </label>
            <input type="email" required value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" required value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}/>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div>
            <a href="/login">Fazer login aqui!</a>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInPage;
