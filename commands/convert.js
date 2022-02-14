import { getBeloPrice } from "../requests/getBeloPrices.js";
import { getBeloCoins } from "../requests/getBeloCoins.js";

import { thousandSep } from "../utils/thousandSep.js";

// Conversor de ambos lados ej. btc/usd y usd/btc

// Estructura del comando: $c <cantidad> <moneda origen> <moneda destino>

/* Notas: 
  * Se usan lo mismos datos guardados de belo para $p
  * Todos las conversiones son en lo posible de belo ej btc/usd y ars/usd
  * Se sobre entiende que $c 100 usdt ars == vender 100usdt por pesos o $c 1000 ars usdt == 
  comprar 1000 pesos en usdt
*/
export const convert = async (args, message) => {
  let msg = await message.reply("Aguarde un momento...");
  // Verifica que esten los argumentos necesarios
  if (args[0] && args[1] && args[2]) {
    // Define los argumentos, para hacerlo mas legible
    let amount = args[0];
    amount = parseFloat(amount.replaceAll(",", "")); // Quita las comas ej. 1,000 -> 1000
    let pair = args[1].toUpperCase() + "/" + args[2].toUpperCase(); // Ej. BTC/ARS
    let coins = await getBeloCoins(); // Obtiene las monedas disponibles
    let modCoins = [...coins.fiat, ...coins.coins]; //Agrupa fiat y cripto
    let reply = ""; //Mensaje a enviar

    // Reemplaza sats por btc y lo divide por 1e8
    if (pair.indexOf("SATS") > -1) {
      pair = pair.replace("SATS", "BTC");
      amount = amount / 100000000;
    }

    // Verifica que la moneda origen y destino esten disponibles
    if (
      modCoins.includes(pair.split("/")[0]) &&
      modCoins.includes(pair.split("/")[1])
    ) {
      const inversePair = args[2].toUpperCase() + "/" + args[1].toUpperCase(); // Ej. $c x ars btc (ARS/BTC) -> (BTC/ARS)
      msg.edit("Obteniendo precios...");

      // Los pares disponibles son de venta, por ende si es al reves, el precio a usar es el de compra
      let price = await getBeloPrice(pair);
      let target;
      if (price.exists === false) {
        price = await getBeloPrice(inversePair);
        price.exists === false
          ? (reply =
              "No se encuentra ese par en belo o las monedas son iguales")
          : (target = { price: price.buy, type: "sell" });
      } else {
        target = { price: price.sell, type: "buy" };
      }
      // Si no hubo ningun error
      if (reply == "") {
        // Divide o multiplica dependiendo si es compra o venta
        let fPrice = target.price;
        let result = target.type == "sell" ? amount / fPrice : amount * fPrice;

        let isNotABigNumber = !result.toString().includes("e"); // Evita que se añadan comas en numeros muy grandes ej 2.00003e15

        if (result > 999 && isNotABigNumber) {
          // Añade comas y redondea para hacer mas legible
          result = Math.round(result * 1e3) / 1e3;
          result = thousandSep(result);
        } else {
          result = Math.round(result * 1e8) / 1e8;
        }
        // Muestra el resultado
        reply = `El resultado es: ${result}${args[2].toUpperCase()}`;
      }
      await msg.edit(reply);
    } else {
      await msg.edit("Alguna de las monedas no es válida");
    }
  } else {
    msg.edit(
      "Faltan argumentos, estructura del comando: $c <cantidad> <moneda origen> <moneda destino>, ej: $c 100 usdt ars (vender 100 usdt por pesos)"
    );
  }
};
