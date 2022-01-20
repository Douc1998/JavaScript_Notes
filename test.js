const hoursMark = (function(){
  let hours = [...Array(24)].map((item, index) => index + 1);
  return hours.map(item => {return `${ item }时`})
}())
console.log(hoursMark);