/* 
Las llamadas a los distintos endpoints son cacheadas para hacer mas rápida la respuesta
ademas de prevenir pasarse de un posible limite de llamadas por seg/min.

La estructura es:
obj = {
  date: (en milisegundos, se añade x cantidad de ms a la fecha actual)(int)
  req: (la respuesta registrada)(obj)
} (obj -> stringify)

*/

import { LocalStorage } from "node-localstorage";
let localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage("./scratch");
}

// Funcion para guardar las request
export const storeRequest = (req, name, time) => {
  let date = new Date();
  date = date.getTime() + time * 60000;
  localStorage.setItem(
    name,
    JSON.stringify({
      date: date,
      req: req,
    })
  );
};
// Funcion para checkear si existe una request y si existe, si ademas su tiempo es valido
export const exists = (name) => {
  let res;
  // Checkear si existe
  if (localStorage.getItem(name) !== null) {
    let val = localStorage.getItem(name);
    val = JSON.parse(val);
    // Checkear tiempo
    val.date < new Date().getTime() || val.date == null
      ? (res = false)
      : (res = true);
  } else {
    res = false;
  }
  return res;
};
// Funcion para obtener una request obtiene -> convierte sting a obj -> retorna solo la req guardada
export const getReq = (name) => JSON.parse(localStorage.getItem(name)).req;
