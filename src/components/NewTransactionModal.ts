const $modalOverlay = document.querySelector('.modal-overlay')!;
const $newTransactionModal = document.querySelector('.modal')!;
const $cancelButton = document.querySelector('.button.cancel')!;

type CloseModalParam = {
	target?: EventTarget | null;
	force?: boolean;
};

export const NewTransactionModal = {
	init() {
		$modalOverlay.addEventListener('click', ({ target }) => {
			this.close({ target });
		});
	},
	open(event: Event): void {
		event.preventDefault();

		$modalOverlay.classList.add('active');
		$newTransactionModal.classList.remove('hidden');
	},
	close({ target, force }: CloseModalParam = {}): void {
		if (target !== $modalOverlay && target !== $cancelButton && !force) return;

		$modalOverlay.classList.remove('active');
		$newTransactionModal.classList.add('hidden');
	}
};
