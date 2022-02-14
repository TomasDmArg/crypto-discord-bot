import axios from "axios";
import { storeRequest, getReq, exists } from "../utils/storeRequests.js";

// Obtiene de coingecko las 10 principales monedas, y muestra nombre, precio y cambio diario
const getCoingeckoTop10 = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  // Trae los datos o devuelve un error
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (error) {
    return {
      error: true,
    };
  }
};
export async function getCryptos() {
  const NAME = "coingeckotop10"; // Nombre de la cache
  let response;
  // Busca respuestas guardadas
  if (exists(NAME)) {
    response = getReq(NAME);
  } else {
    // Si no hay respuestas guardadas, las trae de coingecko y las guarda
    response = await getCoingeckoTop10();
    storeRequest(response, NAME, 30);
  }
  // Si no hay errores
  if (!response.error) {
    return response;
  } else {
    return {
      error: true,
    };
  }
}
