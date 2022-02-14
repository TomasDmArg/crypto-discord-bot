import { MessageEmbed } from "discord.js";
import { config } from "./config.js";

export const commands = {
  help: {
    aliases: ["help", "ayuda"],
    description: "Muestra el menú de comandos.",
    format: "help o $ayuda",
  },
  precios: {
    aliases: ["p", "prices", "precios"],
    description:
      "Muestra el precio de una moneda, en pesos (Belo) y dólares (Binance)",
    format: "p <moneda> o $precios <moneda>",
  },
  convertir: {
    aliases: ["c", "convertir", "convert"],
    description: "Convierte una moneda a otra, ",
    format:
      "c <monto> <moneda> <moneda destino>, ej: $c 10 usdt ars (venta de 10 usdt a pesos)",
  },
  resumen: {
    aliases: ["i", "info", "r", "resumen", "summary"],
    description: "Muestra un resumen de las principales 10 monedas.",
    format: "r o $resumen o $summary",
  },
  info: {
    aliases: ["i", "info", "r", "resumen", "summary"],
    description:
      "(Igual que resumen) Muestra un resumen de las principales 10 monedas.",
    format: "r o $resumen o $summary o $info o $i",
  },
};
export const helpMsg = (message, bot, args) => {
  let embed = new MessageEmbed()
    .setTitle("Menú de ayuda")
    .setColor("#06D6A0")
    .setFooter(
      `Requested by: ${
        message.member ? message.member.displayName : message.author.username
      }`,
      message.author.displayAvatarURL()
    )
    .setThumbnail(bot.user.displayAvatarURL());
  if (!args[0])
    embed.setDescription(
      Object.keys(commands)
        .map(
          (command) =>
            `\`${command.padEnd(
              Object.keys(commands).reduce(
                (a, b) => (b.length > a.length ? b : a),
                ""
              ).length
            )}\` :: ${commands[command].description}`
        )
        .join("\n")
    );
  else {
    if (
      Object.keys(commands).includes(args[0].toLowerCase()) ||
      Object.keys(commands)
        .map((c) => commands[c].aliases || [])
        .flat()
        .includes(args[0].toLowerCase())
    ) {
      let command = Object.keys(commands).includes(args[0].toLowerCase())
        ? args[0].toLowerCase()
        : Object.keys(commands).find(
            (c) =>
              commands[c].aliases &&
              commands[c].aliases.includes(args[0].toLowerCase())
          );
      embed.setTitle(`Comando - ${command}`);

      if (commands[command].aliases)
        embed.addField(
          "Alias o comandos",
          `\`${commands[command].aliases.join("`, `")}\``
        );
      embed
        .addField("DESCRIPTION", commands[command].description)
        .addField(
          "Formato",
          `\`\`\`${config.prefix}${commands[command].format}\`\`\``
        );
    } else {
      embed
        .setColor("RED")
        .setDescription(
          "Este comando no existe, puedes ver los comandos en $help o $ayuda y volverlo a intentar"
        );
    }
  }
  message.channel.send({ embeds: [embed] });
};
