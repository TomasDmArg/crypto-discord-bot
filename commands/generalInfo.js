import { getCryptos } from "../requests/top10Cryptos.js";
// Funcion que obtiene datos de coingecko y muestra las principales 10 criptomedas
// Nombre precio y cambio diario

export const brief = async (args, message) => {
  let msg = await message.reply("Aguarde un momento...");
  let cryptos = await getCryptos();
  let reply = "";
  let i = 0;
  await msg.edit("Datos obtenidos, procesando...");
  cryptos.forEach((item) => {
    if (i < 10) {
      let change =
        Math.round(item.market_cap_change_percentage_24h * 1e2) / 1e2;
      let emoji;
      change > 0 ? (emoji = "📈") : (emoji = "📉");
      if (change > 5) emoji = "🚀";
      if (change < -5) emoji = "💩";

      if (item.market_cap_change_percentage_24h > 0) change = `+${change}%`;

      reply += `**${item.name}: $${item.current_price}** (${change})  ${emoji}\n\n`;
    }
    i++;
  });
  await msg.edit(reply);
};
