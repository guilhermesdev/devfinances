import type { Transaction } from '@/core/entities/transation';
import { TransactionsStore } from '@/stores/transactions';
import { formatAmountAsCents, formatDate, generateRandomId } from '@/helpers';
import { NewTransactionModal } from '@/components/NewTransactionModal';

const $description = document.querySelector('#description') as HTMLInputElement;
const $amount = document.querySelector('#amount') as HTMLInputElement;
const $date = document.querySelector('#date') as HTMLInputElement;

export const CreateNewTransactionForm = {
	clearFields() {
		$description.value = '';
		$amount.value = '';
		$date.value = '';
	},
	getTransactionObject() {
		return {
			description: $description.value,
			amount: $amount.value,
			date: $date.value
		};
	},
	formatData(): Omit<Transaction, 'id'> {
		const transactionValue = this.getTransactionObject();

		const amountInCents = formatAmountAsCents(+transactionValue.amount);

		const date = formatDate(transactionValue.date);

		return {
			description: transactionValue.description,
			amountInCents,
			date
		};
	},
	validateFields() {
		return (
			$description.value.trim() && $amount.value.trim() && $date.value.trim()
		);
	},
	submit(event: Event) {
		event.preventDefault();

		const allFieldsAreValid = CreateNewTransactionForm.validateFields();

		if (!allFieldsAreValid) {
			return alert('Por favor, preencha todos os campos');
		}

		const transaction = CreateNewTransactionForm.formatData();

		TransactionsStore.addTransaction({
			...transaction,
			id: generateRandomId()
		});

		CreateNewTransactionForm.clearFields();
		NewTransactionModal.close({ force: true });
	}
};
