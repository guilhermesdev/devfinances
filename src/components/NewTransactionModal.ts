const $modalOverlay = document.querySelector('.modal-overlay')!;
const modal = document.querySelector('.modal')!;
const cancelButton = document.querySelector('.button.cancel')!;

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
		modal.classList.remove('hidden');
	},
	close({ target, force }: CloseModalParam = {}): void {
		if (target !== $modalOverlay && target !== cancelButton && !force) return;

		$modalOverlay.classList.remove('active');
		modal.classList.add('hidden');
	}
};
