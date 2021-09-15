const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const cancelButton = document.querySelector('.button.cancel');
const formSubmit = document.querySelector('[data-form="submit-transaction"]');

const Modal = {
  open(event){
    event.preventDefault();
    modalOverlay.classList.add('active');
    modal.classList.remove('hidden');
  },
  close({ target, enforce }){
    if (target !== modalOverlay &&
        target !== cancelButton &&
        !enforce ) return;

    modalOverlay.classList.remove('active');
    modal.classList.add('hidden');   
  }
}

export default Modal;
export { modalOverlay };