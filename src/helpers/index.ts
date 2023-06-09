export function generateRandomId(): string {
	return Math.random().toString(36).slice(2);
}

export function formatDate(date: string): string {
	const [year, month, day] = date.split('-');
	return `${day}/${month}/${year}`;
}

export function formatAmountAsCents(value: number): number {
	return Math.round(value * 100);
}

export function formatCurrency(value: number): string {
	console.log(value);
	return value.toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL'
	});
}

export function sum(numbers: number[]): number {
	return numbers.reduce((sum, number) => sum + number, 0);
}
