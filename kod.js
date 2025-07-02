const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kod')
        .setDescription('Kod paylaşımı yapar')
        .addStringOption(option =>
            option.setName('kod')
                .setDescription('Paylaşmak istediğiniz kod')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('dil')
                .setDescription('Kodun programlama dili')
                .setRequired(true)
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
                ))
        .addStringOption(option =>
            option.setName('açıklama')
                .setDescription('Kodunuz hakkında kısa açıklama (isteğe bağlı)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        const kod = interaction.options.getString('kod');
        const dil = interaction.options.getString('dil');
        const aciklama = interaction.options.getString('açıklama') || 'Açıklama yok';

        // Kod uzunluğunu kontrol et
        if (kod.length > 4000) {
            return interaction.editReply({
                content: '❌ Kod çok uzun! Maksimum 4000 karakter olabilir.',
                ephemeral: true
            });
        }

        // Dil renklerini tanımla
        const dilRenkleri = {
            javascript: '#f7df1e',
            python: '#3776ab',
            java: '#ed8b00',
            cpp: '#00599c',
            csharp: '#178600',
            php: '#777bb4',
            html: '#e34c26',
            css: '#1572b6',
            sql: '#336791',
            typescript: '#3178c6',
            go: '#00add8',
            rust: '#ce422b',
            kotlin: '#7f52ff',
            swift: '#f05138',
            ruby: '#cc342d',
            dart: '#00b4ab',
            r: '#276dc3',
            matlab: '#e16737',
            bash: '#4eaa25',
            powershell: '#012456',
            json: '#000000',
            xml: '#ff6600',
            yaml: '#cb171e',
            markdown: '#000000',
            text: '#6c757d'
        };

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

        // Embed oluştur
        const embed = new EmbedBuilder()
            .setColor(dilRenkleri[dil] || '#6c757d')
            .setTitle(`💻 ${dilIsimleri[dil]} Kodu`)
            .setDescription(`**Açıklama:** ${aciklama}`)
            .addFields(
                { name: '👤 Paylaşan', value: `${interaction.user}`, inline: true },
                { name: '📅 Tarih', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
                { name: '🔤 Dil', value: dilIsimleri[dil], inline: true }
            )
            .setTimestamp()
            .setFooter({ 
                text: `${interaction.guild.name} • Kod Paylaşım Botu`, 
                iconURL: interaction.guild.iconURL() 
            });

        // Kod bloğunu ekle
        const kodBloğu = `\`\`\`${dil}\n${kod}\n\`\`\``;
        
        if (kodBloğu.length <= 1024) {
            embed.addFields({ name: '📝 Kod', value: kodBloğu });
        } else {
            // Kod çok uzunsa dosya olarak gönder
            const buffer = Buffer.from(kod, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, { name: `kod.${dil === 'text' ? 'txt' : dil}` });
            
            embed.addFields({ 
                name: '📝 Kod', 
                value: 'Kod çok uzun olduğu için dosya olarak gönderildi.' 
            });
            
            // Butonlar oluştur
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('kod_kopyala')
                        .setLabel('📋 Kodu Kopyala')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('kod_indir')
                        .setLabel('⬇️ Dosyayı İndir')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
                        .setLabel('🔗 Mesaja Git')
                        .setStyle(ButtonStyle.Link)
                );

            return interaction.editReply({
                embeds: [embed],
                files: [attachment],
                components: [row]
            });
        }

        // Butonlar oluştur
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('kod_kopyala')
                    .setLabel('📋 Kodu Kopyala')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('kod_beğen')
                    .setLabel('👍 Beğen')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
                    .setLabel('🔗 Mesaja Git')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });

        // Kodu veritabanına kaydet (basit dosya tabanlı)
        const kodVerisi = {
            id: Date.now(),
            kod: kod,
            dil: dil,
            aciklama: aciklama,
            paylasan: interaction.user.id,
            tarih: new Date().toISOString(),
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: interaction.id
        };

        const kodlarPath = path.join(__dirname, '..', 'data', 'kodlar.json');
        const kodlarDir = path.dirname(kodlarPath);
        
        if (!fs.existsSync(kodlarDir)) {
            fs.mkdirSync(kodlarDir, { recursive: true });
        }

        let kodlar = [];
        if (fs.existsSync(kodlarPath)) {
            kodlar = JSON.parse(fs.readFileSync(kodlarPath, 'utf8'));
        }

        kodlar.push(kodVerisi);
        fs.writeFileSync(kodlarPath, JSON.stringify(kodlar, null, 2));
    },
}; 