/**
 * Konuş Kazan Oyunu - Kartlar
 * Her kategori için kartları ve ilgili fonksiyonları içerir
 */

// Yakıştır Kartları
const YAKISTIR_KARTLARI = [
    {
        id: 1,
        harf: "M",
        sorular: [
            "Adınız – Soyadınız?",
            "Yaşınız?",
            "Hobilerinizden bahseder misiniz?",
            "En sevdiğiniz yemek nedir?",
            "Hangi ülkeleri gezdiniz?"
        ]
    },
    {
        id: 2,
        harf: "F",
        sorular: [
            "Adınız – Soyadınız?",
            "Nerede doğdunuz?",
            "En sevdiğiniz erkek isimleri nelerdir?",
            "Ne iş yapıyorsunuz?",
            "Sizce mutluluk nedir?"
        ]
    },
    {
        id: 3,
        harf: "T",
        sorular: [
            "Adınız – Soyadınız?",
            "Özel zevkleriniz nelerdir?",
            "En sevdiğiniz kız isimleri nelerdir?",
            "Nerelisiniz?",
            "En sevdiğiniz filmler nelerdir?"
        ]
    },
    {
        id: 4,
        harf: "S",
        sorular: [
            "Adınız – Soyadınız?",
            "Sevdiğiniz şarkıcıları söyler misiniz?",
            "Hobilerinizden bahseder misiniz?",
            "Okulda en sevdiğiniz dersler nelerdir?",
            "Neler seni iyi hissettirir?"
        ]
    },
    {
        id: 5,
        harf: "B",
        sorular: [
            "Adınız – Soyadınız?",
            "Tatilinizi nerelerde yaparsınız?",
            "Hobilerinizden bahseder misiniz?",
            "İlerde hangi mesleği yapmak istersiniz?",
            "Hangi ülkeleri gezdiniz?"
        ]
    },
    {
        id: 6,
        harf: "C",
        sorular: [
            "Adınız – Soyadınız?",
            "Korktuğunuz şeyler nelerdir?",
            "Mesleğiniz nedir?",
            "En sevdiğiniz yemek nedir?",
            "Hangi şehirleri gezmek istersiniz?"
        ]
    },
    {
        id: 7,
        harf: "Ö",
        sorular: [
            "Adınız – Soyadınız?",
            "Özel zevkleriniz nelerdir?",
            "En sevdiğiniz kız isimleri nelerdir?",
            "Nerelisiniz?",
            "En sevdiğiniz filmler nelerdir?"
        ]
    },
    {
        id: 8,
        harf: "İ",
        sorular: [
            "Adınız – Soyadınız?",
            "Özel zevkleriniz nelerdir?",
            "En sevdiğiniz kız isimleri nelerdir?",
            "Nerelisiniz?",
            "En sevdiğiniz filmler nelerdir?"
        ]
    },
    {
        id: 9,
        harf: "K",
        sorular: [
            "Adınız – Soyadınız?",
            "Yaşınız?",
            "Hobilerinizden bahseder misiniz?",
            "Özel zevkleriniz nelerdir?",
            "Sevdiğiniz yemekler nelerdir?"
        ]
    },
    {
        id: 10,
        harf: "G",
        sorular: [
            "Adınız – Soyadınız?",
            "En sevdiğiniz hayvanlar nelerdir?",
            "Sizi çok sevindiren şey nedir?",
            "Hobileriniz nelerdir?",
            "Ne tür yemekleri seversiniz?"
        ]
    },
    {
        id: 11,
        harf: "Y",
        sorular: [
            "Adınız – Soyadınız?",
            "Okula nasıl geldiniz?",
            "En önemli özelliğiniz nedir?",
            "İlerde ne iş yapmayı düşünüyorsunuz?",
            "Dünyada barış olması için ne olmalıdır?"
        ]
    },
    {
        id: 12,
        harf: "R",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 13,
        harf: "L",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 14,
        harf: "Z",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 15,
        harf: "Ç",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 16,
        harf: "N",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 17,
        harf: "Ş",
        sorular: [
            "Adınız – Soyadınız?",
            "Yaşınız?",
            "Hobilerinizden bahseder misiniz?",
            "Özel zevkleriniz nelerdir?",
            "Sevdiğiniz yemekler nelerdir?"
        ]
    },
    {
        id: 18,
        harf: "V",
        sorular: [
            "Adınız – Soyadınız?",
            "Yaşınız?",
            "Hobilerinizden bahseder misiniz?",
            "Özel zevkleriniz nelerdir?",
            "Sevdiğiniz yemekler nelerdir?"
        ]
    },
    {
        id: 19,
        harf: "D",
        sorular: [
            "Adınız – Soyadınız?",
            "Annenizin adı nedir?",
            "En sevdiğiniz ders nedir?",
            "Boş zamanlarınızda neler yaparsınız?",
            "Üniversitede hangi bölümü okumak istersin?"
        ]
    },
    {
        id: 20,
        harf: "P",
        sorular: [
            "Adınız – Soyadınız?",
            "Yaşınız?",
            "Hobilerinizden bahseder misiniz?",
            "Özel zevkleriniz nelerdir?",
            "Sevdiğiniz yemekler nelerdir?"
        ]
    }
];

