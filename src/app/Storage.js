const Storage = {
  get(){
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  },
  set(transactions){
    const transactionsJSON = JSON.stringify(transactions);
    localStorage.setItem('dev.finances:transactions', transactionsJSON);
  }
}

export default Storage;