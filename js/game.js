// Global değişkenler - DOMContentLoaded dışında tanımlıyoruz
let players = [];
let currentPlayerIndex = 0;
let previousPosition = 0; 
let diceValue = 0;
let gameStarted = false;
let waitingForActivityCompletion = false;
let gameDuration = 120; // Varsayılan süre (saniye)
let timerInterval = null;
let activityTimer;
let timerStartTime;
let timerDuration;
let diceRolled = false; // Zar atıldı mı kontrolü
let finishedPlayers = []; // Bitişe ulaşan oyuncuları tutacak dizi
let finishPosition = 18; // Bitiş pozisyonunun değeri
let waitingRoomPosition = 15; // Bekleme odası pozisyonunun değeri

// Oyun tahtasında takip edilecek gerçek ilerleme yolu
const boardPath = [
    0,  // BAŞLANGIÇ (sağ alt köşe)
    
    // ALT SIRA (sağdan sola)
    1, 2, 3, 4, 5, 6, 7,
    
    // SOL SÜTUN (aşağıdan yukarı) - gerçek değerler kullanıldı
    19, 20, 21, 22,
    
    // ÜST SIRA (soldan sağa)
    8, 9, 10, 11, 12, 13, 14, 15,
    
    // SAĞ SÜTUN (yukarıdan aşağı)
    16, 17, 18  // BİTİŞ
];

// Zorluk seviyelerine göre süre (saniye cinsinden)
const difficultyTimes = {
    'easy': 120,   // 2 dakika - Kolay
    'medium': 90,  // 1.5 dakika - Orta
    'hard': 60     // 1 dakika - Zor
};

// Oyuncu renkleri
const playerColors = [
    '#2196F3', // Mavi
    '#F44336', // Kırmızı
    '#4CAF50', // Yeşil
    '#FFC107', // Sarı
    '#9C27B0', // Mor
    '#FF5722'  // Turuncu
];

// Oyuncu simgeleri
const playerIcons = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠'];

// DOM elementleri daha sonra DOMContentLoaded içinde doldurulacak
let diceElement;
let diceBtn;
let successBtn;
let failBtn;
let activityText;
let timerElement;
let boardCells;
let playerListElement;
let playerCountSelect;
let startGameBtn;
let playerCountButtons;
let difficultyButtons;
let backBtn;
let isInitialized = false; // Sayfanın zaten başlatılıp başlatılmadığını kontrol etmek için

// Global değişkenler - kullanılmış kartları takip etmek için
let _kullanilmisYakistirKartlari = [];
let _kullanilmisTerstenKonusKartlari = [];
let _kullanilmisBiriniBetimlemeKartlari = [];
let _kullanilmisDusunceAtolyesiKartlari = [];
let _kullanilmisHikayeAtolyesiKartlari = [];
let _kullanilmisBirAnimKartlari = [];
let _kullanilmisHayalAtolyesiKartlari = [];
let _kullanilmisKelimeKopruleriKartlari = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('[DOMContentLoaded] Sayfa yüklendi.');
    
    // Oyun başlatma butonunu bul ve tıklama olayı ekle
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        console.log('[DOMContentLoaded] Oyunu başlat butonu bulundu.');
        
        // Başlat butonuna tıklama olayı ekle
        startGameBtn.addEventListener('click', function() {
            console.log('Oyunu başlat butonuna tıklandı.');
            
            // Oyuncu sayısını al
            const playerCountBtn = document.querySelector('.setup-btn[data-players].active');
            const playerCount = playerCountBtn ? parseInt(playerCountBtn.getAttribute('data-players')) : 2;
            
            // Zorluk seviyesini al
            const difficultyBtn = document.querySelector('.setup-btn[data-difficulty].active');
            const difficulty = difficultyBtn ? difficultyBtn.getAttribute('data-difficulty') : 'easy';
            
            console.log(`Oyun başlatılıyor: ${playerCount} oyuncu, zorluk: ${difficulty}`);
            
            // Oyunu başlat
            initializeGame(playerCount, difficulty);
        });
    }
    
    // Geri butonuna tıklama olayı ekle
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        console.log('[DOMContentLoaded] Geri butonu bulundu.');
        
        backBtn.addEventListener('click', function() {
            console.log('Geri butonuna tıklandı.');
            
            // Ana sayfaya yönlendir
            window.location.href = 'index.html';
        });
    }
    
    // Oyuncu sayısı butonlarına tıklama olayı ekle
    const playerCountBtns = document.querySelectorAll('.setup-btn[data-players]');
    playerCountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif sınıfını tüm butonlardan kaldır
            playerCountBtns.forEach(b => b.classList.remove('active'));
            
            // Bu butona aktif sınıfını ekle
            this.classList.add('active');
            
            console.log(`Oyuncu sayısı: ${this.getAttribute('data-players')}`);
        });
    });
    
    // Zorluk seviyesi butonlarına tıklama olayı ekle
    const difficultyBtns = document.querySelectorAll('.setup-btn[data-difficulty]');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif sınıfını tüm butonlardan kaldır
            difficultyBtns.forEach(b => b.classList.remove('active'));
            
            // Bu butona aktif sınıfını ekle
            this.classList.add('active');
            
            console.log(`Zorluk seviyesi: ${this.getAttribute('data-difficulty')}`);
        });
    });
    
    // Oyun ekranında olup olmadığımızı kontrol et
    const boardScreen = document.getElementById('board-screen');
    if (boardScreen) {
        console.log('[DOMContentLoaded] Oyun ekranı bulundu.');
        
        // Zar at düğmesi
        const rollDiceBtn = document.querySelector('#roll-dice-btn') || 
                           document.querySelector('#roll-dice') || 
                           document.querySelector('#zarAtBtn');
        
        if (rollDiceBtn) {
            console.log('[DOMContentLoaded] Zar At butonu bulundu.');
            rollDiceBtn.addEventListener('click', handleRollDice);
        }
        
        // Başarılı/Başarısız butonları
        const successBtn = document.getElementById('success-btn');
        const failBtn = document.getElementById('fail-btn');
        
        if (successBtn) {
            successBtn.addEventListener('click', handleSuccess);
        }
        
        if (failBtn) {
            failBtn.addEventListener('click', handleFail);
        }
        
        // Sırayı bitir butonu
        const endTurnBtn = document.querySelector('.sirayi-bitir');
        if (endTurnBtn) {
            endTurnBtn.addEventListener('click', endCurrentTurn);
        }
        
        // Ayarlar butonu
        const settingsBtn = document.querySelector('.settings-btn');
        if (settingsBtn) {
            console.log('[DOMContentLoaded] Ayarlar butonu bulundu.');
            settingsBtn.addEventListener('click', toggleSettings);
        }
        
        // Mesaj kutusunu kapatma
        const messageBtn = document.getElementById('message-btn');
        if (messageBtn) {
            messageBtn.addEventListener('click', function() {
                const messageElement = document.getElementById('game-message');
                if (messageElement) {
                    messageElement.style.display = 'none';
                }
            });
        }
    }
});

// Oyuncuları oluştur - inWaitingRoom özelliği eklendi
function createPlayers(playerCount) {
    console.log(`${playerCount} oyuncu oluşturuluyor...`);
    
    // Oyuncu listesini sıfırla
    players = [];
    
    // Başlangıç pozisyonu
    const startPosition = getBoardCellPositionByCategory('baslangic') || 0;
    console.log(`Başlangıç pozisyonu: ${startPosition}`);
    
    // Oyuncu listesi container'ını temizle
    const playersListContainer = document.getElementById('players-list');
    if (playersListContainer) {
        playersListContainer.innerHTML = '';
    }
    
    // Her oyuncu için
    for (let i = 0; i < playerCount; i++) {
        // Oyuncu verilerini oluştur
        const player = {
            id: i + 1,
            name: `Oyuncu ${i + 1}`,
            position: startPosition,
            previousPosition: startPosition,
            pathIndex: 0, // Başlangıçta ilerleme yolunun başında
            color: playerColors[i],
            icon: playerIcons[i] || (i + 1), // Numara veya ikon kullan
            score: 0,
            finished: false,
            inWaitingRoom: false // Bekleme odası durumu
        };
        
        // Oyuncuyu listeye ekle
        players.push(player);
        
        // Oyuncu listesi elemanı oluştur
        const playerElement = document.createElement('div');
        playerElement.classList.add('player-item');
        playerElement.setAttribute('data-player-id', player.id);
        playerElement.innerHTML = `
            <div class="player-icon" style="background-color: ${player.color}">
                ${player.icon}
            </div>
            <div class="player-name">${player.name}</div>
        `;
        
        // DOM'a ekle
        playersListContainer.appendChild(playerElement);
        
        // Oyuncu piyonunu başlangıç pozisyonuna yerleştir
        movePlayerToCell(player);
        
        console.log(`${player.name} oluşturuldu ve başlangıç pozisyonuna (${player.position}) yerleştirildi.`);
    }
    
    // İlk oyuncuyu aktif et ve vurgula
    if (players.length > 0) {
        currentPlayerIndex = 0;
        updateActivePlayerDisplay();
    }
}

