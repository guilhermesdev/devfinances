import '@/assets/css/style.scss';

import Modal, { modalOverlay } from '@/app/Modal';
import { App } from '@/app/App';
import Form from '@/app/Form';

const addTransactionButton = document.querySelector('.button.new')!;
const transactionForm = document.querySelector(
	'[data-form="submit-transaction"]'
)!;

window.onload = () => {
	addTransactionButton.addEventListener('click', Modal.open);
	transactionForm.addEventListener('submit', Form.submit);
	modalOverlay.addEventListener('click', () => Modal.close());
	App.init();
};
