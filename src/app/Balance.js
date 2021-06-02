import Transaction from './Transaction.js';

const incomes = document.querySelector('.card[data-type="incomes"] > span');
const expenses = document.querySelector('.card[data-type="expenses"] > span');
const total = document.querySelector('.card[data-type="total"] > span');

const Balance = {
  updateIncomes(){
    incomes.innerText = Transaction.getIncomes();
    this.updateTotal();
  },
  updateExpenses(){
    expenses.innerText = Transaction.getExpenses();
    this.updateTotal();
  },
  updateTotal(){
    total.innerText = Transaction.getTotal();
  },
  updateAll(){
    this.updateIncomes();
    this.updateExpenses();
  }
}

export default Balance;