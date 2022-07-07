import React from 'react';
import { Navigate } from "react-router-dom";
import AuthService from '../services/AuthService';
import './LogInPage.css';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: {},
      email: "",
      password: "",
      logged: false
    }
  }

  // renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  handleSubmit = (event) => {
    event.preventDefault();
    AuthService.doLogin(this.state.email, this.state.password).then(() => {
      this.setState({ logged: true });
    });
  };

  render() {
    if (this.state.logged) {
      return (
        <Navigate to="/"/>
      )
    }

    return (
      <div className="App Login">
        <form className="login-page" onSubmit={this.handleSubmit}>
          <h5>Fazer Login</h5>
          <div className="input-container">
            <label>Email </label>
            <input type="email" name="uemail" required value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}/>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div>
            <a href="/signin">Criar nova conta aqui!</a>
          </div>
        </form>
      </div>
    );
  }
}

export default LogInPage;
