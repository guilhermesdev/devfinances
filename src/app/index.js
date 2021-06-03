import '@/style/style.scss';
import '@/public/assets/expense.svg';
import '@/public/assets/income.svg';
import '@/public/assets/logo.svg';
import '@/public/assets/minus.svg';
import '@/public/assets/plus.svg';
import '@/public/assets/total.svg';

import Modal, { modalOverlay, modal } from './Modal.js';
import App from './App.js';
import Form from './Form.js';

const addTransactionButton = document.querySelector('.button.new');
const transactionForm = document.querySelector('[data-form="submit-transaction"]');

window.onload = () => {
  addTransactionButton.addEventListener('click', event => Modal.open(event));
  transactionForm.addEventListener('submit', Form.submit);
  modalOverlay.addEventListener('click', ({ target }) => Modal.close(target));
  App.init();
}