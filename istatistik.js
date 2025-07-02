const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('istatistik')
        .setDescription('Kod paylaşım istatistiklerini gösterir'),

    async execute(interaction) {
        await interaction.deferReply();

        const kodlarPath = path.join(__dirname, '..', 'data', 'kodlar.json');
        
        if (!fs.existsSync(kodlarPath)) {
            const embed = new EmbedBuilder()
                .setColor('#ff6b6b')
                .setTitle('📊 Kod Paylaşım İstatistikleri')
                .setDescription('Henüz hiç kod paylaşılmamış!')
                .addFields(
                    { name: '💡 İlk Kod', value: 'İlk kodunuzu `/kod` komutu ile paylaşabilirsiniz!' }
                )
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        }

        const kodlar = JSON.parse(fs.readFileSync(kodlarPath, 'utf8'));
        
        // Sadece bu sunucudaki kodları filtrele
        const sunucuKodlari = kodlar.filter(kod => kod.guildId === interaction.guild.id);

        if (sunucuKodlari.length === 0) {
            const embed = new EmbedBuilder()
                .setColor('#ff6b6b')
                .setTitle('📊 Kod Paylaşım İstatistikleri')
                .setDescription('Bu sunucuda henüz kod paylaşılmamış!')
                .addFields(
                    { name: '💡 İlk Kod', value: 'İlk kodunuzu `/kod` komutu ile paylaşabilirsiniz!' }
                )
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        }

        // Dil istatistikleri
        const dilIstatistikleri = {};
        const kullaniciIstatistikleri = {};
        const gunlukIstatistikler = {};

        sunucuKodlari.forEach(kod => {
            // Dil istatistikleri
            dilIstatistikleri[kod.dil] = (dilIstatistikleri[kod.dil] || 0) + 1;
            
            // Kullanıcı istatistikleri
            kullaniciIstatistikleri[kod.paylasan] = (kullaniciIstatistikleri[kod.paylasan] || 0) + 1;
            
            // Günlük istatistikler
            const tarih = new Date(kod.tarih).toLocaleDateString('tr-TR');
            gunlukIstatistikler[tarih] = (gunlukIstatistikler[tarih] || 0) + 1;
        });

        // En popüler diller
        const enPopulerDiller = Object.entries(dilIstatistikleri)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        // En aktif kullanıcılar
        const enAktifKullanicilar = Object.entries(kullaniciIstatistikleri)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        // Son 7 günün istatistikleri
        const son7Gun = [];
        for (let i = 6; i >= 0; i--) {
            const tarih = new Date();
            tarih.setDate(tarih.getDate() - i);
            const tarihStr = tarih.toLocaleDateString('tr-TR');
            son7Gun.push({
                tarih: tarihStr,
                sayi: gunlukIstatistikler[tarihStr] || 0
            });
        }

        const dilIsimleri = {
            javascript: 'JavaScript',
            python: 'Python',
            java: 'Java',
            cpp: 'C++',
            csharp: 'C#',
            php: 'PHP',
            html: 'HTML',
            css: 'CSS',
            sql: 'SQL',
            typescript: 'TypeScript',
            go: 'Go',
            rust: 'Rust',
            kotlin: 'Kotlin',
            swift: 'Swift',
            ruby: 'Ruby',
            dart: 'Dart',
            r: 'R',
            matlab: 'MATLAB',
            bash: 'Bash',
            powershell: 'PowerShell',
            json: 'JSON',
            xml: 'XML',
            yaml: 'YAML',
            markdown: 'Markdown',
            text: 'Metin'
        };

        const embed = new EmbedBuilder()
            .setColor('#4ecdc4')
            .setTitle('📊 Kod Paylaşım İstatistikleri')
            .setDescription(`${interaction.guild.name} sunucusundaki kod paylaşım istatistikleri`)
            .addFields(
                { 
                    name: '📈 Genel İstatistikler', 
                    value: `**Toplam Kod:** ${sunucuKodlari.length}\n**Farklı Dil:** ${Object.keys(dilIstatistikleri).length}\n**Aktif Kullanıcı:** ${Object.keys(kullaniciIstatistikleri).length}`, 
                    inline: true 
                },
                { 
                    name: '🏆 En Popüler Diller', 
                    value: enPopulerDiller.map(([dil, sayi], index) => 
                        `${index + 1}. ${dilIsimleri[dil] || dil}: **${sayi}**`
                    ).join('\n') || 'Veri yok',
                    inline: true 
                },
                { 
                    name: '👑 En Aktif Kullanıcılar', 
                    value: enAktifKullanicilar.map(([userId, sayi], index) => 
                        `${index + 1}. <@${userId}>: **${sayi}** kod`
                    ).join('\n') || 'Veri yok',
                    inline: true 
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `${interaction.guild.name} • Kod Paylaşım Botu`, 
                iconURL: interaction.guild.iconURL() 
            });

        // Son 7 günün grafiği
        const gunlukGrafik = son7Gun.map(gun => {
            const bar = '█'.repeat(Math.min(gun.sayi, 10));
            return `${gun.tarih}: ${bar} ${gun.sayi}`;
        }).join('\n');

        if (gunlukGrafik) {
            embed.addFields({
                name: '📅 Son 7 Gün',
                value: gunlukGrafik,
                inline: false
            });
        }

        // Ortalama istatistikler
        const ortalamaGunluk = (sunucuKodlari.length / 7).toFixed(1);
        const enYuksekGun = Math.max(...son7Gun.map(g => g.sayi));
        const enDusukGun = Math.min(...son7Gun.map(g => g.sayi));

        embed.addFields({
            name: '📊 Haftalık Ortalamalar',
            value: `**Günlük Ortalama:** ${ortalamaGunluk} kod\n**En Yüksek Gün:** ${enYuksekGun} kod\n**En Düşük Gün:** ${enDusukGun} kod`,
            inline: false
        });

        await interaction.editReply({ embeds: [embed] });
    },
}; 