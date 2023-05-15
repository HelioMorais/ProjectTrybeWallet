import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, fetchExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    value: '',
    description: '',
  };

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { fetchWallet } = this.props;
    fetchWallet(this.state);
    this.setState((prevState) => ({
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  };

  render() {
    const { currency, method, tag, value, description } = this.state;
    const { currencies } = this.props;
    const options = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((element) => <option key={ element }>{element}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {options.map((element) => <option key={ element }>{element}</option>)}
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {tagOptions.map((element) => <option key={ element }>{element}</option>)}
          </select>
        </label>
        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  fetchWallet: (expenses) => dispatch(fetchExpenses(expenses)),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func,
  currencies: PropTypes.array,
  fetchExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
