import { Client, Intents } from "discord.js";
import { config } from "./config.js";

export const bot = new Client({
  presence: {
    status: "online",
    activity: {
      name: "$help <comando>",
      type: "LISTENING",
    },
  },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
