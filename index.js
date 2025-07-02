const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Bot istemcisini oluştur
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Komutları ve eventleri saklamak için collection'lar
client.commands = new Collection();
client.cooldowns = new Collection();

// Komutları yükle
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Komut yüklendi: ${command.data.name}`);
    } else {
        console.log(`⚠️ Komut dosyasında gerekli özellikler eksik: ${filePath}`);
    }
}

// Event handler'ları yükle
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`✅ Event yüklendi: ${event.name}`);
}

// Hata yakalama
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});

// Bot hazır olduğunda
client.once('ready', () => {
    console.log(`🚀 ${client.user.tag} olarak giriş yapıldı!`);
    console.log(`📊 ${client.guilds.cache.size} sunucuda aktif`);
    console.log(`👥 ${client.users.cache.size} kullanıcıya hizmet veriliyor`);
    
    // Bot durumunu ayarla
    client.user.setActivity('kod paylaşımı', { type: ActivityType.Watching });
    
    // Slash komutları kaydet
    const { deployCommands } = require('./deploy-commands.js');
    deployCommands();
});

// Bot'u başlat
client.login(process.env.DISCORD_TOKEN); 