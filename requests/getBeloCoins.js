import axios from "axios";
import { FIAT_LIST } from "../utils/fiatList.js";
import { getRates } from "./getBeloPrices.js";
// Funcion que obtiene las monedas disponibles en Belo y las separa entre fiat y crypto

export async function getBeloCoins() {
  // Obtener las monedas disponibles
  const data = await getRates();
  let res = {
    fiat: [],
    coins: [],
  };
  // Separar las monedas disponibles en fiat y crypto
  data.forEach((item) => {
    //Busca en un array de monedas fiat *1 *2
    if (FIAT_LIST.includes(item.currency)) {
      res.fiat.push(item.currency);
    } else {
      res.coins.push(item.currency);
    }
  });
  return res;
}

// *1 Generado en: https://www.html-code-generator.com/javascript/json/currency-name
// *2 Esto se añade para que si en un futuro añaden mas monedas fiat ademas de ARS no se rompa todo
