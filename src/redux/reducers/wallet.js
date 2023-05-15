// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUCCESS_REQUEST, FAILED_REQUEST, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada.
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case FAILED_REQUEST:
    return console.log(action.error.message);
  default:
    return state;
  }
};

export default wallet;
