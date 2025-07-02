const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Slash komut etkileşimleri
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`${interaction.commandName} komutu bulunamadı.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                
                const errorMessage = {
                    content: '❌ Bu komutu çalıştırırken bir hata oluştu!',
                    ephemeral: true
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }

        // Buton etkileşimleri
        if (interaction.isButton()) {
            const { customId } = interaction;

            try {
                switch (customId) {
                    case 'kod_kopyala':
                        await interaction.reply({
                            content: '📋 Kod panoya kopyalandı! (Discord\'un kopyalama özelliğini kullanın)',
                            ephemeral: true
                        });
                        break;

                    case 'kod_beğen':
                        await interaction.reply({
                            content: '👍 Kodu beğendiniz!',
                            ephemeral: true
                        });
                        break;

                    case 'kod_indir':
                        await interaction.reply({
                            content: '⬇️ Dosya zaten mesajda mevcut. Sağ tıklayıp "Farklı Kaydet" seçeneğini kullanın.',
                            ephemeral: true
                        });
                        break;

                    case 'ara_daha_fazla':
                        await interaction.reply({
                            content: '📄 Daha fazla sonuç için yeni bir arama yapın.',
                            ephemeral: true
                        });
                        break;

                    case 'ara_yeni_arama':
                        await interaction.reply({
                            content: '🔄 `/ara` komutunu kullanarak yeni bir arama yapabilirsiniz.',
                            ephemeral: true
                        });
                        break;

                    case 'yardim_ornekler':
                        const ornekEmbed = {
                            color: 0xf7df1e,
                            title: '💡 Daha Fazla Örnek',
                            description: 'İşte kod paylaşımı için daha fazla örnek:',
                            fields: [
                                {
                                    name: '🐍 Python Örneği',
                                    value: '```\n/kod kod:print("Merhaba Dünya!")\ndil:python\naçıklama:Basit bir Python örneği\n```',
                                    inline: false
                                },
                                {
                                    name: '☕ Java Örneği',
                                    value: '```\n/kod kod:public class Main {\n  public static void main(String[] args) {\n    System.out.println("Merhaba Dünya!");\n  }\n}\ndil:java\naçıklama:Java sınıf örneği\n```',
                                    inline: false
                                },
                                {
                                    name: '🌐 HTML Örneği',
                                    value: '```\n/kod kod:<html>\n<head>\n  <title>Merhaba</title>\n</head>\n<body>\n  <h1>Merhaba Dünya!</h1>\n</body>\n</html>\ndil:html\naçıklama:Basit HTML sayfası\n```',
                                    inline: false
                                }
                            ],
                            timestamp: new Date().toISOString()
                        };
                        
                        await interaction.reply({
                            embeds: [ornekEmbed],
                            ephemeral: true
                        });
                        break;

                    case 'yardim_destek':
                        await interaction.reply({
                            content: '🆘 Destek için:\n• Bot sahibi ile iletişime geçin\n• Discord Developer Portal\'ı ziyaret edin\n• GitHub repository\'sini kontrol edin',
                            ephemeral: true
                        });
                        break;

                    default:
                        await interaction.reply({
                            content: '❌ Bilinmeyen buton etkileşimi!',
                            ephemeral: true
                        });
                        break;
                }
            } catch (error) {
                console.error('Buton etkileşimi hatası:', error);
                await interaction.reply({
                    content: '❌ Buton işlenirken bir hata oluştu!',
                    ephemeral: true
                });
            }
        }
    },
}; 