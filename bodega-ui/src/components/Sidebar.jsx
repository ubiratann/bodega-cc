import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="title">
          <h5>Seja bem-vindo(a), Dambola</h5>
        </div>
        <ul>
          {
            this.props.links.map(function (link, i) {
              return (
                <li key={i}>
                  <a className={link.active ? "active" : ""} href={link.url}>
                    <span className="item">{link.display}</span>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}


export default Sidebar;
