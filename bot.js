const { Client } = require('discord.js');
const { botIntents } = require('./config/config');
const config = require('./config/default');
const parsingChannelId = '966525512505761872'; // Replace with the ID of the channel for parsing commands 
const postingChannelId = '937287073344389211'; // Replace with the ID of the channel for posting messages

const messageTextAB = 
      "<:Alliance:1152183037468102686><@&1111988482244624385><:Alliance:1152183037468102686>**ARATHI BASIN BEGINS IN ONE MINUTE!!!**<:Horde:1152182988470243358><@&1111988305505026171><:Horde:1152182988470243358>";
	  
const messageTextAC =
	  "<:Alliance:1152183037468102686><@&1111988482244624385><:Alliance:1152183037468102686>**AZSHARA CRATER BEGINS IN ONE MINUTE!!!**<:Horde:1152182988470243358><@&1111988305505026171><:Horde:1152182988470243358>"; +
	  "Rally your forces and prepare for battle in the heart of Azshara Crater, where you may experience incredible and frightening powers!\n" +
	  "**Murloc_gurgle.wmv**\n" +
	  `<:monkaW:947443287365668894>\n`;

const messageTextWSG = 
      "<:Alliance:1152183037468102686><@&1111988482244624385><:Alliance:1152183037468102686>**WARSONG GULCH BEGINS IN ONE MINUTE!!!**<:Horde:1152182988470243358><@&1111988305505026171><:Horde:1152182988470243358>";
	  
const messageTextBRBrawlersArena = 
      "<:Alliance:1152183037468102686><@&1254840980348076224><:Alliance:1152183037468102686>**BRAWLERS! THE GAMES ARE AFOOT!! SHIELDS AND SANDALS READY!!**<:Horde:1152182988470243358><@&1254840980348076224><:Horde:1152182988470243358>";	  

const messageTextBRChampArena = 
      "<:Alliance:1152183037468102686><@&1254840980348076224><:Alliance:1152183037468102686>**HONORED GLADIATORS!!! WHICH AMONG YOU ARE CHAMPIONS?!? PROVE YOURSELVES!!!**<:Horde:1152182988470243358><@&1254840980348076224><:Horde:1152182988470243358>";	  

const messageTextBREliteArena = 
      "<:Alliance:1152183037468102686><@&1254840980348076224><:Alliance:1152183037468102686>**THE REVERED ELITE OF THE CRIMSON RING ENTER THE ARENA!**<:Horde:1152182988470243358><@&1254840980348076224><:Horde:1152182988470243358>";	  
	  
const client = new Client({
  intents: botIntents,
  partials: ['CHANNEL', 'MESSAGE'],
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag} and ready to go!`);

  // Clear the member cache for all guilds
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.clear();
  });

  // Log guild information
  client.guilds.cache.forEach((guild) => {
    console.log(`Connected to guild: ${guild.name} (ID: ${guild.id})`);
    const me = guild.me;
    if (!me) {
      console.error(`Bot's member object not available in guild: ${guild.name} (ID: ${guild.id}). Check bot's permissions in this guild.`);
    } else {
      console.log(`Bot is a member of guild: ${guild.name} (ID: ${guild.id})`);
    }
  });

  console.log('Bot is ready, member cache cleared, and guild information logged.');
});

client.on('messageCreate', async message => {
  // Display messages in parse channel to console for monitoring
  console.log(`Received message: ${message.content}`);
  // Only parse messages from designated channel in constants reference
  if (message.channel.id === parsingChannelId) {
  // Check for '[World]' trigger - if present, do nothing due to player message
  if (message.content.includes('[World]')) return;
    // Define the posting channel
    const postingChannel = await client.channels.fetch(postingChannelId);
    // Respond to specific triggers and post in the designated posting channel
    if (message.content.includes(']: Arathi Basin [60-60] starting!')) {
      await postingChannel.send(messageTextAB);
    }
    if (message.content.includes(']: Azshara Crater [55-60] starting!')) {
      await postingChannel.send(messageTextAC);
    }
    if (message.content.includes(']: Warsong Gulch [60-60] starting!')) {
      await postingChannel.send(messageTextWSG);
    }
    if (message.content.includes('Brawlers\' League Arena fight is starting!')) {
      await postingChannel.send(messageTextBRBrawlersArena);
    }
	if (message.content.includes(' Championship Arena fight is starting!')) {
      await postingChannel.send(messageTextBRChampArena);
    }
	if (message.content.includes(' Elite League Arena fight is starting!')) {
      await postingChannel.send(messageTextBREliteArena);
    }
  }
});

async function postMessage(channelId, messageText) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (channel.isTextBased()) {
      await channel.send(messageText);
      console.log(`Message sent to channel ${channelId}: ${messageText}`);
    } else {
      console.error(`Channel with ID ${channelId} is not a text-based channel.`);
    }
  } catch (error) {
    console.error(`Error sending message to channel ${channelId}:`, error);
  }
};

client.login(config.DISCORD_TOKEN);