// Tersten Konuş Kartları
const TERSTEN_KONUS_KARTLARI = [
    {
        id: 1,
        cumleler: ["DOSTLUK", "KULTŞOD"],
        zorluk: "kolay"
    },
    {
        id: 2,
        cumleler: ["SINAV", "VANIŞ"],
        zorluk: "kolay"
    },
    {
        id: 3,
        cumleler: ["BİLİM", "MİLİB"],
        zorluk: "kolay"
    },
    {
        id: 4,
        cumleler: ["MUTLULUK", "KULULUTM"],
        zorluk: "kolay"
    },
    {
        id: 5,
        cumleler: ["CUMHURİYET", "TEYİRUHMUC"],
        zorluk: "orta"
    },
    {
        id: 6,
        cumleler: ["ATATÜRK", "KRÜTATA"],
        zorluk: "orta"
    },
    {
        id: 7,
        cumleler: ["SAVAŞ", "ŞAVAS"],
        zorluk: "kolay"
    },
    {
        id: 8,
        cumleler: ["SAYGI", "IGYAS"],
        zorluk: "kolay"
    },
    {
        id: 9,
        cumleler: ["BARIŞ", "ŞIRAB"],
        zorluk: "kolay"
    },
    {
        id: 10,
        cumleler: ["SANAT", "TANAS"],
        zorluk: "kolay"
    },
    {
        id: 11,
        cumleler: ["KİTAPLAR", "RALPATIK"],
        zorluk: "orta"
    },
    {
        id: 12,
        cumleler: ["TEKNOLOJİ", "İJOLONKET"],
        zorluk: "orta"
    },
    {
        id: 13,
        cumleler: ["SPOR", "ROPS"],
        zorluk: "kolay"
    },
    {
        id: 14,
        cumleler: ["HAYVANLAR", "RALNAVYAH"],
        zorluk: "orta"
    },
    {
        id: 15,
        cumleler: ["FİLMLER", "RELMLİF"],
        zorluk: "kolay"
    },
    {
        id: 16,
        cumleler: ["ÖĞRETMEN", "NEMTERĞÖ"],
        zorluk: "orta"
    },
    {
        id: 17,
        cumleler: ["AİLE", "ELİA"],
        zorluk: "kolay"
    },
    {
        id: 18,
        cumleler: ["ÇİÇEK", "KEÇİÇ"],
        zorluk: "kolay"
    },
    {
        id: 19,
        cumleler: ["ARKADAŞ", "ŞADAKRA"],
        zorluk: "kolay"
    },
    {
        id: 20,
        cumleler: ["EV", "VE"],
        zorluk: "kolay"
    }
];

