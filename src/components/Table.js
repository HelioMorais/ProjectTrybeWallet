import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { removeExpenses, expenses } = this.props;

    const updatedExpenses = expenses.filter((element) => element.id !== id);
    return removeExpenses(updatedExpenses);
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

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
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editExpense(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(element.id) }
                  >
                    Excluir
                  </button>
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

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (expenses) => dispatch(deleteExpenses(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.array,
  removeExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
