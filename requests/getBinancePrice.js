import Binance from "node-binance-api";
// Funcion que obtiene precios de binance (USD) (par contra tether)
export async function getBinancePrice(id) {
  id = id.toUpperCase();
  let pair = id + "USDT";

  //Crea la instancia de la clase y hace la llamada necesaria
  let binance = new Binance();
  let res = await binance
    .prices(pair)
    .then((data) => {
      return data[pair]; //Devuelve solo el precio
    })
    .catch((err) => {
      err = err.body;
      err = JSON.parse(err);
      return {
        "Codigo de error": err.code,
        Mensaje: err.msg,
      };
    });
  return res;
}