// Oyuncuyu hücreye taşı - geliştirilmiş
function movePlayerToCell(player) {
    // Önce varsa eski piyonu kaldır
    const existingPiece = document.querySelector(`.player-piece[data-player-id="${player.id}"]`);
    if (existingPiece) {
        existingPiece.remove();
    }
    
    // Oyuncunun bulunduğu hücreyi bul
    const cell = document.querySelector(`.board-cell[data-position="${player.position}"]`);
    
    if (!cell) {
        console.error(`Pozisyon ${player.position} için hücre bulunamadı!`);
        return;
    }
    
    // Hücredeki mevcut piyon sayısını belirle
    const index = cell.querySelectorAll('.player-piece').length;
    
    // Piyon elementi oluştur
    const pieceElement = document.createElement('div');
    pieceElement.classList.add('player-piece');
    pieceElement.setAttribute('data-player-id', player.id);
    pieceElement.setAttribute('data-position-index', index % 6);
    pieceElement.style.backgroundColor = player.color;
    
    // İsteğe bağlı: Debug için görünür içerik ekle
    if (player.icon) {
        pieceElement.textContent = player.icon;
        pieceElement.style.display = 'flex';
        pieceElement.style.alignItems = 'center';
        pieceElement.style.justifyContent = 'center';
        pieceElement.style.fontSize = '12px';
    }
    
    // Piyonu görünür yap
    pieceElement.style.visibility = 'visible';
    pieceElement.style.opacity = '1';
    
    // Hücreye ekle
    cell.appendChild(pieceElement);
    
    console.log(`${player.name} piyonu ${player.position} pozisyonuna, indeks ${index % 6} ile taşındı.`);
}

