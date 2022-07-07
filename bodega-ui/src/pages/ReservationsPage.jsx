import React from 'react';
import './AdministrationPage.css';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ReserveService from '../services/ReserveService';
import AuthService from '../services/AuthService';

class ReservationsPage extends React.Component {
  constructor(props) {
    super(props);
    const links = [...props.links];
    links.forEach((value) => { 
      if(value.display == "Reservas"){
        value.active = true;
      }
    });

    this.state = {
      links: links,
      reserveItems: []
    }
  }

  groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  componentDidMount = () => {
    const auth = AuthService.getInstance();
    ReserveService.get(auth.userId).then((resp) => {
      this.setState({ reserveItems: resp.data });
      console.log(resp);
      this.forceUpdate();
    });
  }

  totalValue = (group) => {
    let sum = 0;
    for (let i = 0; i < group.length; i++) {
      sum += group[i].stockItem.product.price;
    }
    return sum;
  }

  render() {
    return (
      <div className="App">
        <Sidebar links={this.state.links}/>
        <MainContent>
          <h1>Reservations</h1>
            {
              Object.values(this.groupBy(this.state.reserveItems, 'reserveId')).map((i) => (
                <div>
                  <h4>Reserva nº {i[0].reserveId}</h4>
                  <table border="1">
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                    </tr>
                    {i.map((j) => (
                      <tr>
                        <td>{j.stockItem.product.name}</td>
                        <td>{j.stockItem.product.description}</td>
                        <td>{j.stockItem.product.price}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan="2">Total</td>
                      <td>{this.totalValue(i)}</td>
                    </tr>
                  </table>
                </div>
              ))
            }
        </MainContent>
      </div>
    );
  }
}

export default ReservationsPage;
