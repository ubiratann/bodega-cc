import React from 'react';
import './MainContent.css';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainContent;