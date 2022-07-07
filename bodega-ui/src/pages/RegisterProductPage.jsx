import React from 'react';
import './AdministrationPage.css';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProductService from '../services/ProductService';

class RegisterProductPage extends React.Component {
  constructor(props) {
    super(props);
    const links = [...props.links];
    links.forEach((value) => { 
      if(value.display == "Novo Produto"){
        value.active = true;
      } else {
        value.active = false;
      }
    });

    this.state = {
      links: links,
      name: "",
      category: "",
      price: 0.01,
      description: "",
      quantity: 1,
      image: "",
      error: ""
    }
  }

  handleClick = () => {
    ProductService.create(
      this.state.name, 
      this.state.price, 
      this.state.description, 
      this.state.quantity, 
      this.state.image, 
      1
    ).then((res) => {
      this.setState({
        name: "",
        category: "",
        price: 0.01,
        description: "",
        quantity: 1,
        image: "",
        error: ""
      })
    }).catch((error) => {
      this.setState({ error: error });
      setTimeout(() => {
        this.setState({ error: ""});
        this.forceUpdate();
      }, 5000);
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar links={this.state.links}/>
        <MainContent>
          <h1>Adicionar um novo Produto:</h1>
          <div>
            <div>
              <label>Name:</label>
              <input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              />
            </div>
            <div>
              <label>Price:</label>
              <input 
                type="number" 
                min="0.01" 
                step="0.01"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input 
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                step="1"
                value={this.state.quantity}
                onChange={(e) => this.setState({ quantity: e.target.value })}
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
            </div>
            <div>
              <button onClick={this.handleClick}>Register!</button>
            </div>
            <div>
              <span>{this.state.error}</span>
            </div>
          </div>
        </MainContent>
      </div>
    );
  }
}

export default RegisterProductPage;
