const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`🎉 ${client.user.tag} başarıyla giriş yaptı!`);
        console.log(`📊 ${client.guilds.cache.size} sunucuda aktif`);
        console.log(`👥 ${client.users.cache.size} kullanıcıya hizmet veriliyor`);
        
        // Bot durumunu ayarla
        client.user.setActivity('kod paylaşımı', { type: ActivityType.Watching });
        
        // Her 10 dakikada bir durumu güncelle
        setInterval(() => {
            const activities = [
                { name: 'kod paylaşımı', type: ActivityType.Watching },
                { name: `${client.guilds.cache.size} sunucu`, type: ActivityType.Watching },
                { name: `${client.users.cache.size} kullanıcı`, type: ActivityType.Watching },
                { name: '/kod', type: ActivityType.Playing }
            ];
            
            const activity = activities[Math.floor(Math.random() * activities.length)];
            client.user.setActivity(activity.name, { type: activity.type });
        }, 600000); // 10 dakika
    },
}; 