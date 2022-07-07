import React from 'react';
import './ItemTable.css';
import ItemCard from './ItemCard';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';

class ItemTable extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      items: [],
      cart: new CartService(),
      blocked: false
    };
  }
  
  componentDidMount = () => {
    ProductService.getAll().then((resp) => {
      this.setState({ items: resp });
      this.forceUpdate();
    });
  }

  submit = () => {
    this.state.cart.submit(this.state.items)
      .then(() => {
        window.location.href= '/reservations';
      });
  }

  reset = () => {
    this.state.cart.reset();
    this.forceUpdate();
  }

  arrayChunk = (n) => {
    const array = [...Array(this.state.items.length).keys()].slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  render() {
    return (
      <>
        {this.arrayChunk(3).map((row, key) => (
          <div key={key} className="row">
            {row.map((i, key) => (
              <div className="column">
                <ItemCard 
                  key={key} 
                  cart={this.state.cart} 
                  item={this.state.items[i]}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="buttons">
          <button className="btn cancel" onClick={this.reset}>
            Reset All
          </button>
          <button className="btn important" onClick={this.submit}>
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default ItemTable;