// Birini Betimleme Kartları
const BIRINI_BETIMLEME_KARTLARI = [
    {
        id: 1,
        image: "images/kartlar/Birini_betimle_1.png",
        yonerge: "Bu görselde gördüğünü detaylı bir şekilde betimle. Fiziksel özellikleri, olası hikayesi ve izlenimlerin hakkında konuş."
    },
    {
        id: 2,
        image: "images/kartlar/Birini_betimle_2.png",
        yonerge: "Bu görseli detaylı bir şekilde betimle. Neler gördüğünü ve sana ne hissettirdiğini paylaş."
    },
    {
        id: 3,
        image: "images/kartlar/Birini_betimle_3.png",
        yonerge: "Bu görseli betimlemeye çalış. Gördüğün özellikleri, hikayesini ve olası detayları anlat."
    },
    {
        id: 4,
        image: "images/kartlar/Birini_betimle_4.png",
        yonerge: "Bu görseli detaylı bir şekilde betimle. Görselde neler oluyor, nasıl bir ortam var? Hayal gücünü kullan."
    },
    {
        id: 5,
        image: "images/kartlar/Birini_betimle_5.png",
        yonerge: "Bu görseli betimlemeye çalış. Ne tür bir atmosfer görüyorsun? Hayali bir hikaye oluşturabilir misin?"
    },
    {
        id: 6,
        image: "images/kartlar/Birini_betimle_6.png",
        yonerge: "Bu görsel hakkında detaylı bir betimleme yap. Gördüklerini, hissettiklerini ve aklına gelen düşünceleri paylaş."
    },
    {
        id: 7,
        image: "images/kartlar/Birini_betimle_7.png",
        yonerge: "Bu görseli betimlemeye çalış. Gördüğün şeylerin özelliklerini ve sana çağrıştırdıklarını anlat."
    },
    {
        id: 8,
        image: "images/kartlar/Birini_betimle_8.png",
        yonerge: "Bu görselde ne görüyorsun? Detaylı bir betimleme yap ve görselin sana hissettirdiklerini anlat."
    },
    {
        id: 9,
        image: "images/kartlar/Birini_betimle_9.png",
        yonerge: "Bu görseli olabildiğince detaylı betimle. Gördüğün şeyin hikayesi ne olabilir? Düşüncelerini paylaş."
    },
    {
        id: 10,
        image: "images/kartlar/Birini_betimle_10.png",
        yonerge: "Bu görseli betimlemeye çalış. Gördüklerinin özellikleri ve ortamın atmosferi hakkında konuş."
    },
    {
        id: 11,
        image: "images/kartlar/Birini_betimle_11.png",
        yonerge: "Bu görseli detaylarıyla betimle. Görselde dikkatini çeken unsurları ve genel izlenimini anlat."
    },
    {
        id: 12,
        image: "images/kartlar/Birini_betimle_12.png",
        yonerge: "Bu görseli betimlemeye çalış. Gördüğün şeyin özellikleri ve olası hikayesi nedir?"
    },
    {
        id: 13,
        image: "images/kartlar/Birini_betimle_13.png",
        yonerge: "Bu görseli betimlerken detaylara dikkat et. Gördüklerinin özellikleri ve sana çağrıştırdıkları neler?"
    },
    {
        id: 14,
        image: "images/kartlar/Birini_betimle_14.png",
        yonerge: "Bu görseli betimlemeye çalış. Görsel sana neyi anımsatıyor? Hangi duyguları hissediyorsun?"
    },
    {
        id: 15,
        image: "images/kartlar/Birini_betimle_15.png",
        yonerge: "Bu görseli detaylı bir şekilde betimle. Gördüğün şeyin hikayesi ne olabilir? Hayal gücünü kullan."
    },
    {
        id: 16,
        image: "images/kartlar/Birini_betimle_16.png",
        yonerge: "Bu görseli betimlemeye çalış. Görüntüdeki detayları fark et ve genel bir izlenim oluştur."
    },
    {
        id: 17,
        image: "images/kartlar/Birini_betimle_17.png",
        yonerge: "Bu görsel hakkında kapsamlı bir betimleme yap. Ne görüyorsun? Bu görselin hikayesi ne olabilir?"
    },
    {
        id: 18,
        image: "images/kartlar/Birini_betimle_18.png",
        yonerge: "Bu görseli detaylarıyla betimle. Görselde gördüğün şeylerin özellikleri ve izlenimlerin neler?"
    },
    {
        id: 19,
        image: "images/kartlar/Birini_betimle_19.png",
        yonerge: "Bu görseli betimlemeye çalış. Gördüğün şeyin benzersiz özellikleri ve hikayesi hakkında konuş."
    },
    {
        id: 20,
        image: "images/kartlar/Birini_betimle_20.png",
        yonerge: "Bu görseli detaylı bir şekilde betimle. Görüntüdeki unsurları, atmosferi ve sana hissettirdiklerini anlat."
    }
];