// Aktif oyuncuyu güncelle - geliştirilmiş
function updateActivePlayerDisplay() {
    const playerNameElement = document.getElementById('active-player-name');
    const playerIconElement = document.getElementById('active-player-icon');
    
    if (!playerNameElement || !playerIconElement) {
        console.error('Oyuncu bilgi elementleri bulunamadı!');
        return;
    }
    
    const currentPlayer = players[currentPlayerIndex];
    
    // Oyuncu adını ve rengini güncelle
    playerNameElement.textContent = currentPlayer.name;
    playerIconElement.style.backgroundColor = playerColors[currentPlayerIndex];
    
    // Aktif oyuncuyu oyuncular listesinde vurgula
    document.querySelectorAll('.player-item').forEach((item, index) => {
        if (index === currentPlayerIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Oyuncuyu tahtada ilerletmek için kullanılacak fonksiyon
function movePlayerForward(player, steps) {
    // Oyuncu zaten bitişe ulaşmışsa hareket etmez
    if (finishedPlayers.some(p => p.id === player.id)) {
        console.log(`${player.name} zaten bitişe ulaştı, bekleme odasında duruyor`);
        
        // Bekleme odasına yerleştir
        player.position = waitingRoomPosition;
        player.pathIndex = boardPath.indexOf(waitingRoomPosition);
        movePlayerToCell(player);
        
        showNotification(`${player.name} yarışı tamamladı, bekleme odasında duruyor!`, 'info');
        return player.position;
    }
    
    // Oyuncu pozisyonunu ilerleme yolundaki indeks olarak saklıyoruz
    const currentPathIndex = player.pathIndex || 0;
    
    // Önceki gerçek pozisyonu kaydet
    player.previousPosition = boardPath[currentPathIndex];
    
    // Yeni indeksi hesapla (bitiş pozisyonunu geçerse bitişte kal)
    let newPathIndex = currentPathIndex + steps;
    const finishPathIndex = boardPath.indexOf(finishPosition);
    
    // Bitiş pozisyonunu geçip geçmediğini kontrol et
    if (newPathIndex >= boardPath.length || 
        (finishPathIndex !== -1 && newPathIndex >= finishPathIndex)) {
        newPathIndex = finishPathIndex;
        
        // Bitişe yeni ulaştıysa ve daha önce eklenmemişse
        if (!finishedPlayers.some(p => p.id === player.id)) {
            // Oyuncuyu bitirenlere ekle
            finishedPlayers.push({
                id: player.id,
                name: player.name,
                rank: finishedPlayers.length + 1 // Sıralama (1., 2., 3. vb.)
            });
            
            // Tebrik mesajı göster
            const rankText = ['Birinci', 'İkinci', 'Üçüncü', 'Dördüncü', 'Beşinci', 'Altıncı'];
            const rank = finishedPlayers.length;
            showFinishMessage(player.name, rankText[rank - 1] || `${rank}.`);
            
            // Önce bitiş pozisyonuna getir
            player.pathIndex = newPathIndex;
            player.position = boardPath[newPathIndex];
            movePlayerToCell(player);
            
            // Tüm oyuncular için bildirim göster
            showNotification(`🏆 ${player.name} yarışı ${rankText[rank - 1] || `${rank}.`} olarak tamamladı!`, 'success', 5000);
            
            // Bitiren oyuncuyu bekleme odasına taşı
            setTimeout(() => {
                // Bekleme odasına geçişi yap
                player.position = waitingRoomPosition;
                player.pathIndex = boardPath.indexOf(waitingRoomPosition);
                
                // Oyuncuyu bekleme odasına taşı
                movePlayerToCell(player);
                console.log(`${player.name} yarışı bitirdi ve bekleme odasına taşındı.`);
                
                // Yeni bildirim göster
                showNotification(`${player.name} bekleme odasına taşındı`, 'info');
            }, 3000); // 3 saniye sonra bekleme odasına taşı
            
            // Oyun durumunu kontrol et
            checkGameStatus();
            
            // Bitiş pozisyonunu döndür (henüz bekleme odasına geçmedi)
            return boardPath[newPathIndex];
        }
    }
    
    // Yeni indeksi ve pozisyonu güncelle
    player.pathIndex = newPathIndex;
    player.position = boardPath[newPathIndex];
    
    console.log(`${player.name} ilerliyor: İndeks ${currentPathIndex} -> ${newPathIndex}, Pozisyon ${player.previousPosition} -> ${player.position}`);
    
    return player.position;
}

// Kategori ismine göre tahta hücresinin pozisyon değerini bul
function getBoardCellPositionByCategory(category) {
    const cell = document.querySelector(`.board-cell[data-category="${category}"]`);
    if (cell) {
        return parseInt(cell.getAttribute('data-position'));
    }
    return -1;
}

// Bitişe ulaşan oyuncular için tebrik mesajı göster
function showFinishMessage(playerName, rank) {
    // Başarılı bildirimi göster
    const notification = showNotification(
        `<strong>${playerName}</strong>, yarışı <strong style="color: #2196F3;">${rank}</strong> olarak tamamladın!`,
        'success',
        6000
    );
    
    // Bildirime ek içerik ekle
    if (notification) {
        const msgContent = notification.querySelector('div[style*="flex: 1"]');
        if (msgContent) {
            // Bekleme mesajını ekle
            const waitingMsg = document.createElement('p');
            waitingMsg.style.marginTop = '8px';
            waitingMsg.style.fontSize = '12px';
            waitingMsg.style.color = '#666';
            waitingMsg.style.fontStyle = 'italic';
            waitingMsg.innerHTML = 'Diğer oyuncular yarışı tamamlayana kadar bekleme odasında bekleyeceksin.';
            msgContent.appendChild(waitingMsg);
            
            // Bayrak ikonu ekle
            const iconEl = notification.querySelector('div[style*="margin-right: 12px"]');
            if (iconEl) {
                iconEl.innerHTML = '<i class="fas fa-flag-checkered" style="color: #4CAF50;"></i>';
            }
        }
    }
    
    // Ses efekti
    if (typeof playSound === 'function' && isSoundEnabled) {
        playSound('finish');
    }
}

// Oyunu başlat - ilk oyuncu görünürlüğü için düzeltildi
function initializeGame(playerCount, difficulty = "easy") {
    console.log(`Oyun ${playerCount} oyuncu ile başlatılıyor, zorluk: ${difficulty}...`);
    
    // Zorluk seviyesine göre süreyi belirle (eğer daha önce belirlenmemişse)
    if (difficulty) {
        gameDuration = difficultyTimes[difficulty] || 120;
        console.log(`Zorluk seviyesi "${difficulty}" için süre: ${gameDuration} saniye`);
    }
    
    // Bitmiş oyuncular ve oyun sonu değişkenlerini sıfırla
    finishedPlayers = [];
    
    // Oyun değişkenlerini sıfırla
    currentPlayerIndex = 0;
    gameStarted = true;
    waitingForActivityCompletion = false;
    
    // Zamanlayıcıyı temizle
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Kullanılmış kartları sıfırla
    sifirlaKullanilmisKartlar();
    
    // Zar atma butonunu yeniden tanımla
    const rollDiceBtn = document.querySelector('#roll-dice-btn') || 
                       document.querySelector('#roll-dice') || 
                       document.querySelector('#zarAtBtn');
    
    if (rollDiceBtn) {
        // Önceki olay dinleyicilerini temizle
        rollDiceBtn.replaceWith(rollDiceBtn.cloneNode(true));
        // Yeni olay dinleyicisi ekle
        document.querySelector('#roll-dice-btn') || 
        document.querySelector('#roll-dice') || 
        document.querySelector('#zarAtBtn').addEventListener('click', handleRollDice);
    }
    
    // Ekran geçişlerini kontrol et
    const setupScreen = document.querySelector('#setup-screen');
    const boardScreen = document.querySelector('#board-screen');
    
    // Eğer her iki ekran da varsa, ekran geçişini yap
    if (setupScreen && boardScreen) {
        console.log('Ayarlar ekranından oyun ekranına geçiş yapılıyor...');
        
        // Aktif sınıflarını değiştir
        setupScreen.classList.remove('active');
        boardScreen.classList.add('active');
    } else {
        console.log('Ekran geçişi için gerekli elementler bulunamadı!');
    }
    
    // Oyuncuları oluştur
    createPlayers(playerCount);
    
    // İlk oyuncuyu vurgula
    updateActivePlayerDisplay();
    
    // DOM güncellemesi için kısa bir gecikme ver
    setTimeout(() => {
        // Tüm oyuncuların görünür olduğunu kontrol et
        players.forEach(player => {
            // Oyuncu piyonunu kontrol et, yoksa yeniden yerleştir
            const existingPiece = document.querySelector(`.player-piece[data-player-id="${player.id}"]`);
            if (!existingPiece) {
                console.log(`${player.name} piyonu bulunamadı, yeniden yerleştiriliyor...`);
                movePlayerToCell(player);
            }
        });
        
        // Oyun başlangıç bildirimi göster
        showNotification('Oyun başladı! Sıra ilk oyuncuda.', 'success');
    }, 100);
    
    console.log('Oyun başlatıldı!');
}

// Zar atma fonksiyonu - iyileştirilmiş ve her iki zarın da güncellendiğinden emin olacak şekilde düzeltildi
function handleRollDice() {
    // İptal edildiğini işaretlemek için statik bir bayrak ekle
    if (handleRollDice.isProcessing) {
        console.warn('Zar atma işlemi zaten devam ediyor!');
        return;
    }
    
    // İptal bayrağını ayarla
    handleRollDice.isProcessing = true;
    
    // 1 saniye sonra kilidi kaldır (güvenlik için)
    setTimeout(() => {
        handleRollDice.isProcessing = false;
    }, 1000);
    
    if (!gameStarted) {
        console.warn('Oyun henüz başlamadı!');
        handleRollDice.isProcessing = false;
        return;
    }
    
    if (waitingForActivityCompletion) {
        console.warn('Aktif bir etkinlik var, lütfen önce tamamlayın!');
        showNotification('Lütfen önce mevcut etkinliği tamamlayın!', 'warning');
        handleRollDice.isProcessing = false;
        return;
    }
    
    // Oyuncu bitişe ulaşmış olamaz çünkü switchToNextPlayer zaten bitmiş oyuncuları atlıyor
    const currentPlayer = players[currentPlayerIndex];
    
    // Aynı turda ikinci kez zar atılmasını engelle
    if (diceRolled) {
        console.warn('Bu turda zaten zar attınız!');
        showNotification('Bu turda zaten zar attınız!', 'warning');
        handleRollDice.isProcessing = false;
        return;
    }
    
    // Bekleme odasında bir tur geçiren oyuncuyu kontrol et
    if (currentPlayer.inWaitingRoom) {
        // Bekleme odasında bir tur geçirdi, normale döndür
        currentPlayer.inWaitingRoom = false;
        console.log(`${currentPlayer.name} bekleme odasında bir tur geçirdi ve şimdi oyuna devam ediyor.`);
        showNotification(`${currentPlayer.name} bekleme odasından çıktı, şimdi zar atabilir.`, 'info');
    }

    // Zarı at ve değeri kaydet
    diceValue = rollDice();
    
    // Animasyon tamamlandıktan sonra oyuncuyu ilerlet ve etkinliği göster
    setTimeout(() => {
        diceRolled = true;
        
        // Hareketleri işle
        console.log(`${currentPlayer.name} ${diceValue} attı. İlerliyor...`);
        
        // Oyuncuyu ilerlet
        const newPosition = movePlayerForward(currentPlayer, diceValue);

        // Piyonu tahtada fiziksel olarak hareket ettir
        movePlayerToCell(currentPlayer);
        
        console.log(`${currentPlayer.name} şu pozisyona ilerledi: ${newPosition}`);
        
        // Etkinliği göster ve zamanlayıcıyı başlat
        const cell = document.querySelector(`.board-cell[data-position="${newPosition}"]`);
        
        if (cell) {
            // Etkinlik kategorisini al
            const category = cell.getAttribute('data-category');
            
            // Bekleme odası kontrolü
            if (category === 'bekleme-odasi') {
                console.log(`${currentPlayer.name} bekleme odasına geldi, bir tur bekleyecek.`);
                showNotification(`${currentPlayer.name} bekleme odasına geldi, bir tur bekleyecek.`, 'info');
                
                // Oyuncunun bekleme odasında olduğunu işaretle
                currentPlayer.inWaitingRoom = true;
                
                // Kısa bir beklemeyle sıradaki oyuncuya geç
                setTimeout(() => {
                    switchToNextPlayer();
                }, 1500);
            }
            // Bitiş veya başlangıç kontrolü
            else if (category === 'bitis' || category === 'baslangic') {
                console.log(`${category.toUpperCase()} alanına geldiniz. Bekleme yok.`);
                showNotification(`${currentPlayer.name} ${category} alanına geldi`, 'info');
                
                // Bitişe gelen oyuncunun durumunu kontrol et
                if (category === 'bitis') {
                    checkGameStatus();
                }
                
                // Kısa bir beklemeyle sıradaki oyuncuya geç
                setTimeout(() => {
                    switchToNextPlayer();
                }, 1500);
            } else {
                // Normal bir etkinliğe geldiyse, etkinliği göster ve zamanlayıcıyı başlat
                console.log(`Kategori: ${category}`);
                showActivity(category);
            }
        } else {
            console.error(`Hücre bulunamadı: ${newPosition}`);
            // Hata durumunda sıradaki oyuncuya geç
            switchToNextPlayer();
        }
        
        // İşlemin tamamlandığını göster
        handleRollDice.isProcessing = false;
    }, 600); // Animasyon süresinden biraz daha uzun olmalı
}

// Statik bayrağı başlat
handleRollDice.isProcessing = false;

// Zar görselini güncelle - basitleştirilmiş versiyon
function updateDiceVisual(value) {
    // Basit zarı güncelle
    const diceElement = document.querySelector('.zar-section #dice');
    
    if (!diceElement) {
        console.error('Zar elementi bulunamadı!');
        return;
    }
    
    // Değerin geçerli olduğunu kontrol et (1-6 arası)
    if (value < 1 || value > 6) {
        console.error('Geçersiz zar değeri:', value);
        value = Math.floor(Math.random() * 6) + 1;
    }
    
    // Animasyon sınıfını ekle
    diceElement.classList.add('rolling');
    
    // Animasyon bitiminde yeni değeri göster
    setTimeout(() => {
        // Animasyon sınıfını kaldır
        diceElement.classList.remove('rolling');
        
        // Yeni zar değerini ayarla
        diceElement.setAttribute('data-value', value);
    }, 600); // Animasyon süresini 0.6 saniye olarak güncelledik
}

// Zar at - Sadece zar atma mantığını içeren fonksiyon
function rollDice() {
    // Zar değerini rastgele belirle (1-6 arası)
    const value = Math.floor(Math.random() * 6) + 1;
    console.log(`Zar atıldı: ${value}`);
    
    // Zar görselini animasyonlu şekilde güncelle
    updateDiceVisual(value);
    
    return value;
}

// Etkinliği göster
function showActivity(category) {
    const activityTitleElement = document.getElementById('activity-title');
    const activityTextElement = document.getElementById('activity-text');
    const activityIcon = document.getElementById('activity-icon');
    const activityInfo = document.getElementById('activity-info');
    const activityImageContainer = document.getElementById('activity-image-container');
    const activityImage = document.getElementById('activity-image');
    
    // Kategori data-attribute'unu ayarla
    activityInfo.setAttribute('data-category', category);
    
    // Kategori ikonunu ve rengini ayarla
    activityIcon.className = 'activity-icon ' + getCategoryColorClass(category);
    activityIcon.innerHTML = '<i class="' + getCategoryIcon(category) + '"></i>';
    
    // Kategori başlığını ayarla
    activityTitleElement.textContent = getCategoryTitle(category);
    
    // Etkinlik beklemesi için bayrağı ayarla
    waitingForActivityCompletion = true;
    
    // Rastgele bir kart seç
    let selectedCard = null;
    if (category === 'birini-betimleme') {
        selectedCard = rastgeleKartSec('birini-betimleme');
        // Görsel içeren kategori
        if (selectedCard && selectedCard.image) {
            activityImageContainer.style.display = 'block';
            activityImage.src = selectedCard.image;
            activityTextElement.textContent = selectedCard.yonerge || "Bu görseldeki kişiyi betimleyin.";
        }
    } else if (category === 'hikaye-atolyesi') {
        selectedCard = rastgeleKartSec('hikaye-atolyesi');
        // Görsel içeren kategori
        if (selectedCard && selectedCard.image) {
            activityImageContainer.style.display = 'block';
            activityImage.src = selectedCard.image;
            activityTextElement.textContent = selectedCard.yonerge || "Bu görsel üzerinden bir hikaye oluşturun.";
        }
    } else if (category === 'yakistir') {
        selectedCard = rastgeleKartSec('yakistir');
        activityImageContainer.style.display = 'none';
        activityTextElement.innerHTML = `<strong>${selectedCard.harf} Harfi</strong><br>`;
        selectedCard.sorular.forEach(soru => {
            activityTextElement.innerHTML += `${soru}<br>`;
        });
    } else if (category === 'tersten-konus') {
        selectedCard = rastgeleKartSec('tersten-konus');
        activityImageContainer.style.display = 'none';
        let cumlelerHTML = "<ul style='list-style-type: none; padding-left: 0;'>";
        // Sadece ilk cümleyi göster, tersten karşılığını gösterme
        cumlelerHTML += `<li>${selectedCard.cumleler[0]}</li>`;
        cumlelerHTML += "</ul>";
        activityTextElement.innerHTML = cumlelerHTML;
    } else if (category === 'dusunce-atolyesi') {
        selectedCard = rastgeleKartSec('dusunce-atolyesi');
        activityImageContainer.style.display = 'none';
        activityTextElement.textContent = selectedCard.konu;
    } else if (category === 'bir-anim') {
        selectedCard = rastgeleKartSec('bir-anim');
        activityImageContainer.style.display = 'none';
        activityTextElement.textContent = selectedCard.konu;
    } else if (category === 'hayal-atolyesi') {
        selectedCard = rastgeleKartSec('hayal-atolyesi');
        activityImageContainer.style.display = 'none';
        activityTextElement.textContent = selectedCard.konu;
    } else if (category === 'kelime-kopruleri') {
        selectedCard = rastgeleKartSec('kelime-kopruleri');
        activityImageContainer.style.display = 'none';
        activityTextElement.innerHTML = selectedCard.kelimeler.join(" - ");
    } else {
        // Geçerli bir kategori değilse
        activityImageContainer.style.display = 'none';
        activityTextElement.textContent = "Zar atarak bir etkinlik seçin.";
    }
    
    // Etkinlik butonlarını aktifleştir
    document.getElementById('success-btn').disabled = false;
    document.getElementById('fail-btn').disabled = false;
    
    // Süreyi başlat - varsayılan değer 30 saniye
    startTimer(gameDuration);
}

// Kategori için ikon sınıfını al
function getCategoryIcon(category) {
    const iconMap = {
        'tersten-konus': 'fa-comments',
        'birini-betimleme': 'fa-user-friends',
        'dusunce-atolyesi': 'fa-brain',
        'hikaye-atolyesi': 'fa-book',
        'bir-anim': 'fa-memory',
        'yakistir': 'fa-star',
        'hayal-atolyesi': 'fa-palette',
        'kelime-kopruleri': 'fa-link',
        'bekleme-odasi': 'fa-hourglass-half',
        'baslangic': 'fa-flag',
        'bitis': 'fa-trophy'
    };
    
    return iconMap[category] || 'fa-tasks';
}

// Kategori için renk sınıfını al
function getCategoryColorClass(category) {
    const colorMap = {
        'tersten-konus': 'blue-bg',
        'birini-betimleme': 'green-bg',
        'dusunce-atolyesi': 'purple-bg',
        'hikaye-atolyesi': 'teal-bg',
        'bir-anim': 'cyan-bg',
        'yakistir': 'indigo-bg',
        'hayal-atolyesi': 'orange-bg',
        'kelime-kopruleri': 'violet-bg',
        'bekleme-odasi': 'grey-bg',
        'baslangic': 'primary-bg',
        'bitis': 'success-bg'
    };
    
    return colorMap[category] || '';
}

// Kategori yönergelerini ve örneklerini al
function getCategoryInstructions(category) {
    const categoryMap = {
        'tersten-konus': {
            instructions: [
                "Kartta yazan cümleleri sondan başa doğru söylemeye çalışın.",
                "Her kelimeyi düzgün telaffuz etmeye özen gösterin.",
                "Süre boyunca mümkün olduğunca çok cümleyi tersten söylemeye çalışın."
            ],
            example: "Normal: 'Bugün hava çok güzel' → Tersten: 'güzel çok hava Bugün'"
        },
        'birini-betimleme': {
            instructions: [
                "Kartta göreceğiniz görseli detaylı bir şekilde betimleyin.",
                "Görsel hakkında fiziksel özellikler, duygular ve hikaye oluşturun.",
                "Anlatımınızı zenginleştirmek için hayal gücünüzü kullanın."
            ],
            example: "Bu görselde gördüğüm kişi, doğa içinde huzurlu bir anını yaşıyor gibi görünüyor..."
        },
        'dusunce-atolyesi': {
            instructions: [
                "Verilen küplerden 2 tanesini alıp atın.",
                "Gelen simgeleri birleştirerek kum saati süresince bir anlatım yapın.",
                "Anlatımınızda kendi düşüncelerinizi ve fikirlerinizi paylaşın."
            ],
            example: "Küplerde 'Kitap' ve 'Arkadaşlık' çıkarsa, kitapların arkadaşlık ilişkilerine etkisi üzerine düşüncelerinizi anlatabilirsiniz."
        },
        'hikaye-atolyesi': {
            instructions: [
                "Çektiğiniz karttaki görselden esinlenerek bir hikaye anlatın.",
                "Hikaye unsurlarını (yer, zaman, kişi, olay) kullanın.",
                "Anlatımınızda yaratıcı ve özgün olmaya çalışın."
            ],
            example: "Bu görselde gördüğüm manzara bana bir yolculuk hikayesi ilham veriyor..."
        },
        'bir-anim': {
            instructions: [
                "Kum saati süresince sizi etkileyen bir anınızı anlatın.",
                "Anınızın size ne hissettirdiğini ve neden önemli olduğunu açıklayın.",
                "Anınızı kronolojik ve anlaşılır bir şekilde anlatmaya özen gösterin."
            ],
            example: "İlkokuldayken katıldığım bir yarışma sırasında yaşadığım heyecan ve başarı anım..."
        },
        'yakistir': {
            instructions: [
                "Seçtiğiniz kartı bir arkadaşınıza verin.",
                "Karttaki 10 soruyu arkadaşınız size soracak.",
                "Tüm sorulara kartta yazan harfle başlayan yanıtlar vermelisiniz."
            ],
            example: "Eğer kart 'K' harfi ise ve 'En sevdiğin renk?' sorusu sorulursa, 'Kırmızı' gibi K ile başlayan bir yanıt vermelisiniz."
        },
        'hayal-atolyesi': {
            instructions: [
                "Çektiğiniz karttaki yönergelere göre kum saati boyunca bir anlatım yapın.",
                "Anlatımınızda hayal unsurları kullanın (efsane, masal vb.).",
                "İfadenizi zenginleştirmek için seslenişler ve betimlemeler kullanın."
            ],
            example: "Uçan bir adada yaşayan insanların hayatlarını veya konuşan hayvanların dünyasını anlatan bir anlatım..."
        },
        'kelime-kopruleri': {
            instructions: [
                "Seçtiğiniz karttaki 5 sözcüğün arasında mantıklı bir bağlantı kurun.",
                "Bu sözcükleri kullanarak anlamlı bir anlatım yapın.",
                "Sözcükler arasında geçişler akıcı ve doğal olmalıdır."
            ],
            example: "Deniz, kitap, gitar, yağmur, pencere sözcüklerini kullanarak: 'Deniz kenarında kitap okurken, pencereden giren yağmur sesiyle birlikte gitarımı çalmaya başladım...'"
        },
        'bekleme-odasi': {
            instructions: [
                "Bekleme odasına gelen oyuncu bir tur bekleyecektir.",
                "Bu süre içinde diğer oyuncuların etkinliklerini izleyin.",
                "Sıradaki turda oyuna devam edeceksiniz."
            ],
            example: "Bekleme odasındasınız, bir sonraki turunuzu bekleyin."
        },
        'baslangic': {
            instructions: [
                "Oyuna başlıyorsunuz! Zar atarak ilerleyin.",
                "Geldiğiniz alanlardaki etkinlikleri tamamlamaya çalışın.",
                "Bitiş noktasına ilk ulaşan oyuncu kazanır."
            ],
            example: ""
        },
        'bitis': {
            instructions: [
                "Tebrikler! Bitiş noktasına ulaştınız.",
                "Oyun boyunca gösterdiğiniz performansı değerlendirin.",
                "Yeni bir oyun için hazırlıklı olun."
            ],
            example: ""
        }
    };
    
    return categoryMap[category] || { instructions: [], example: "" };
}

// Etkinliği tamamla
function completeActivity() {
    // Etkinlik bekleme durumunu kapat
    waitingForActivityCompletion = false;
    
    // Başarılı/Başarısız butonlarını devre dışı bırak
    if (successBtn) {
        successBtn.disabled = true;
    }
    if (failBtn) {
        failBtn.disabled = true;
    }
    
    // Zamanlayıcıyı durdur
    clearInterval(timerInterval);
    
    // Sırayı sonraki oyuncuya geçir
    switchToNextPlayer();
    
    // Etkinlik bilgilerini temizle
    resetActivityDisplay();
}

// Etkinlik görüntüsünü sıfırla
function resetActivityDisplay() {
    // Başlık ve açıklama sıfırla
    const activityTitleElement = document.querySelector('#activity-title');
    if (activityTitleElement) {
        activityTitleElement.textContent = '-';
    }
    
    // İkonu sıfırla
    const activityIconElement = document.querySelector('#activity-icon i');
    if (activityIconElement) {
        // Eski sınıfları kaldır
        activityIconElement.className = '';
        // Varsayılan ikonu koy
        activityIconElement.classList.add('fas', 'fa-tasks');
    }
    
    // İkon container rengini sıfırla
    const activityIconContainer = document.querySelector('#activity-icon');
    if (activityIconContainer) {
        activityIconContainer.className = 'activity-icon';
    }
    
    const activityTextElement = document.querySelector('#activity-text');
    if (activityTextElement) {
        activityTextElement.textContent = 'Zar atarak oyuna başlayın.';
    }
    
    // Yönergeleri ve örneği gizle
    const instructionsElement = document.querySelector('#activity-instructions');
    if (instructionsElement) {
        instructionsElement.style.display = 'none';
    }
    
    const exampleElement = document.querySelector('#activity-example');
    if (exampleElement) {
        exampleElement.style.display = 'none';
    }
    
    // Zamanlayıcıyı sıfırla
    const timerProgressElement = document.querySelector('#timer-progress');
    if (timerProgressElement) {
        timerProgressElement.style.width = '100%';
    }
    
    const timerTextElement = document.querySelector('#timer-text');
    if (timerTextElement) {
        timerTextElement.textContent = '30 s';
    }
    
    console.log('Etkinlik ekranı sıfırlandı');
}

// Zamanlayıcıyı başlat
function startTimer(duration = 30) {
    const timerTextElement = document.getElementById('timer-text');
    const timerProgressElement = document.getElementById('timer-progress');
    const timerElement = document.querySelector('.activity-timer');
    
    // Timer'ı sıfırla
    clearInterval(timerInterval);
    
    // Timer başlangıç durumunu ayarla
    remainingTime = duration;
    timerTextElement.textContent = `${remainingTime} s`;
    timerProgressElement.style.width = '100%';
    
    // Uyarı sınıflarını temizle
    timerElement.classList.remove('timer-warning', 'timer-danger');
    
    // Timer'ı başlat - daha pürüzsüz geçiş için 100ms kullanıyoruz
    timerInterval = setInterval(updateTimer, 100);
    
    // Son güncelleme zamanı
    let lastUpdateTime = Date.now();
    let lastSecond = remainingTime;
    
    function updateTimer() {
        // Geçen zamanı hesapla (saniyenin onda biri hassasiyetle)
        const now = Date.now();
        const elapsed = (now - lastUpdateTime) / 1000;
        lastUpdateTime = now;
        
        // Kalan süreyi azalt
        remainingTime -= elapsed;
        
        if (remainingTime <= 0) {
            // Süre bitti, zamanlayıcıyı durdur
            remainingTime = 0;
            clearInterval(timerInterval);
            
            // Etkinliği zaman aşımı nedeniyle bitir
            handleTimeOut();
            return;
        }
        
        // Eğer saniyelik değişim olduysa metni güncelle
        const currentSecond = Math.ceil(remainingTime);
        if (currentSecond !== lastSecond) {
            timerTextElement.textContent = `${currentSecond} s`;
            lastSecond = currentSecond;
            
            // Ses efekti - son 5 saniyede tik sesi çal
            if (currentSecond <= 5 && isSoundEnabled) {
                playSound('tick');
            }
        }
        
        // Timer ilerleme çubuğunu güncelle
        const percentage = (remainingTime / duration) * 100;
        timerProgressElement.style.width = `${percentage}%`;
        
        // Süre azaldıkça uyarı sınıflarını ekle
        if (remainingTime <= 10 && remainingTime > 5) {
            timerElement.classList.add('timer-warning');
            timerElement.classList.remove('timer-danger');
        } else if (remainingTime <= 5) {
            timerElement.classList.remove('timer-warning');
            timerElement.classList.add('timer-danger');
        }
    }
}

// Başarılı durumu
function handleSuccess() {
    if (!gameStarted || !waitingForActivityCompletion) return;
    
    const activePlayer = players[currentPlayerIndex];
    console.log(`${activePlayer.name} etkinliği başarıyla tamamladı!`);
    console.log(`Oyuncu ${activePlayer.name} yeni pozisyonda kalacak: ${activePlayer.position}`);
    
    // Zamanlayıcıyı durdur
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Zar atıldı değişkenini sıfırla
    diceRolled = false;
    
    // Etkinliği tamamla ve sonraki oyuncuya geç
    completeActivity();
    
    // Oyun durumunu kontrol et
    checkGameStatus();
}

// Başarısız durumu - özel ilerleme sistemi için güncellendi
function handleFail() {
    if (!gameStarted || !waitingForActivityCompletion) return;
    
    const activePlayer = players[currentPlayerIndex];
    console.log(`${activePlayer.name} etkinliği başarısız oldu!`);
    
    // Zamanlayıcıyı durdur
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Oyuncuyu eski pozisyonuna geri döndür
    const previousPosition = activePlayer.previousPosition;
    console.log(`Oyuncu ${activePlayer.name} eski pozisyona geri dönecek: ${previousPosition}`);
    
    // pathIndex değerini de güncellemeliyiz
    const previousPathIndex = boardPath.indexOf(previousPosition);
    if (previousPathIndex !== -1) {
        activePlayer.pathIndex = previousPathIndex;
    }
    
    activePlayer.position = previousPosition;
    
    // DOM'da piyonu taşı
    movePlayerToCell(activePlayer);
    
    // Zar atıldı değişkenini sıfırla
    diceRolled = false;
    
    // Etkinliği tamamla ve sonraki oyuncuya geç
    completeActivity();
    
    // Oyun durumunu kontrol et
    checkGameStatus();
}

// Zaman dolduğunda
function handleTimeOut() {
    if (!gameStarted) return;
    
    const activePlayer = players[currentPlayerIndex];
    console.log(`Süre doldu! ${activePlayer.name} etkinliği başarısız oldu.`);
    
    // Oyuncuyu eski pozisyonuna geri döndür
    const previousPosition = activePlayer.previousPosition;
    console.log(`Oyuncu ${activePlayer.name} süre dolduğu için eski pozisyona geri dönecek: ${previousPosition}`);
    
    // pathIndex değerini de güncellemeliyiz
    const previousPathIndex = boardPath.indexOf(previousPosition);
    if (previousPathIndex !== -1) {
        activePlayer.pathIndex = previousPathIndex;
    }
    
    activePlayer.position = previousPosition;
    
    // DOM'da piyonu taşı
    movePlayerToCell(activePlayer);
    
    // Etkinliği tamamla ve sonraki oyuncuya geç
    completeActivity();
    
    // Bildirim göster
    showNotification('Süre doldu! Etkinlik başarısız.', 'error');
    
    // Oyun durumunu kontrol et
    checkGameStatus();
}

// Sıradaki oyuncuya geç
function switchToNextPlayer() {
    if (waitingForActivityCompletion) {
        console.warn('Etkinlik devam ediyor, sıra değiştirilemez!');
        return;
    }
    
    // Zar atıldı durumunu sıfırla
    diceRolled = false;

    // Bir sonraki oyuncuya geç, bitmiş oyuncuları atla
    let nextPlayerIndex = currentPlayerIndex;
    let loopCount = 0;
    
    do {
        // Bir sonraki oyuncuya geç
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        
        // Sonsuz döngü kontrolü
        loopCount++;
        if (loopCount > players.length) {
            console.warn('Tüm oyuncular bitmiş, döngüden çıkılıyor.');
            checkGameStatus(); // Son bir kez oyun durumunu kontrol et
            return;
        }
        
        // Eğer oyuncu bitmiş değilse döngüden çık
    } while (finishedPlayers.some(p => p.id === players[nextPlayerIndex].id));
    
    // Sıradaki oyuncuyu ayarla
    currentPlayerIndex = nextPlayerIndex;
    
    // Bekleme odasındaki oyuncuyu bilgilendir
    const nextPlayer = players[currentPlayerIndex];
    if (nextPlayer.inWaitingRoom) {
        console.log(`${nextPlayer.name} bekleme odasında, bir tur bekleyecek.`);
        showNotification(`${nextPlayer.name} bekleme odasında, bir tur bekleyecek.`, 'info');
    }
    
    // Yeni aktif oyuncuyu görsel olarak güncelle
    updateActivePlayerDisplay();
    
    // Aktivite gösterimini sıfırla
    resetActivityDisplay();
    
    const activePlayer = players[currentPlayerIndex];
    console.log(`Sıra ${activePlayer.name}'de`);
    showNotification(`Sıra ${activePlayer.name}'de`, 'info');
}

// Oyun bitiminde gösterilecek sıralama ekranı
function showGameEndScreen(rankings) {
    const modal = document.getElementById('game-end-modal');
    const list = document.getElementById('game-ranking-list');
    const endText = document.getElementById('game-end-text');
    const modalTitle = modal.querySelector('.modal-header h2');
    const closeBtn = modal.querySelector('.close-btn');
    
    if (!modal || !list || !endText) {
        console.error('Oyun sonu ekranı elementleri bulunamadı!');
        return;
    }
    
    // Liste içeriğini temizle
    list.innerHTML = '';
    
    // Kazanan oyuncuyu belirle
    const winner = rankings[0];
    
    // Başlık ve açıklama metnini güncelle
    modalTitle.innerHTML = '🎉 Oyun Bitti!';
    endText.innerHTML = `Tebrikler! <strong>${winner.name}</strong> oyunu kazandı.`;
    
    // Oyuncuları sıralamaya ekle
    rankings.forEach((player, index) => {
        const li = document.createElement('li');
        // Sıralama metni
        const rankText = ['Birinci', 'İkinci', 'Üçüncü', 'Dördüncü', 'Beşinci', 'Altıncı'];
        
        if (index === 0) {
            // Birinci oyuncu için özel format (emojisi yukarıda ekleniyor)
            li.textContent = `${player.name} - ${rankText[index]}`;
        } else {
            // Diğer oyuncular için format
            li.textContent = `${index + 1}. ${player.name} - ${rankText[index] || (index + 1) + '.'}`;
        }
        
        list.appendChild(li);
    });
    
    // Butonların işlevselliğini ekle
    const homeBtn = document.getElementById('end-home-btn');
    const newGameBtn = document.getElementById('end-new-game-btn');
    
    if (homeBtn) {
        homeBtn.onclick = function() {
            window.location.href = 'index.html';
        };
    }
    
    if (newGameBtn) {
        newGameBtn.onclick = function() {
            // Kurulum ekranına dön ve yeni oyun için hazırla
            modal.classList.remove('active');
            
            const setupScreen = document.querySelector('#setup-screen');
            const boardScreen = document.querySelector('#board-screen');
            
            if (setupScreen && boardScreen) {
                // Aktif sınıfları değiştirerek kurulum ekranına geri dön
                boardScreen.classList.remove('active');
                setupScreen.classList.add('active');
                
                // Oyun değişkenlerini sıfırla
                gameStarted = false;
                finishedPlayers = [];
                players = [];
                currentPlayerIndex = 0;
                waitingForActivityCompletion = false;
                
                // Sıfırlayıcı fonksiyonları çağır
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
                
                // Kullanılmış kartları sıfırla
                sifirlaKullanilmisKartlar();
                
                console.log('Oyun sıfırlandı ve kurulum ekranına dönüldü.');
                showNotification('Yeni oyun için hazır!', 'success');
            } else {
                // Kurulum ekranı yoksa sayfayı yenile
                window.location.reload();
            }
        };
    }
    
    // Kapatma düğmesinin işlevselliğini ekle
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.classList.remove('active');
        };
    }
    
    // Ekranı göster
    modal.classList.add('active');
    
    // Ses efekti çal (eğer varsa)
    if (typeof playSound === 'function' && isSoundEnabled) {
        playSound('win');
    }
    
    console.log('Oyun sonu ekranı gösteriliyor...');
    return modal;
}

// Kazanan oyuncuyu göster
function showWinnerMessage(winner, allWinners) {
    console.log('Oyun sonu gösteriliyor... Kazanan:', winner.name);
    
    // Yeni tasarıma göre sıralama ekranını göster
    showGameEndScreen(allWinners);
    
    // Oyun bittiğini bildiren küçük bir bildirim göster
    showNotification('Oyun tamamlandı! 🏆', 'success', 5000);
}

// Oyun durumunu kontrol et
function checkGameStatus() {
    // Eğer tüm oyuncular bitişe ulaştıysa oyun biter
    if (finishedPlayers.length === players.length) {
        console.log('Oyun tamamlandı! Tüm oyuncular bitişe ulaştı.');
        
        // Zamanlayıcıyı durdur
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Etkinliği bekleyen durum varsa temizle
        waitingForActivityCompletion = false;
        
        // Kazanan oyuncuları sırala
        const winners = [...finishedPlayers].sort((a, b) => a.rank - b.rank);
        
        // Sonuçları göstermeden önce tüm oyuncuları bekleme odasına taşı
        players.forEach(player => {
            // Eğer oyuncu henüz bekleme odasında değilse taşı
            if (player.position !== waitingRoomPosition) {
                player.position = waitingRoomPosition;
                player.pathIndex = boardPath.indexOf(waitingRoomPosition);
                movePlayerToCell(player);
            }
        });
        
        // Kazananı göster (ilk sıradaki)
        if (winners.length > 0) {
            const winner = winners[0];
            // Küçük bir gecikme ile sonuç ekranını göster (kullanıcı deneyimini iyileştirmek için)
            setTimeout(() => {
                showWinnerMessage(winner, winners);
            }, 800);
        }
        
        return true; // Oyun bitti
    }
    
    return false; // Oyun devam ediyor
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info', duration = 3000) {
    // Varsa önceki bildirimi kaldır
    const existingNotification = document.querySelector('.game-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // İkon belirle
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle" style="color: #4CAF50;"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle" style="color: #FFC107;"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle" style="color: #F44336;"></i>';
            break;
        default: // info
            icon = '<i class="fas fa-info-circle" style="color: #2196F3;"></i>';
    }
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.classList.add('game-notification', `notification-${type}`);
    
    // Bildirim içeriği
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
            <div style="margin-right: 12px; font-size: 20px;">${icon}</div>
            <div style="flex: 1;">${message}</div>
            <div class="notification-close" style="cursor: pointer; margin-left: 5px; font-size: 18px;">
                <i class="fas fa-times"></i>
            </div>
        </div>
    `;
    
    // Sayfaya ekle
    document.body.appendChild(notification);
    
    // Kapatma butonuna tıklanınca kaldır
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Otomatik olarak kaldır
    if (duration > 0) {
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
    
    return notification;
}

// Geri dönme fonksiyonu
function goBack() {
    // Ana sayfaya dön
    window.location.href = 'index.html';
}

// Sırayı Bitir butonu fonksiyonu
function endCurrentTurn() {
    console.log("Sırayı Bitir butonuna tıklandı");
    
    if (!gameStarted) {
        console.warn('Oyun henüz başlamadı!');
        showNotification('Oyun henüz başlamadı!', 'warning');
        return;
    }
    
    const activePlayer = players[currentPlayerIndex];
    
    // Eğer zar atıldıysa ve piyon hareket ettiyse
    if (diceRolled) {
        // Zamanlayıcıyı durdur
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        console.log(`${activePlayer.name} turunu tamamladı.`);
        
        // Oyuncuyu eski pozisyonuna geri döndür
        activePlayer.position = activePlayer.previousPosition;
        
        // DOM'da piyonu taşı
        movePlayerToCell(activePlayer);
        
        // Etkinliği tamamla (eğer varsa)
        if (waitingForActivityCompletion) {
            completeActivity();
        }
        
        // diceRolled değişkenini sıfırla
        diceRolled = false;
        
        // Bildirim göster
        showNotification('Sıra geçildi!', 'info');
    } else {
        console.log(`${activePlayer.name} zar atmadan sırasını geçiyor.`);
        showNotification('Sıra geçildi!', 'info');
    }
    
    // Sıradaki oyuncuya geç
    switchToNextPlayer();
}

// Ayarlar modalını göster/gizle
function toggleSettings() {
    console.log('Ayarlar butonu tıklandı');
    
    // Modal elementini bul
    const settingsModal = document.querySelector('.settings-modal');
    
    if (!settingsModal) {
        console.error('Ayarlar modalı bulunamadı!');
        return;
    }
    
    // Modalı aç
    settingsModal.style.display = 'flex';
    
    // Modal içeriklerini işlevsel hale getir
    const closeBtn = settingsModal.querySelector('.close-btn');
    const modalBackground = settingsModal.querySelector('.modal-background');
    const resumeBtn = settingsModal.querySelector('#resume-game');
    
    // Kapatma butonlarına tıklandığında modalı kapat
    if (closeBtn) {
        closeBtn.onclick = closeSettingsModal;
    }
    
    if (modalBackground) {
        modalBackground.onclick = closeSettingsModal;
    }
    
    if (resumeBtn) {
        resumeBtn.onclick = closeSettingsModal;
    }
    
    // Oyuncu sayısı butonları - oyun başlamışsa yeniden başlatma ile değiştir
    const playerButtons = settingsModal.querySelectorAll('[data-players]');
    if (playerButtons.length > 0) {
        playerButtons.forEach(btn => {
            // Önceki olayları temizle
            btn.onclick = null;
            
            // Aktif oyuncu sayısını işaretle
            if (parseInt(btn.dataset.players) === players.length) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            // Tıklama olayını ekle
            btn.onclick = function() {
                const newPlayerCount = parseInt(this.dataset.players);
                // Tüm butonlardan active sınıfını kaldır
                playerButtons.forEach(b => b.classList.remove('active'));
                // Tıklanan butona active sınıfı ekle
                this.classList.add('active');
                
                // Eğer oyuncu sayısı aynıysa bir şey yapma
                if (newPlayerCount === players.length) {
                    return;
                }
                
                // Oyun başlamışsa yeniden başlatma onayı iste
                if (gameStarted) {
                    if (confirm(`Oyuncu sayısını ${newPlayerCount} olarak değiştirmek için oyun yeniden başlatılacak. Onaylıyor musunuz?`)) {
                        console.log(`Oyuncu sayısı ${newPlayerCount} olarak değiştirildi. Oyun yeniden başlatılıyor...`);
                        // Ayarı kaydet
                        localStorage.setItem('playerCount', newPlayerCount);
                        // Modalı kapat
                        closeSettingsModal();
                        // Oyun alanını temizle
                        document.getElementById('players-list').innerHTML = '';
                        // Oyunu yeniden başlat
                        initializeGame(newPlayerCount, localStorage.getItem('difficulty') || 'medium');
                        // Bildirim göster
                        showNotification(`Oyuncu sayısı ${newPlayerCount} olarak değiştirildi ve oyun yeniden başlatıldı.`, 'success');
                    } else {
                        // İptal edilirse önceki duruma dön
                        playerButtons.forEach(b => {
                            if (parseInt(b.dataset.players) === players.length) {
                                b.classList.add('active');
                            } else {
                                b.classList.remove('active');
                            }
                        });
                    }
                } else {
                    // Oyun başlamamışsa doğrudan değiştir
                    console.log(`Oyuncu sayısı ${newPlayerCount} olarak ayarlandı`);
                    // Ayarı kaydet
                    localStorage.setItem('playerCount', newPlayerCount);
                }
            };
        });
    }
    
    // Zorluk seviyesi butonları
    const difficultyButtons = settingsModal.querySelectorAll('[data-difficulty]');
    if (difficultyButtons.length > 0) {
        difficultyButtons.forEach(btn => {
            // Önceki olayları temizle
            btn.onclick = null;
            
            // Aktif zorluk seviyesini işaretle
            const currentDifficulty = localStorage.getItem('difficulty') || 'medium';
            if (btn.dataset.difficulty === currentDifficulty) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            // Tıklama olayını ekle
            btn.onclick = function() {
                const difficulty = this.dataset.difficulty;
                // Tüm butonlardan active sınıfını kaldır
                difficultyButtons.forEach(b => b.classList.remove('active'));
                // Tıklanan butona active sınıfı ekle
                this.classList.add('active');
                
                // Zorluk seviyesine göre süreyi güncelle
                gameDuration = difficultyTimes[difficulty] || 120;
                
                console.log(`Zorluk seviyesi ${difficulty} olarak ayarlandı, Süre: ${gameDuration} saniye`);
                // Ayarı kaydet
                localStorage.setItem('difficulty', difficulty);
                localStorage.setItem('gameDuration', gameDuration);
                
                // Zamanlayıcıyı da yenilersek daha iyi olabilir
                if (waitingForActivityCompletion && timerInterval) {
                    // Etkinlik devam ediyorsa yeni süreye göre zamanlayıcıyı güncelle
                    clearInterval(timerInterval);
                    startTimer(gameDuration);
                    console.log('Zamanlayıcı yeni zorluk seviyesine göre güncellendi');
                    
                    // Bildiri göster
                    showNotification(`Zorluk seviyesi ${getCategoryTitle(difficulty)} olarak değiştirildi.`, 'info');
                }
            };
        });
    }
    
    // Oyundan çık butonu
    const quitGameBtn = settingsModal.querySelector('#quit-game');
    if (quitGameBtn) {
        quitGameBtn.onclick = function() {
            if (confirm('Oyundan çıkmak istediğinize emin misiniz?')) {
                // Ana sayfaya yönlendir
                window.location.href = 'index.html';
            }
        };
    }
    
    // Modalı active sınıfı ile göster (animasyon için)
    setTimeout(() => {
        settingsModal.classList.add('active');
    }, 10);
}

// Ayarlar modalını kapat
function closeSettingsModal() {
    const settingsModal = document.querySelector('.settings-modal');
    if (settingsModal) {
        // Önce aktif sınıfını kaldır (animasyon için)
        settingsModal.classList.remove('active');
        
        // Animasyon tamamlandıktan sonra gizle
        setTimeout(() => {
            settingsModal.style.display = 'none';
        }, 300); // CSS transition ile eşleşmeli
    }
}

// Oyun tahtasını analiz et ve ilerleme yolunu göster
function analyzeBoardLayout() {
    console.log('Oyun tahtası analiz ediliyor...');
    
    // Tüm hücreleri pozisyon değerlerine göre topla
    const cells = document.querySelectorAll('.board-cell');
    const positionMap = {};
    
    cells.forEach(cell => {
        const position = parseInt(cell.getAttribute('data-position'));
        if (!isNaN(position)) {
            positionMap[position] = cell.textContent.trim();
        }
    });
    
    // İlerleme yolundaki hücreleri ve içeriklerini göster
    console.log('İlerleme yolu:');
    boardPath.forEach((position, index) => {
        console.log(`Adım ${index}: Pozisyon ${position} - "${positionMap[position] || 'Bilinmeyen'}" ${position === 18 ? '(BİTİŞ)' : ''}`);
    });
    
    return positionMap;
}

// Zorluk seviyesi butonlarına tıklanma olayı ekleyelim (eğer DOM içinde tanımlı değilse)
function setupDifficultyButtons() {
    const difficultyButtons = document.querySelectorAll('[data-difficulty]');
    
    if (difficultyButtons.length > 0) {
        // Active sınıfını ilk butona ekle (eğer active sınıfı yoksa)
        let hasActive = false;
        difficultyButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                hasActive = true;
            }
        });
        
        if (!hasActive && difficultyButtons[0]) {
            difficultyButtons[0].classList.add('active');
        }
        
        // Tüm butonlara tıklama olayı ekle
        difficultyButtons.forEach(btn => {
            if (!btn.onclick) {
                btn.addEventListener('click', function() {
                    // Tüm butonlardan active sınıfını kaldır
                    difficultyButtons.forEach(b => b.classList.remove('active'));
                    // Tıklanan butona active sınıfı ekle
                    this.classList.add('active');
                    
                    // Zorluk seviyesine göre süreyi güncelle (anında etki)
                    const difficulty = this.dataset.difficulty;
                    gameDuration = difficultyTimes[difficulty] || 120;
                    
                    console.log(`[setupDifficultyButtons] Zorluk seviyesi değiştirildi: ${difficulty}, Yeni süre: ${gameDuration} saniye`);
                    
                    // Zamanlayıcıyı da yenilersek daha iyi olabilir
                    if (waitingForActivityCompletion && timerInterval) {
                        // Etkinlik devam ediyorsa yeni süreye göre zamanlayıcıyı güncelle
                        clearInterval(timerInterval);
                        startTimer(gameDuration);
                        console.log('Zamanlayıcı yeni zorluk seviyesine göre güncellendi');
                    }
                });
            }
        });
    }
}

// Sayfa yüklendikten sonra zorluk butonlarını ayarla
setTimeout(setupDifficultyButtons, 500);

// Zar görselini oluştur
function createDiceVisual() {
    // Tüm olası zar elementlerini kontrol et
    const diceElements = document.querySelectorAll('#dice, .dice');
    
    if (diceElements.length === 0) {
        console.error('Zar elementi bulunamadı!');
        return;
    }
    
    // Tüm zar elementlerini hazırla
    diceElements.forEach(diceElement => {
        // Zar içinde noktaları oluştur
        diceElement.innerHTML = '';
        
        for (let i = 1; i <= 7; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot', `dot-${i}`);
            diceElement.appendChild(dot);
        }
    });
    
    // Varsayılan olarak 1 değerini göster
    updateDiceVisual(1);
    
    console.log('Zar görselleri oluşturuldu');
}

/**
 * Kullanılmış kartları sıfırlar, oyun başlangıcında çağrılır
 */
function sifirlaKullanilmisKartlar() {
    console.log('Kullanılmış kartlar sıfırlanıyor...');
    
    // Her kategori için kullanılmış kartları sıfırla
    _kullanilmisYakistirKartlari = [];
    _kullanilmisTerstenKonusKartlari = [];
    _kullanilmisBiriniBetimlemeKartlari = [];
    _kullanilmisDusunceAtolyesiKartlari = [];
    _kullanilmisHikayeAtolyesiKartlari = [];
    _kullanilmisBirAnimKartlari = [];
    _kullanilmisHayalAtolyesiKartlari = [];
    _kullanilmisKelimeKopruleriKartlari = [];
    
    console.log('Tüm kategoriler için kullanılmış kartlar sıfırlandı.');
}

// Rastgele kart seç
function rastgeleKartSec(category) {
    try {
        let kartlar, kullanilmisKartlar;
        
        // Kategori adına göre uygun kartları ve kullanılmış kart listesini belirle
        switch (category) {
            case 'yakistir':
                kartlar = YAKISTIR_KARTLARI;
                kullanilmisKartlar = _kullanilmisYakistirKartlari;
                break;
            case 'tersten-konus':
                kartlar = TERSTEN_KONUS_KARTLARI;
                kullanilmisKartlar = _kullanilmisTerstenKonusKartlari;
                break;
            case 'birini-betimleme':
                kartlar = BIRINI_BETIMLEME_KARTLARI;
                kullanilmisKartlar = _kullanilmisBiriniBetimlemeKartlari;
                break;
            case 'dusunce-atolyesi':
                kartlar = DUSUNCE_ATOLYESI_KARTLARI;
                kullanilmisKartlar = _kullanilmisDusunceAtolyesiKartlari;
                break;
            case 'hikaye-atolyesi':
                kartlar = HIKAYE_ATOLYESI_KARTLARI;
                kullanilmisKartlar = _kullanilmisHikayeAtolyesiKartlari;
                break;
            case 'bir-anim':
                kartlar = BIR_ANIM_KARTLARI;
                kullanilmisKartlar = _kullanilmisBirAnimKartlari;
                break;
            case 'hayal-atolyesi':
                kartlar = HAYAL_ATOLYESI_KARTLARI;
                kullanilmisKartlar = _kullanilmisHayalAtolyesiKartlari;
                break;
            case 'kelime-kopruleri':
                kartlar = KELIME_KOPRULERI_KARTLARI;
                kullanilmisKartlar = _kullanilmisKelimeKopruleriKartlari;
                break;
            default:
                console.error(`Bilinmeyen kategori: ${category}`);
                return null;
        }
        
        // Eğer daha önce kullanılmamış kartlar varsa
        const kullanilmamisKartlar = kartlar.filter(kart => !kullanilmisKartlar.includes(kart.id));
        
        // Eğer tüm kartlar kullanıldıysa, kullanılmış kartları sıfırla
        if (kullanilmamisKartlar.length === 0) {
            console.log(`${category} kategorisinde tüm kartlar kullanıldı, liste sıfırlanıyor.`);
            
            // Bu kategori için kullanılmış kartları sıfırla
            switch (category) {
                case 'yakistir':
                    _kullanilmisYakistirKartlari = [];
                    break;
                case 'tersten-konus':
                    _kullanilmisTerstenKonusKartlari = [];
                    break;
                case 'birini-betimleme':
                    _kullanilmisBiriniBetimlemeKartlari = [];
                    break;
                case 'dusunce-atolyesi':
                    _kullanilmisDusunceAtolyesiKartlari = [];
                    break;
                case 'hikaye-atolyesi':
                    _kullanilmisHikayeAtolyesiKartlari = [];
                    break;
                case 'bir-anim':
                    _kullanilmisBirAnimKartlari = [];
                    break;
                case 'hayal-atolyesi':
                    _kullanilmisHayalAtolyesiKartlari = [];
                    break;
                case 'kelime-kopruleri':
                    _kullanilmisKelimeKopruleriKartlari = [];
                    break;
            }
            
            // Tekrar tüm kartlardan seçim yap
            return rastgeleKartSec(category);
        }
        
        // Rastgele bir kart seç
        const rastgeleIndeks = Math.floor(Math.random() * kullanilmamisKartlar.length);
        const secilenKart = kullanilmamisKartlar[rastgeleIndeks];
        
        // Seçilen kartı kullanılmış listesine ekle
        switch (category) {
            case 'yakistir':
                _kullanilmisYakistirKartlari.push(secilenKart.id);
                break;
            case 'tersten-konus':
                _kullanilmisTerstenKonusKartlari.push(secilenKart.id);
                break;
            case 'birini-betimleme':
                _kullanilmisBiriniBetimlemeKartlari.push(secilenKart.id);
                break;
            case 'dusunce-atolyesi':
                _kullanilmisDusunceAtolyesiKartlari.push(secilenKart.id);
                break;
            case 'hikaye-atolyesi':
                _kullanilmisHikayeAtolyesiKartlari.push(secilenKart.id);
                break;
            case 'bir-anim':
                _kullanilmisBirAnimKartlari.push(secilenKart.id);
                break;
            case 'hayal-atolyesi':
                _kullanilmisHayalAtolyesiKartlari.push(secilenKart.id);
                break;
            case 'kelime-kopruleri':
                _kullanilmisKelimeKopruleriKartlari.push(secilenKart.id);
                break;
        }
        
        console.log(`${category} kategorisinden kart seçildi: #${secilenKart.id}`);
        return secilenKart;
        
    } catch (error) {
        console.error('Kart seçme hatası:', error);
        return null;
    }
}

// Kategori başlığını getir
function getCategoryTitle(category) {
    const titles = {
        'yakistir': 'Yakıştır',
        'tersten-konus': 'Tersten Konuş',
        'birini-betimleme': 'Birini Betimleme',
        'hikaye-atolyesi': 'Hikaye Atölyesi',
        'dusunce-atolyesi': 'Düşünce Atölyesi',
        'bir-anim': 'Bir Anım',
        'hayal-atolyesi': 'Hayal Atölyesi',
        'kelime-kopruleri': 'Kelime Köprüleri',
        'baslangic': 'Başlangıç',
        'bitis': 'Bitiş',
        'bekleme-odasi': 'Bekleme Odası'
    };
    
    return titles[category] || category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Oyuncunun bulunduğu hücrenin kategorisini alma
function getPlayerCategory(player) {
    const cell = document.querySelector(`.board-cell[data-position="${player.position}"]`);
    if (cell) {
        return cell.getAttribute('data-category');
    }
    return null;
}