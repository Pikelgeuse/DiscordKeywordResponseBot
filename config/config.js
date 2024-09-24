const { GatewayIntentBits } = require('discord.js');

const botIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.MessageContent,  
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildPresences,
];

module.exports = { botIntents };

// Should clean this up, bit silly to have split files?
