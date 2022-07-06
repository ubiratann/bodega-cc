import React from 'react';
import './ItemTable.css';
import ItemCard from './ItemCard';
import Product from '../models/product';
import Cart from '../models/cart';

class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        new Product(
          1, "Maçã", "Fruta", 12.30, "Uma fruta docinha", 4, 
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/280px-Red_Apple.jpg"
        ),
        new Product(
          2, "Banana", "Fruta", 32.45, "Uma fruta ruim", 2,
          "data:image/jpeg;base64,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"
        ),
        new Product(
          3, "Abacaxi", "Fruta", 10.34, "Uma fruta azeda", 1,
          "https://conteudo.imguol.com.br/c/entretenimento/04/2017/12/11/abacaxi-1513012505452_v2_3x4.jpg"
        ),
        new Product(
          4, "Melancia", "Fruta", 23.45, "Uma fruta", 2,
          "https://agroinsight.com.br/wp-content/uploads/2021/04/nutricao-e-fertirrigacao-da-melancia-blog.jpg"
        ),
        new Product(
          5, "Ovo", "Mercadinho", 3.45, "Comida boa", 0,
          "https://img.itdg.com.br/tdg/images/blog/uploads/2017/04/shutterstock_379589734.jpg"
        ),
        new Product(
          6, "Leite", "Mercadinho", 5.64, "Bebida boa", 2,
          "https://opresenterural.com.br/wp-content/uploads/2021/06/ABRALEITE-Leite.jpg"
        ),
        new Product(
          7, "Queijo", "Mercadinho", 6.75, "Quejão", 15,
          "https://24127.cdn.simplo7.net/static/24127/sku/queijo-queijo-parmesao-queijo-parmesao-alagoa-curado-900-g--p-1613090568152.jpg"
        )
      ],
      cart: new Cart()
    };
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

        <button onClick={this.reset}>
          Reset All
        </button>
      </>
    );
  }
}

export default ItemTable;