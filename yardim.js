const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardim')
        .setDescription('Bot komutları hakkında yardım gösterir'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#4ecdc4')
            .setTitle('🤖 Kod Paylaşım Botu - Yardım')
            .setDescription('Discord sunucunuz için efsane kod paylaşım botu!')
            .addFields(
                {
                    name: '📝 Temel Komutlar',
                    value: '```\n/kod - Kod paylaşımı yapar\n/ara - Paylaşılan kodları arar\n/istatistik - Kod paylaşım istatistiklerini gösterir\n/yardim - Bu yardım mesajını gösterir\n```',
                    inline: false
                },
                {
                    name: '💻 Desteklenen Diller',
                    value: 'JavaScript, Python, Java, C++, C#, PHP, HTML, CSS, SQL, TypeScript, Go, Rust, Kotlin, Swift, Ruby, Dart, R, MATLAB, Bash, PowerShell, JSON, XML, YAML, Markdown ve daha fazlası!',
                    inline: false
                },
                {
                    name: '🔍 Arama Özellikleri',
                    value: '• Kod içeriğinde arama\n• Açıklama metinlerinde arama\n• Belirli dilde filtreleme\n• Sonuçları tarihe göre sıralama',
                    inline: false
                },
                {
                    name: '📊 İstatistik Özellikleri',
                    value: '• Toplam kod sayısı\n• En popüler diller\n• En aktif kullanıcılar\n• Günlük paylaşım grafikleri\n• Haftalık ortalamalar',
                    inline: false
                },
                {
                    name: '🎨 Özellikler',
                    value: '• Syntax highlighting\n• Otomatik dil algılama\n• Kod kopyalama butonları\n• Dosya indirme desteği\n• Modern embed tasarımı\n• Slash komut desteği',
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `${interaction.guild.name} • Kod Paylaşım Botu`, 
                iconURL: interaction.guild.iconURL() 
            });

        // Örnek kullanım
        const ornekEmbed = new EmbedBuilder()
            .setColor('#f7df1e')
            .setTitle('💡 Örnek Kullanım')
            .setDescription('Kod paylaşımı nasıl yapılır?')
            .addFields(
                {
                    name: '📝 Basit Kod Paylaşımı',
                    value: '```\n/kod kod:console.log("Merhaba Dünya!"); dil:javascript açıklama:Basit bir JavaScript örneği\n```',
                    inline: false
                },
                {
                    name: '🔍 Kod Arama',
                    value: '```\n/ara kelime:function dil:javascript\n```',
                    inline: false
                },
                {
                    name: '📊 İstatistik Görüntüleme',
                    value: '```\n/istatistik\n```',
                    inline: false
                }
            )
            .setTimestamp();

        // Butonlar oluştur
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('yardim_ornekler')
                    .setLabel('💡 Daha Fazla Örnek')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('yardim_destek')
                    .setLabel('🆘 Destek')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setURL('https://discord.com/developers/applications')
                    .setLabel('🔗 Discord Developer Portal')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed, ornekEmbed],
            components: [row]
        });
    },
}; 