// Düşünce Atölyesi Kartları
const DUSUNCE_ATOLYESI_KARTLARI = [
    {
        id: 1,
        konu: "Teknoloji",
        dusunce: "Teknolojinin hayatımızı kolaylaştırdığı 3 örnek ver ve bunlardan hangisinin en önemli olduğunu açıkla."
    },
    {
        id: 2,
        konu: "Çevre",
        dusunce: "Çevre kirliliğini önlemek için neler yapılabilir? En etkili 3 önlemi açıkla."
    },
    {
        id: 3,
        konu: "Eğitim",
        dusunce: "İdeal bir eğitim sistemi nasıl olmalıdır? Fikirlerini açıkla."
    },
    {
        id: 4,
        konu: "Sanat",
        dusunce: "Sanatın toplum üzerindeki etkileri nelerdir? Sanat olmasaydı dünyamız nasıl olurdu?"
    },
    {
        id: 5,
        konu: "Arkadaşlık",
        dusunce: "İyi bir arkadaşta olması gereken 3 özelliği açıkla. Bu özelliklerden hangisi senin için en önemli?"
    },
    {
        id: 6,
        konu: "Sosyal Medya",
        dusunce: "Sosyal medyanın hayatımıza olumlu ve olumsuz etkileri nelerdir? Kendi kullanım alışkanlıklarını değerlendir."
    },
    {
        id: 7,
        konu: "Spor",
        dusunce: "Spor yapmanın fiziksel ve zihinsel faydaları nelerdir? Spor yapmak insanları nasıl daha iyi bireyler haline getirebilir?"
    },
    {
        id: 8,
        konu: "Kitap Okuma",
        dusunce: "Kitap okumanın bize sağladığı 3 fayda nedir? Düzenli kitap okuyan ve okumayan bireyler arasında ne gibi farklar olabilir?"
    },
    {
        id: 9,
        konu: "Zaman Yönetimi",
        dusunce: "Zamanı etkili kullanmak için neler yapılabilir? Kendi zaman yönetimi stratejilerini ve bunların etkilerini değerlendir."
    },
    {
        id: 10,
        konu: "İklim Değişikliği",
        dusunce: "İklim değişikliğini önlemek için bireylerin yapabileceği en önemli 3 şey nedir? Bu konuda hükümetlere düşen görevler nelerdir?"
    },
    {
        id: 11,
        konu: "Liderlik",
        dusunce: "İyi bir liderde olması gereken 3 özellik nedir? Tarihten veya günümüzden örnek vererek açıkla."
    },
    {
        id: 12,
        konu: "Aile",
        dusunce: "Ailenin toplum içindeki önemi nedir? Aile bağlarını güçlendirmek için neler yapılabilir?"
    },
    {
        id: 13,
        konu: "Başarı",
        dusunce: "Başarı nedir? Başarılı olmak için gerekli olan en önemli 3 faktör nedir? Örneklerle açıkla."
    },
    {
        id: 14,
        konu: "Yardımlaşma",
        dusunce: "Toplumda yardımlaşmanın önemi nedir? Yardımlaşmanın hem yardım eden hem de yardım alan kişiye etkileri nelerdir?"
    },
    {
        id: 15,
        konu: "Gelecek",
        dusunce: "Gelecek 50 yılda dünyamızı nasıl değişiklikler bekliyor olabilir? Bu değişikliklere nasıl hazırlanabiliriz?"
    },
    {
        id: 16,
        konu: "Kültürel Miras",
        dusunce: "Kültürel mirasımızı korumak neden önemlidir? Kültürel mirasımızın geleceğe aktarılması için neler yapılabilir?"
    },
    {
        id: 17,
        konu: "Hoşgörü",
        dusunce: "Toplumda hoşgörünün önemi nedir? Farklı düşüncelere saygı göstermenin toplumsal barışa katkıları nelerdir?"
    },
    {
        id: 18,
        konu: "Mutluluk",
        dusunce: "Mutluluk nedir? İnsanları mutlu eden 3 faktör nedir? Kendi mutluluk kaynakların hakkında düşün."
    },
    {
        id: 19,
        konu: "Doğruluk ve Dürüstlük",
        dusunce: "Doğruluk ve dürüstlüğün hayatımızdaki önemi nedir? Dürüst davranmanın kişisel ve toplumsal faydaları nelerdir?"
    },
    {
        id: 20,
        konu: "İletişim",
        dusunce: "Etkili iletişimin özellikleri nelerdir? İletişim becerilerini geliştirmenin kişisel ve mesleki hayata katkıları nelerdir?"
    }
];

