# 🤖 Neva Development Discord Kod Paylaşım Botu

Discord sunucuları için efsane bir kod paylaşım botu! Modern tasarım, syntax highlighting ve gelişmiş arama özellikleri ile kod paylaşımını kolaylaştırır.

## ✨ Özellikler

### 🎯 Temel Özellikler
- **Kod Paylaşımı**: 25+ programlama dili desteği
- **Syntax Highlighting**: Otomatik dil algılama ve renklendirme
- **Arama Sistemi**: Kod içeriği ve açıklamalarda arama
- **İstatistikler**: Detaylı kod paylaşım istatistikleri
- **Modern UI**: Güzel embed tasarımları ve butonlar

### 🔧 Teknik Özellikler
- **Slash Komutlar**: Modern Discord slash komut desteği
- **Dosya Desteği**: Uzun kodlar için dosya indirme
- **Veritabanı**: JSON tabanlı veri saklama
- **Hata Yönetimi**: Kapsamlı hata yakalama ve raporlama
- **Performans**: Optimize edilmiş kod yapısı

### 📊 Desteklenen Diller
- JavaScript, TypeScript, Python, Java, C++, C#
- PHP, HTML, CSS, SQL, Go, Rust, Kotlin
- Swift, Ruby, Dart, R, MATLAB, Bash
- PowerShell, JSON, XML, YAML, Markdown

## 🚀 Kurulum

### Gereksinimler
- Node.js 16.9.0 veya üzeri
- Discord Bot Token
- Discord Application ID

### Adım 1: Projeyi İndirin
```bash
git clone https://github.com/kullanici/discord-kod-paylasim-botu.git
cd discord-kod-paylasim-botu
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Çevre Değişkenlerini Ayarlayın
1. `env.example` dosyasını `.env` olarak kopyalayın
2. Discord Developer Portal'dan bot token'ınızı alın
3. `.env` dosyasını düzenleyin:

```env
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here
OWNER_ID=your_owner_id_here
PREFIX=!
```

### Adım 4: Botu Çalıştırın
```bash
# Geliştirme modu
npm run dev

# Üretim modu
npm start
```

## 📝 Komutlar

### Temel Komutlar
- `/kod` - Kod paylaşımı yapar
- `/ara` - Paylaşılan kodları arar
- `/istatistik` - Kod paylaşım istatistiklerini gösterir
- `/yardim` - Bot komutları hakkında yardım gösterir

### Komut Örnekleri

#### Kod Paylaşımı
```
/kod kod:console.log("Merhaba Dünya!"); dil:javascript açıklama:Basit bir JavaScript örneği
```

#### Kod Arama
```
/ara kelime:function dil:javascript
```

#### İstatistik Görüntüleme
```
/istatistik
```

## 🎨 Özellik Detayları

### Kod Paylaşımı
- **Syntax Highlighting**: Her dil için özel renkler
- **Dosya Desteği**: Uzun kodlar otomatik dosya olarak gönderilir
- **Açıklama Sistemi**: Kodlar için açıklama ekleme
- **Butonlar**: Kopyalama, beğenme ve indirme butonları

### Arama Sistemi
- **İçerik Arama**: Kod içeriğinde kelime arama
- **Açıklama Arama**: Açıklama metinlerinde arama
- **Dil Filtreleme**: Belirli dilde arama
- **Tarih Sıralama**: En yeni kodlar önce

### İstatistikler
- **Genel İstatistikler**: Toplam kod, dil ve kullanıcı sayısı
- **Popüler Diller**: En çok kullanılan programlama dilleri
- **Aktif Kullanıcılar**: En çok kod paylaşan kullanıcılar
- **Günlük Grafikler**: Son 7 günün paylaşım grafikleri

## 🔧 Geliştirme

### Proje Yapısı
```
discord-kod-paylasim-botu/
├── commands/           # Slash komutları
│   ├── kod.js         # Kod paylaşım komutu
│   ├── ara.js         # Arama komutu
│   ├── istatistik.js  # İstatistik komutu
│   └── yardim.js      # Yardım komutu
├── events/            # Event handler'ları
│   ├── ready.js       # Bot hazır eventi
│   └── interactionCreate.js # Etkileşim eventi
├── data/              # Veri dosyaları
│   └── kodlar.json    # Kod veritabanı
├── index.js           # Ana bot dosyası
├── deploy-commands.js # Komut kaydetme
├── package.json       # Bağımlılıklar
└── README.md          # Dokümantasyon
```

### Yeni Komut Ekleme
1. `commands/` klasöründe yeni dosya oluşturun
2. SlashCommandBuilder kullanarak komut tanımlayın
3. `execute` fonksiyonunu implement edin
4. Bot otomatik olarak komutu yükleyecektir

### Yeni Event Ekleme
1. `events/` klasöründe yeni dosya oluşturun
2. Event adını ve `execute` fonksiyonunu tanımlayın
3. `once: true` ile tek seferlik eventler için

## 🐛 Sorun Giderme

### Yaygın Sorunlar

#### Bot Giriş Yapmıyor
- Token'ın doğru olduğundan emin olun
- Bot'un gerekli izinlere sahip olduğunu kontrol edin
- Intents ayarlarını kontrol edin

#### Komutlar Çalışmıyor
- Slash komutların kaydedildiğinden emin olun
- Bot'un sunucuda gerekli izinlere sahip olduğunu kontrol edin
- `deploy-commands.js` dosyasını çalıştırın

#### Dosya Yazma Hatası
- `data/` klasörünün yazma izinlerini kontrol edin
- Disk alanının yeterli olduğundan emin olun

## 📈 Performans

### Optimizasyonlar
- **Lazy Loading**: Komutlar ve eventler gerektiğinde yüklenir
- **Caching**: Discord.js'in built-in cache sistemi kullanılır
- **Error Handling**: Kapsamlı hata yakalama ve loglama
- **Memory Management**: Gereksiz veri tutulmaz

### Öneriler
- Büyük sunucular için veritabanı kullanın (MongoDB, PostgreSQL)
- Rate limiting ekleyin
- Loglama sistemi kurun
- Monitoring araçları ekleyin

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🆘 Destek

- **Discord**: discord.gg/altyapi

## 🙏 Teşekkürler

- Discord.js ekibine
- Tüm katkıda bulunanlara
- Test eden kullanıcılara

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!** 