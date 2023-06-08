import '@/style/style.scss';
import '@/public/assets/expense.svg';
import '@/public/assets/income.svg';
import '@/public/assets/logo.svg';
import '@/public/assets/minus.svg';
import '@/public/assets/plus.svg';
import '@/public/assets/total.svg';

import Modal, { modalOverlay } from './Modal';
import { App } from './App';
import Form from './Form';

const addTransactionButton = document.querySelector('.button.new');
const transactionForm = document.querySelector(
	'[data-form="submit-transaction"]'
);

window.onload = () => {
	addTransactionButton.addEventListener('click', Modal.open);
	transactionForm.addEventListener('submit', Form.submit);
	modalOverlay.addEventListener('click', Modal.close);
	App.init();
};