// Hikaye Atölyesi Kartları
const HIKAYE_ATOLYESI_KARTLARI = [
    {
        id: 1,
        image: "images/kartlar/Hikaye_atolyesi_1.png",
        yonerge: "Bu görselden esinlenerek bir hikaye anlat. Görselde gördüğün ortamı ve karakterleri hikayene dahil et."
    },
    {
        id: 2,
        image: "images/kartlar/Hikaye_atolyesi_2.png",
        yonerge: "Bu görseli temel alarak kısa bir hikaye oluştur. Görseldeki detayları hikayene nasıl entegre edebilirsin?"
    },
    {
        id: 3,
        image: "images/kartlar/Hikaye_atolyesi_3.png",
        yonerge: "Bu görselden yola çıkarak komik bir hikaye anlat. Hikayende en az üç karakter olsun."
    },
    {
        id: 4,
        image: "images/kartlar/Hikaye_atolyesi_4.png",
        yonerge: "Bu görselden esinlenerek duygusal bir hikaye anlat. Hikayende ana karakterin duygularını detaylı bir şekilde ifade et."
    },
    {
        id: 5,
        image: "images/kartlar/Hikaye_atolyesi_5.png",
        yonerge: "Bu görselden yola çıkarak heyecanlı bir hikaye anlat. Hikayene ilgi çekici bir başlangıç ve sürpriz bir son ekle."
    },
    {
        id: 6,
        image: "images/kartlar/Hikaye_atolyesi_6.png",
        yonerge: "Bu görsele bakarak bir arkadaşlık hikayesi anlat. Hikayeni önemli bir ders veya mesajla sonlandır."
    },
    {
        id: 7,
        image: "images/kartlar/Hikaye_atolyesi_7.png",
        yonerge: "Bu görselden yola çıkarak gizemli bir hikaye anlat. Hikayende okuyucuyu şaşırtacak bir sır olsun."
    },
    {
        id: 8,
        image: "images/kartlar/Hikaye_atolyesi_8.png",
        yonerge: "Bu görselden esinlenerek bir doğa macerası hikayesi anlat. Hikayende doğanın güzelliklerini vurgula."
    },
    {
        id: 9,
        image: "images/kartlar/Hikaye_atolyesi_9.png",
        yonerge: "Bu görsele bakarak bir aile hikayesi anlat. Hikayende karakterler arasında güçlü bağlar olsun."
    },
    {
        id: 10,
        image: "images/kartlar/Hikaye_atolyesi_10.png",
        yonerge: "Bu görselden yola çıkarak fantastik bir hikaye anlat. Hikayende sihir, fantastik yaratıklar veya olağanüstü olaylar olsun."
    },
    {
        id: 11,
        image: "images/kartlar/Hikaye_atolyesi_11.png",
        yonerge: "Bu görsele bakarak bir yolculuk hikayesi anlat. Hikayende karakterin kendini keşfetmesi temasını işle."
    },
    {
        id: 12,
        image: "images/kartlar/Hikaye_atolyesi_12.png",
        yonerge: "Bu görselden esinlenerek bir cesaret hikayesi anlat. Hikayendeki karakter bir korkusuyla yüzleşsin."
    },
    {
        id: 13,
        image: "images/kartlar/Hikaye_atolyesi_13.png",
        yonerge: "Bu görsele bakarak bir dostluk hikayesi anlat. Hikayende karakterler arasında yardımlaşma ve dayanışma olsun."
    },
    {
        id: 14,
        image: "images/kartlar/Hikaye_atolyesi_14.png",
        yonerge: "Bu görselden yola çıkarak bir başarı hikayesi anlat. Hikayende zorlukların üstesinden gelen bir karakter olsun."
    },
    {
        id: 15,
        image: "images/kartlar/Hikaye_atolyesi_15.png",
        yonerge: "Bu görselden esinlenerek bir hayat dersi içeren hikaye anlat. Hikayende ana karakter önemli bir şey öğrensin."
    },
    {
        id: 16,
        image: "images/kartlar/Hikaye_atolyesi_16.png",
        yonerge: "Bu görsele bakarak bir keşif hikayesi anlat. Hikayende yeni yerler ve deneyimler keşfeden bir karakter olsun."
    },
    {
        id: 17,
        image: "images/kartlar/Hikaye_atolyesi_17.png",
        yonerge: "Bu görselden yola çıkarak bir yardımlaşma hikayesi anlat. Hikayende birbirine yardım eden karakterler olsun."
    },
    {
        id: 18,
        image: "images/kartlar/Hikaye_atolyesi_18.png",
        yonerge: "Bu görselden esinlenerek eğlenceli bir hikaye anlat. Hikayende güldüren veya neşelendiren olaylar olsun."
    },
    {
        id: 19,
        image: "images/kartlar/Hikaye_atolyesi_19.png",
        yonerge: "Bu görsele bakarak bir aile macerası hikayesi anlat. Hikayende aile üyelerinin birlikte yaşadığı bir macera olsun."
    },
    {
        id: 20,
        image: "images/kartlar/Hikaye_atolyesi_20.png",
        yonerge: "Bu görselden yola çıkarak bir hayal gücü hikayesi anlat. Hikayende olağanüstü olaylar veya karakterler olsun."
    }
];

