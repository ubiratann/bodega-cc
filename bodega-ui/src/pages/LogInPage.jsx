import React from 'react';
import './LogInPage.css';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: {}
    }
  }

  // renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  handleSubmit = (event) => {
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    const userData = { name: "Daniel", email: "danielnreboucas@hotmail.com", token: "asdasdasd"}; //get from backend

    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  render() {
    return (
      <div className="App Login">
        <form className="login-page" onSubmit={this.handleSubmit}>
          <h5>Fazer Login</h5>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default LogInPage;
