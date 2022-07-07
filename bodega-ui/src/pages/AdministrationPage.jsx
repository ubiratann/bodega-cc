import React from 'react';
import './AdministrationPage.css';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

class AdministrationPage extends React.Component {
  constructor(props) {
    super(props);

    const links = [...props.links];
    links.forEach((value) => { 
      if(value.display == "Admin"){
        value.active = true;
      } else {
        value.active = false;
      }
    });

    this.state = {
      links: links
    }
  }

  render() {
    return (
      <div className="App">
        <Sidebar links={this.state.links}/>
        <MainContent>
          <h1>Nice!</h1>
        </MainContent>
      </div>
    );
  }
}

export default AdministrationPage;