// Bir Anım Kartları
const BIR_ANIM_KARTLARI = [
    {
        id: 1,
        konu: "Okul Anısı",
        yonerge: "Okulda yaşadığın ve hiç unutamadığın bir anını detaylarıyla anlat."
    },
    {
        id: 2,
        konu: "Tatil Anısı",
        yonerge: "En sevdiğin tatil anını anlat. Nerede ve kiminle beraberdin? Neler yaptınız?"
    },
    {
        id: 3,
        konu: "Güldüğün An",
        yonerge: "Hayatında çok güldüğün bir anını paylaş. Neden bu kadar güldün? Kimler vardı?"
    },
    {
        id: 4,
        konu: "Heyecanlandığın An",
        yonerge: "Çok heyecanlandığın bir anını anlat. Ne oldu? Nasıl hissettirdi?"
    },
    {
        id: 5,
        konu: "İlk Kez",
        yonerge: "Hayatında ilk kez yaptığın ve seni etkileyen bir şeyi anlat. Ne hissettin? Nasıl bir deneyimdi?"
    },
    {
        id: 6,
        konu: "Aile Anısı",
        yonerge: "Ailenle yaşadığın ve unutamadığın bir anıyı anlat. Bu anı neden senin için özel?"
    },
    {
        id: 7,
        konu: "Başarı Anısı",
        yonerge: "Hayatında başardığın ve gurur duyduğun bir şeyi anlat. Bu başarı için neler yaptın? Sonuçta nasıl hissettin?"
    },
    {
        id: 8,
        konu: "Utandığın An",
        yonerge: "Çok utandığın bir anını anlat. Ne oldu? Bu durumla nasıl başa çıktın?"
    },
    {
        id: 9,
        konu: "Arkadaşlık Anısı",
        yonerge: "Bir arkadaşınla yaşadığın unutulmaz bir anıyı paylaş. Bu anı arkadaşlığınızı nasıl etkiledi?"
    },
    {
        id: 10,
        konu: "Yardım Ettiğin An",
        yonerge: "Birine yardım ettiğin ve iyi hissettiğin bir anını anlat. Nasıl yardım ettin? Sonrasında neler oldu?"
    },
    {
        id: 11,
        konu: "Zor Bir Karar",
        yonerge: "Hayatında vermek zorunda kaldığın zor bir kararı anlat. Neden zordu? Sonuçta doğru kararı verdiğini düşünüyor musun?"
    },
    {
        id: 12,
        konu: "Sürpriz An",
        yonerge: "Yaşadığın güzel bir sürprizi anlat. Kim hazırladı? Nasıl hissettirdi?"
    },
    {
        id: 13,
        konu: "Öğrendiğin Ders",
        yonerge: "Hayatında öğrendiğin önemli bir dersi anlat. Bu dersi nasıl öğrendin? Hayatını nasıl değiştirdi?"
    },
    {
        id: 14,
        konu: "Doğa Anısı",
        yonerge: "Doğada yaşadığın ve seni etkileyen bir anıyı anlat. Nerede yaşandı? Neden seni bu kadar etkiledi?"
    },
    {
        id: 15,
        konu: "Şanslı An",
        yonerge: "Kendini çok şanslı hissettiğin bir anıyı paylaş. Ne oldu? Bu şans hayatını nasıl etkiledi?"
    },
    {
        id: 16,
        konu: "Hediye Anısı",
        yonerge: "Aldığın en anlamlı hediyeyi ve o anı anlat. Hediyeyi kim verdi? Neden bu kadar anlamlıydı?"
    },
    {
        id: 17,
        konu: "Korktuğun An",
        yonerge: "Çok korktuğun bir anını anlat. Ne oldu? Bu korkuyla nasıl başa çıktın?"
    },
    {
        id: 18,
        konu: "Gurur Duyduğun An",
        yonerge: "Biriyle (aile üyesi, arkadaş vb.) ilgili gurur duyduğun bir anıyı anlat. Neden gurur duydun? Ona ne söyledin?"
    },
    {
        id: 19,
        konu: "Hayata Bakışını Değiştiren An",
        yonerge: "Hayata bakışını değiştiren bir anını anlat. Ne oldu? Bu olay seni nasıl değiştirdi?"
    },
    {
        id: 20,
        konu: "Teşekkür Ettiğin An",
        yonerge: "Birine içtenlikle teşekkür ettiğin bir anını paylaş. Neden teşekkür ettin? Karşı taraf nasıl tepki verdi?"
    }
];

