import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    const validateEmail = (userEmail) => {
      const regexEmail = /\S+@\S+\.\S+/;
      return regexEmail.test(userEmail);
    };

    const MIN_PASSWORD_LENGTH = 6;
    const validatePassword = (userPassword) => userPassword.length >= MIN_PASSWORD_LENGTH;

    return (
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            id="email-input"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            id="password-input"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !(validateEmail(email) && validatePassword(password)) }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
