import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => {
      const exchangeRate = parseFloat(curr.exchangeRates[curr.currency].ask);
      const expenseValue = parseFloat(curr.value);
      return acc + expenseValue * exchangeRate;
    }, 0);

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
