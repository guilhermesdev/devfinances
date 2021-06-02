const Utils = {
  formatAmount(value){
    return Math.round(+value * 100);
  },
  formatCurrency(value){
    return Number((value/100)).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  },
  formatDate(date){
    const [ year, month, day ] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}

export default Utils;