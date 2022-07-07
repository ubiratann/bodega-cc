import './ItemsSearchPage.css';
import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ItemTable from '../components/ItemTable';

class ItemsSearchPage extends React.Component {
  constructor(props) {
    super(props);

    const links = [...props.links];
    links.forEach((value) => { 
      if(value.display == "Home"){
        value.active = true;
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
          <ItemTable/>
        </MainContent>
      </div>
    );
  }
}

export default ItemsSearchPage;
