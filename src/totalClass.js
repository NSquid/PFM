function getTotalClass(total, borderAmount) {
    if (total < 0) {
      return 'total-red';
    } else if (total === 0) { 
      return 'numDisplay';
    } else if (total < borderAmount) {
      return 'total-yellow';
    } else {
      return 'total-green';
    }
  }
  
  export default getTotalClass;