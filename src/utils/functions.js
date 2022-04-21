export const formatDate = (dt) => {
    const date = new Date(dt);
  
    let year = date.getFullYear();
    // .getMonth is zero based so + 1 for short month
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
  
    return `${year}-${month}-${day}`;
  };