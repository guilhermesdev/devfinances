const modalOverlay = document.querySelector('.modal-overlay')!;
const modal = document.querySelector('.modal')!;
const cancelButton = document.querySelector('.button.cancel')!;

type CloseModalParam = {
	target?: HTMLElement;
	enforce?: boolean;
};

const Modal = {
	open(event: Event): void {
		event.preventDefault();
		modalOverlay.classList.add('active');
		modal.classList.remove('hidden');
	},
	close({ target, enforce }: CloseModalParam = {}): void {
		if (target !== modalOverlay && target !== cancelButton && !enforce) return;

		modalOverlay.classList.remove('active');
		modal.classList.add('hidden');
	}
};

export default Modal;
export { modalOverlay };
