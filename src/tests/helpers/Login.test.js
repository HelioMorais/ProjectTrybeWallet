import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Testes do projeto trybeWallet', () => {
  // Testa se a página de login é renderizada
  it('Renderiza a página de login', () => {
    // Renderiza o componente App dentro de um contexto com Router e Redux e armazena o histórico da navegação
    const { history } = renderWithRouterAndRedux(<App />);

    // Encontra os elementos de input e botão para login
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button');

    // Verifica se os elementos foram renderizados na tela
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    // Simula a digitação do email e senha e o clique no botão de login
    userEvent.type(emailInput, 'asdl@asd.com');
    userEvent.type(passwordInput, '12345678789789');
    userEvent.click(loginButton);

    // Verifica se o histórico de navegação foi atualizado e se a rota atual é '/carteira'
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  // Testa a página de carteira
  it('Testa a página de carteira', async () => {
    // Renderiza o componente App dentro de um contexto com Router e Redux e define a rota inicial como '/carteira'
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    // Encontra os elementos de input, select, botão e texto na página de carteira
    const searchInput = screen.getByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const addExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const brlText = screen.getByText(/brl/i);
    const expenseValueInput = screen.getByPlaceholderText(/value/i);

    // Verifica se os elementos foram renderizados na tela
    expect(expenseValueInput).toBeInTheDocument();
    expect(brlText).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(selects.length).toBe(3);
    expect(addExpenseButton).toBeInTheDocument();

    // Simula a digitação do valor da despesa e o clique no botão de adicionar despesa
    userEvent.type(expenseValueInput, '1');
    userEvent.click(addExpenseButton);

    // Verifica se o valor da despesa foi atualizado na tela
    const expenseValue = screen.queryAllByText('4.89');
    expect(expenseValue.length).toBeGreaterThan(0);
  });
});