// Hayal Atölyesi Kartları
const HAYAL_ATOLYESI_KARTLARI = [
    {
        id: 1,
        konu: "Bir doğal afette evde mahsur kaldığını hayal et.",
        yonerge: "Duygularını ve hayatta kalma stratejilerini paylaş."
    },
    {
        id: 2,
        konu: "Bir sahil kasabasında büyük bir tsunaminin yaklaştığını hayal et.",
        yonerge: "Nasıl tepki verirdin? İnsanları nasıl korurdun?"
    },
    {
        id: 3,
        konu: "Bankadayken soyguncuların bankaya girdiğini hayal et.",
        yonerge: "Bu durumda nasıl davranırdın? Neler hissederdin?"
    },
    {
        id: 4,
        konu: "Bir gece evde yalnızken elektriklerin kesildiğini hayal et.",
        yonerge: "Neler yapardın? Hangi duyguları yaşardın?"
    },
    {
        id: 5,
        konu: "Ormanda yürüyüş yaparken bir yabani hayvanla karşılaştığını hayal et.",
        yonerge: "Nasıl tepki verirdin? Hangi hayvan olurdu?"
    },
    {
        id: 6,
        konu: "Çok önemli bir sınava gireceğin günü hayal et.",
        yonerge: "Nasıl hazırlanırdın? Sınav anında neler hissederdin?"
    },
    {
        id: 7,
        konu: "Uzayda görev yapan bir astronot olduğunu hayal et.",
        yonerge: "Günlük yaşamın nasıl olurdu? Neler keşfetmek isterdin?"
    },
    {
        id: 8,
        konu: "Bir savaş uçağı pilotu olduğunu hayal et.",
        yonerge: "Nasıl bir pilot olurdun? En zorlu görevin ne olurdu?"
    },
    {
        id: 9,
        konu: "Bir zombi saldırısı sonrası hayatta kalan bir insan olduğunu hayal et.",
        yonerge: "Nasıl hayatta kalırdın? Diğer insanlarla nasıl iletişim kurardın?"
    },
    {
        id: 10,
        konu: "Okyanusta bir gemide denizci olduğunu hayal et.",
        yonerge: "Günlerin nasıl geçerdi? Zorlu deniz koşullarında ne yapardın?"
    },
    {
        id: 11,
        konu: "Gece acil serviste çalışan bir doktor olduğunu hayal et.",
        yonerge: "Nasıl bir doktor olurdun? En zorlu vakan ne olurdu?"
    },
    {
        id: 12,
        konu: "Özel gücü olan bir süper kahraman olduğunu hayal et.",
        yonerge: "Nasıl bir gücün olurdu? Bu gücü nasıl kullanırdın?"
    },
    {
        id: 13,
        konu: "Kutuplarda yaşayan bir eskimo olduğunu hayal et.",
        yonerge: "Günlük yaşamın nasıl olurdu? Soğukla nasıl başa çıkardın?"
    },
    {
        id: 14,
        konu: "Ormanda tek başına kaybolduğunu hayal et.",
        yonerge: "Hayatta kalmak için neler yapardın? Nasıl yardım isterdin?"
    },
    {
        id: 15,
        konu: "Issız bir adada tek başına olduğunu hayal et.",
        yonerge: "Hangi üç eşyayı yanında götürmek isterdin? Nasıl yaşardın?"
    },
    {
        id: 16,
        konu: "Dağa tırmanırken aniden fırtınanın çıktığını hayal et.",
        yonerge: "Güvende kalmak için neler yapardın? Nasıl hissederdin?"
    },
    {
        id: 17,
        konu: "Final maçında son dakika gol atarak kupa kazandığın bir futbolcu olduğunu hayal et.",
        yonerge: "O anki duygularını ve kutlamaları anlat."
    },
    {
        id: 18,
        konu: "Bir sabah uyandığında hiçbir şey göremediğini hayal et.",
        yonerge: "Nasıl tepki verirdin? Hayatına nasıl devam ederdin?"
    },
    {
        id: 19,
        konu: "Büyük bir servete sahip olduğunu hayal et.",
        yonerge: "Paranı nasıl değerlendirirdin? Hayatın nasıl değişirdi?"
    },
    {
        id: 20,
        konu: "Taş devri çağında yaşadığını hayal et.",
        yonerge: "Günlük yaşamın nasıl olurdu? Hangi zorlukları yaşardın?"
    }
];

// Kelime Köprüleri Kartları
const KELIME_KOPRULERI_KARTLARI = [
    {
        id: 1,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["COŞKU", "FUTBOL", "MUTLULUK", "DEFTER", "DENİZ"]
    },
    {
        id: 2,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["TURŞU", "MUSLUK", "ZİYAFET", "KOYUN", "KİTAP"]
    },
    {
        id: 3,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["HOCA", "YAKINLIK", "ROKET", "ŞEHİR", "TAKIM"]
    },
    {
        id: 4,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["KUTU", "BALIK", "NEZAKET", "AKTÖR", "YAZ"]
    },
    {
        id: 5,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["DÜNYA", "SİHİR", "ABAKÜS", "DUVAR", "KALEM"]
    },
    {
        id: 6,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["FUTBOL", "MANTIKLI", "MASA", "AKVARYUM", "GÜZEL"]
    },
    {
        id: 7,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["KUŞ", "ŞARKICI", "LEZZETLİ", "ADA", "YOLCULUK"]
    },
    {
        id: 8,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["TURŞU", "MUSLUK", "ZİYAFET", "KOYUN", "KİTAP"]
    },
    {
        id: 9,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["ÖĞRETMEN", "SANDALYE", "ASKER", "FASÜLYE", "ÖNEMLİ"]
    },
    {
        id: 10,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["FARKLILIK", "CANLI", "ÜLKE", "ASLAN", "ORMAN"]
    },
    {
        id: 11,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["YEMEK", "PARMAK", "GAZOZ", "TELEFON", "KOVA"]
    },
    {
        id: 12,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["MÜFETTIŞ", "ETEKLERİ TUTUŞMAK", "ŞUBAT", "GÖZLÜK", "SERT"]
    },
    {
        id: 13,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["ÜLKE", "DERE", "YUMURTA", "UMUT FAKİRİN EKMEĞİDİR", "SINAV"]
    },
    {
        id: 14,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["YENİ NESİL", "OTOBÜS", "GÖZE ALMAK", "HAMAMA GİREN TERLER", "EV"]
    },
    {
        id: 15,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["ÜZÜNTÜ", "DUVAR", "HAPİSHANE", "GÖZ", "AKVARYUM"]
    },
    {
        id: 16,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["MÜFETTIŞ", "ETEKLERİ TUTUŞMAK", "ŞUBAT", "GÖZLÜK", "SERT"]
    },
    {
        id: 17,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["TECRÜBE", "AĞZI KULAKLARINDA", "GÖNÜLLÜ", "KONSER", "TATİL"]
    },
    {
        id: 18,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["OYUN", "ÖZLEMEK", "KARNE", "OKUL", "TREN"]
    },
    {
        id: 19,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["SANDALYE", "ENERJİ", "İSTEK", "MERAKLI", "KENDİNİ BEĞENMİŞ"]
    },
    {
        id: 20,
        yonerge: "Aşağıdaki 5 sözcüğü kullanarak bir anlatım yapınız.",
        kelimeler: ["DEDİKODU", "ŞANSSIZ", "DOKTOR", "MAHALLE", "YATILI"]
    }
];

