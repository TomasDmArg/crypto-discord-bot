import axios from "axios";

import { storeRequest, getReq, exists } from "../utils/storeRequests.js";

// Funciones para traer precios y tasas de interes
async function getPrices() {
  const url = "https://beta.belo.app/public/price";
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (error) {
    return {
      error: true,
    };
  }
}

export async function getRates() {
  const url = "https://beta.belo.app/public/rate";
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (error) {
    return {
      error: true,
    };
  }
}

// Funcion que obtiene el precio de una moneda en específico

export async function getBeloPrice(id) {
  let pair = id.toUpperCase();
  id = id.split("/")[0].toUpperCase();
  let response, rate;
  // Busca respuestas guardadas
  if (exists("quotes")) {
    response = getReq("quotes");
  } else {
    response = await getPrices();
    storeRequest(response, "quotes", 1);
  }
  if (exists("rates")) {
    rate = getReq("rates");
  } else {
    rate = await getRates();
    storeRequest(rate, "rates", 30);
  }
  // Si no hay errores
  if (!response.error && !rate.error) {
    // Obtiene solo las monedas solicitadas
    let nData = response.filter((item) => item.pairCode === pair);
    let nRateData = rate.filter((item) => item.currency === id);
    // Si no existe la moneda retorna { exists: false, }
    if (nData.length === 0 || nRateData.length === 0) {
      return {
        exists: false,
      };
      // Caso de que exista, retorna el objeto con el precio, spread y rendimiento (APR)
      // Redondea a maximo 3 decimales, solo si estos existen
    } else {
      // Devuelve los datos con algunas modificaciones y todo junto
      return {
        name: "Belo: " + id,
        buy: Math.round(nData[0].ask * 1e3) / 1e3,
        sell: Math.round(nData[0].bid * 1e3) / 1e3,
        spread: Math.round(nData[0].spread * 1e3) / 1e3 + "%",
        apr: Math.round(nRateData[0].rate * 100 * 1e3) / 1e3 + "%",
      };
    }
  } else {
    return {
      error: true,
    };
  }
}
