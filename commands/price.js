import { thousandSep } from "../utils/thousandSep.js";

import { getBeloCoins } from "../requests/getBeloCoins.js";
import { getBeloPrice } from "../requests/getBeloPrices.js";
import { getBinancePrice } from "../requests/getBinancePrice.js";
async function beloPrice(id) {
  // Trae precio de belo (par contra pesos)
  id = id + "/ARS";
  let res = await getBeloPrice(id);
  // Añade separador de miles, ej. 1000 -> 1,000
  res.buy = thousandSep(parseFloat(res.buy));
  res.sell = thousandSep(parseFloat(res.sell));
  if (res.error) console.log(res);
  return res;
}

async function binancePrice(id) {
  // Trae precio de binance (par contra tether)
  let res = await getBinancePrice(id);
  if (res > 999) {
    // Redondea a maximo 3 decimales y añade separador de miles, ej. 1000 -> 1, 000(para numeros grandes)
    res = Math.round(res * 1e3) / 1e3;
    res = thousandSep(res);
  }
  return res;
}

export const getPrice = async (args, message) => {
  let msg = await message.reply("Aguarde un momento...");
  if (args[0] != null && args[0] != undefined) {
    let id = args[0].toUpperCase();
    let coins = await getBeloCoins();
    coins = coins.coins;
    let reply = ""; //Mensaje a enviar
    let beloResponse = false;

    msg.edit("Obteniendo precios...");
    // Checkea si la moneda está en Belo y ademas es una moneda o token
    let price = false;
    if (coins.includes(id)) {
      //obtiene el precio de Belo
      price = await beloPrice(id);
      if (price.error) {
        reply = "Hubo un error al obtener el precio de Belo";
      } else {
        // Agrega a la respuesta todos los datos
        reply +=
          `**${price.name}**` +
          `\nPrecio de compra: $${price.buy}` +
          `\nPrecio de venta: $${price.sell}` +
          `\nSpread: ${price.spread}` +
          `\nRendimiento: ${price.apr}`;
        beloResponse = reply;
      }
      await msg.edit(reply);
    }

    // Ahora busca en binance
    await msg.edit(
      (beloResponse || "Belo: No disponible") + "\nBinance: buscando..."
    );
    let binance = await binancePrice(id);
    // Saca "Binance: buscando..."
    let finalReply = msg.content.replace("Binance: buscando...", "");
    let binancenum, belonums, dolar;
    if (typeof binance != "object") {
      binancenum = parseFloat(binance.replace(",", ""));
      // Replace all commas
      belonums = {
        sell: !price || parseFloat(price.sell.replaceAll(",", "")),
        buy: !price || parseFloat(price.buy.replaceAll(",", "")),
      };
      dolar = beloResponse
        ? `\nDolar: $${(belonums.buy / binancenum).toFixed(1)} / $${(
            belonums.sell / binancenum
          ).toFixed(1)}`
        : "";
    }
    finalReply +=
      typeof binance === "object"
        ? "\nBinance: no disponible"
        : `\nBinance: $${binance}${dolar}`;
    await msg.edit(finalReply);
  } else {
    await msg.edit("No se ingresó una moneda");
  }
};
