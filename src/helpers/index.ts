export function generateRandomId(): string {
	return Math.random().toString(36).slice(2);
}

export function formatDate(date: string): string {
	const [year, month, day] = date.split('-');
	return `${day}/${month}/${year}`;
}

export function formatAmount(value: number): number {
	return Math.round(value * 100);
}

export function formatCurrency(valueInCents: number): string {
	const value = valueInCents / 100;

	return value.toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL'
	});
}
