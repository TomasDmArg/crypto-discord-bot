// Funcion que añade comas cada 3 digitos, a modo de separador de miles
// Ej 1000000.00 -> 1,000,000.00

export const thousandSep = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
