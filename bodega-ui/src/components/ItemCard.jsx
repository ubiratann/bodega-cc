import React from 'react';
import './ItemCard.css';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddClick = () => {
    this.props.cart.add(this.props.item);
    this.forceUpdate();
  };

  handleRemoveClick = () => {
    this.props.cart.remove(this.props.item);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="card">
        <div className="card-image">
          <img src={this.props.item.image ?? "https://24127.cdn.simplo7.net/static/24127/sku/queijo-queijo-parmesao-queijo-parmesao-alagoa-curado-900-g--p-1613090568152.jpg"}/>
        </div>
        <p className="card-title">{this.props.item.name}</p>
        <p className="card-author">{this.props.item.description}</p>
        <div className="card-button">
          <button onClick={this.handleAddClick}>+</button>
          <span>{this.props.cart.get(this.props.item)}/{this.props.item.quantity}</span>
          <button onClick={this.handleRemoveClick}>-</button>
        </div>
      </div>
    );
  }
}

export default ItemCard;