/**
 * Kullanılan kartları takip etmek için değişkenler
 * Her kategoride hangi kartların kullanıldığını saklar
 */
const kullanilmisKartlar = {
    'yakistir': [],
    'tersten-konus': [],
    'birini-betimleme': [],
    'dusunce-atolyesi': [],
    'hikaye-atolyesi': [],
    'bir-anim': [],
    'hayal-atolyesi': [],
    'kelime-kopruleri': []
};

/**
 * Belirtilen kategoriden rastgele bir kart seçer
 * Daha önce kullanılmamış kartları tercih eder
 * @param {string} category - Kart kategorisi
 * @returns {Object|null} - Rastgele seçilen kart veya null
 */
function rastgeleKartSec(category) {
    let kategoriKartlari;
    
    // Kategori adını düzeltip uygun kart listesini seç
    switch(category) {
        case 'yakistir':
            kategoriKartlari = YAKISTIR_KARTLARI;
            break;
        case 'tersten-konus':
            kategoriKartlari = TERSTEN_KONUS_KARTLARI;
            break;
        case 'birini-betimleme':
            kategoriKartlari = BIRINI_BETIMLEME_KARTLARI;
            break;
        case 'dusunce-atolyesi':
            kategoriKartlari = DUSUNCE_ATOLYESI_KARTLARI;
            break;
        case 'hikaye-atolyesi':
            kategoriKartlari = HIKAYE_ATOLYESI_KARTLARI;
            break;
        case 'bir-anim':
            kategoriKartlari = BIR_ANIM_KARTLARI;
            break;
        case 'hayal-atolyesi':
            kategoriKartlari = HAYAL_ATOLYESI_KARTLARI;
            break;
        case 'kelime-kopruleri':
            kategoriKartlari = KELIME_KOPRULERI_KARTLARI;
            break;
        default:
            console.error(`Bilinmeyen kategori: ${category}`);
            return null;
    }
    
    if (!kategoriKartlari || kategoriKartlari.length === 0) {
        console.error(`"${category}" kategorisinde kart bulunamadı!`);
        return null;
    }
    
    // Kullanılmamış kartları bul
    let kullanilabilirKartlar = kategoriKartlari.filter(kart => 
        !kullanilmisKartlar[category].includes(kart.id)
    );
    
    // Eğer kategorideki tüm kartlar kullanılmışsa, kullanılan kartları sıfırla
    if (kullanilabilirKartlar.length === 0) {
        console.log(`${category} kategorisindeki tüm kartlar kullanıldı, kartlar sıfırlanıyor.`);
        kullanilmisKartlar[category] = [];
        kullanilabilirKartlar = kategoriKartlari;
    }
    
    // Kullanılabilir kartlardan rastgele bir tane seç
    const randomIndex = Math.floor(Math.random() * kullanilabilirKartlar.length);
    const secilenKart = kullanilabilirKartlar[randomIndex];
    
    // Seçilen kartı kullanılmış olarak işaretle
    kullanilmisKartlar[category].push(secilenKart.id);
    
    console.log(`${category} kategorisinden kart seçildi. ID: ${secilenKart.id}, Kullanılan kart sayısı: ${kullanilmisKartlar[category].length}/${kategoriKartlari.length}`);
    
    return secilenKart;
} 