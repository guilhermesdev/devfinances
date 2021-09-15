import Utils from './Utils.js';
import Transaction from './Transaction.js';
import Modal from './Modal.js';

const Form = {
  clearFields(){
    description.value = '';
    amount.value = '';
    date.value = '';
  },
  getTransactionObject(){
    return {
      description: description.value,
      amount: amount.value,
      date: date.value
    }
  },
  formatData(){
    let { description, amount, date } = this.getTransactionObject();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    
    return {
      description,
      amount,
      date
    }
  },
  validateFields(){
    if(
      !description.value.trim() ||
      !amount.value.trim() ||
      !date.value.trim()
    ){
      throw new Error('Por favor, preencha todos os campos'); 
    }
  },
  submit(event){
    event.preventDefault();
    
    Form.validateFields();
    const transaction = Form.formatData();
    Transaction.add(transaction);
    Form.clearFields();
    Modal.close({ enforce: true });
  }
}

export default Form;