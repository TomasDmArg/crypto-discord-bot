//Creado por Tomas Di Mauro

import { config } from "./config.js"; //Prefix ($) y token del bot
import { bot } from "./bot.js"; //Crea la instancia del bot

//Comandos
import { helpMsg } from "./help.js";
import { getPrice } from "./commands/price.js";
import { convert } from "./commands/convert.js";
import { brief } from "./commands/generalInfo.js";

// Configuracion de express
import express from "express";
const app = express();
const port = 80; //Cambiar a otro puerto si el 80 está ocupado, por ej. 3001

bot.login(config.token); //Se loguea

// No necesario pero solo para verificar a la hora de la ejecución
bot.on("ready", () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on("message", async (message) => {
  // Checkea si hay algun comando
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(" ");
    let command = args.shift().toLowerCase();
    // Args: ej. "$p btc" (btc = args[0])
    // Command: "$p" (p = command)

    switch (command) {
      // Checkea si el bot está funcionando
      case "ping":
        let msg = await message.reply("Pinging...");
        await msg.edit("PONG!");
        break;
      // Obtiene los precios de una moneda
      case "precios":
      case "prices":
      case "p":
        getPrice(args, message);
        break;
      // Convierte una moneda a otra
      case "convertir":
      case "convert":
      case "c":
        convert(args, message);
        break;
      // Muestra un resumen de las principales 10 monedas
      case "i":
      case "info":
      case "resumen":
      case "summary":
        brief(args, message);
        break;
      // Muestra el menú de ayuda
      case "help":
      case "ayuda":
        helpMsg(message, bot, args);
        break;
    }
  }
});

// Inicia el servidor de express accesible desde ip:port/ (localhost:port)
app.get("/", (req, res) => res.send("Server funcionando!"));
app.listen(port, () => console.log("Server funcionando"));
