import React from 'react';
import './Sidebar.css';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  logout = () => {
    AuthService.doLogout();
    this.setState({redirect: true});
  }

  render() {
    const auth = AuthService.getInstance();
    if (!auth.authenticated) {
      window.location.href = "/login";
    }
    
    return (
      <div className="sidebar">
        <div className="title">
          <h5>Seja bem-vindo(a), Dambola</h5>
        </div>
        <ul>
          {
            this.props.links.map(function (link, i) {
              if (!link.userTypes.includes(AuthService.getInstance().userType)){
                return;
              }
              
              return (
                <li key={i}>
                  <Link 
                    className={link.active ? "a active" : "a"} 
                    to={link.url}>
                    {link.display}
                  </Link>
                </li>
              );
            })
          }
          <li>
            <a className='a' onClick={this.logout}>Sair</a>
          </li>
        </ul>
      </div>
    );
  }
}


export default Sidebar;
