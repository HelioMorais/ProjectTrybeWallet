import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => {
            const currencyName = element.exchangeRates[element.currency].name;
            const exchangeRateAsk = parseFloat(element.exchangeRates[element.currency]
              .ask);
            const convertedValue = (exchangeRateAsk * element.value).toFixed(2);

            return (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{`${parseFloat(element.value).toFixed(2)}`}</td>
                <td>{currencyName}</td>
                <td>{`${exchangeRateAsk.toFixed(2)}`}</td>
                <td>{`${convertedValue}`}</td>
                <td>Real</td>
                <td>
                  <button>Editar Despesa</button>
                  <button>Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
