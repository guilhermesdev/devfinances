import type { Transaction } from '@/core/entities/transation';
import { TransactionsStore } from '@/stores/transactions';
import { formatAmount, formatDate, generateRandomId } from '@/helpers';
import { NewTransactionModal } from '@/components/NewTransactionModal';

const description = document.querySelector('#description') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;
const date = document.querySelector('#date') as HTMLInputElement;

const Form = {
	clearFields() {
		description.value = '';
		amount.value = '';
		date.value = '';
	},
	getTransactionObject() {
		return {
			description: description.value,
			amount: amount.value,
			date: date.value
		};
	},
	formatData() {
		const transactionValue = this.getTransactionObject();

		const amount = formatAmount(+transactionValue.amount);

		const date = formatDate(transactionValue.date);

		return {
			description: transactionValue.description,
			amount,
			date
		};
	},
	validateFields() {
		return description.value.trim() && amount.value.trim() && date.value.trim();
	},
	submit(event: Event) {
		event.preventDefault();

		const allFieldsAreValid = Form.validateFields();

		if (!allFieldsAreValid) {
			return alert('Por favor, preencha todos os campos');
		}

		const transaction = Form.formatData() as Omit<Transaction, 'id'>;

		TransactionsStore.addTransaction({
			...transaction,
			id: generateRandomId()
		});

		Form.clearFields();
		NewTransactionModal.close({ force: true });
	}
};

export default Form;