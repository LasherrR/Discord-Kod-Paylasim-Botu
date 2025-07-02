const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ara')
        .setDescription('Paylaşılan kodları arar')
        .addStringOption(option =>
            option.setName('kelime')
                .setDescription('Aranacak kelime veya kod parçası')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('dil')
                .setDescription('Belirli bir dilde ara (isteğe bağlı)')
                .setRequired(false)
                .addChoices(
                    { name: 'JavaScript', value: 'javascript' },
                    { name: 'Python', value: 'python' },
                    { name: 'Java', value: 'java' },
                    { name: 'C++', value: 'cpp' },
                    { name: 'C#', value: 'csharp' },
                    { name: 'PHP', value: 'php' },
                    { name: 'HTML', value: 'html' },
                    { name: 'CSS', value: 'css' },
                    { name: 'SQL', value: 'sql' },
                    { name: 'TypeScript', value: 'typescript' },
                    { name: 'Go', value: 'go' },
                    { name: 'Rust', value: 'rust' },
                    { name: 'Kotlin', value: 'kotlin' },
                    { name: 'Swift', value: 'swift' },
                    { name: 'Ruby', value: 'ruby' },
                    { name: 'Dart', value: 'dart' },
                    { name: 'R', value: 'r' },
                    { name: 'MATLAB', value: 'matlab' },
                    { name: 'Bash', value: 'bash' },
                    { name: 'PowerShell', value: 'powershell' },
                    { name: 'JSON', value: 'json' },
                    { name: 'XML', value: 'xml' },
                    { name: 'YAML', value: 'yaml' },
                    { name: 'Markdown', value: 'markdown' },
                    { name: 'Diğer', value: 'text' }
                )),

    async execute(interaction) {
        await interaction.deferReply();

        const kelime = interaction.options.getString('kelime').toLowerCase();
        const dil = interaction.options.getString('dil');

        const kodlarPath = path.join(__dirname, '..', 'data', 'kodlar.json');
        
        if (!fs.existsSync(kodlarPath)) {
            return interaction.editReply({
                content: '❌ Henüz hiç kod paylaşılmamış!',
                ephemeral: true
            });
        }

        const kodlar = JSON.parse(fs.readFileSync(kodlarPath, 'utf8'));
        
        // Arama yap
        let sonuclar = kodlar.filter(kod => {
            const kodIcerik = kod.kod.toLowerCase();
            const aciklama = kod.aciklama.toLowerCase();
            const dilEslesmesi = dil ? kod.dil === dil : true;
            
            return (kodIcerik.includes(kelime) || aciklama.includes(kelime)) && dilEslesmesi;
        });

        // Sadece bu sunucudaki kodları göster
        sonuclar = sonuclar.filter(kod => kod.guildId === interaction.guild.id);

        if (sonuclar.length === 0) {
            const embed = new EmbedBuilder()
                .setColor('#ff6b6b')
                .setTitle('🔍 Arama Sonucu')
                .setDescription(`**"${kelime}"** için sonuç bulunamadı.`)
                .addFields(
                    { name: '💡 İpucu', value: 'Farklı kelimeler deneyin veya daha genel terimler kullanın.' }
                )
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        }

        // Sonuçları sırala (en yeni önce)
        sonuclar.sort((a, b) => new Date(b.tarih) - new Date(a.tarih));

        // Maksimum 10 sonuç göster
        const gosterilecekSonuclar = sonuclar.slice(0, 10);

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
            .setTitle('🔍 Arama Sonuçları')
            .setDescription(`**"${kelime}"** için **${sonuclar.length}** sonuç bulundu.`)
            .setTimestamp();

        // Sonuçları ekle
        for (let i = 0; i < gosterilecekSonuclar.length; i++) {
            const kod = gosterilecekSonuclar[i];
            const kodOzeti = kod.kod.length > 100 ? kod.kod.substring(0, 100) + '...' : kod.kod;
            const tarih = new Date(kod.tarih);
            
            embed.addFields({
                name: `${i + 1}. ${dilIsimleri[kod.dil] || kod.dil} - ${kod.aciklama}`,
                value: `\`\`\`${kod.dil}\n${kodOzeti}\n\`\`\`\n👤 <@${kod.paylasan}> • 📅 <t:${Math.floor(tarih.getTime() / 1000)}:R>`,
                inline: false
            });
        }

        if (sonuclar.length > 10) {
            embed.setFooter({ 
                text: `İlk 10 sonuç gösteriliyor. Toplam ${sonuclar.length} sonuç var.` 
            });
        }

        // Butonlar oluştur
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ara_daha_fazla')
                    .setLabel('📄 Daha Fazla')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(sonuclar.length <= 10),
                new ButtonBuilder()
                    .setCustomId('ara_yeni_arama')
                    .setLabel('🔄 Yeni Arama')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    },
}; 