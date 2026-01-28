// Atur tanggal pernikahan (Ganti dengan tanggal dan waktu yang sebenarnya)
const weddingDate = new Date("Dec 12, 2026 19:00:00").getTime(); 

// FUNGSI UTAMA: MENGONTROL SPLASH SCREEN, COUNTDOWN, DAN COPY REKENING
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-invitation-btn');
    const countdownElement = document.getElementById('countdown-timer');
    const copyBtn = document.querySelector('.copy-btn');

    // 1. INISIALISASI
    splashScreen.classList.remove('hidden');
    mainContent.classList.add('hidden'); 
    mainContent.classList.remove('active');

    // 2. LOGIKA BUKA UNDANGAN
    openBtn.addEventListener('click', function() {
        splashScreen.classList.add('hidden');
        mainContent.classList.remove('hidden'); 
        
        // Transisi halus
        setTimeout(() => {
            mainContent.classList.add('active');
        }, 50); 
    });

    // 3. LOGIKA COUNTDOWN
    const updateCountdown = function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "Kami Sudah Menikah!";
            return;
        }

        countdownElement.innerHTML = `
            <div class="countdown-box"><p class="countdown-value">${days}</p><p class="countdown-label">Hari</p></div>
            <div class="countdown-box"><p class="countdown-value">${hours}</p><p class="countdown-label">Jam</p></div>
            <div class="countdown-box"><p class="countdown-value">${minutes}</p><p class="countdown-label">Menit</p></div>
            <div class="countdown-box"><p class="countdown-value">${seconds}</p><p class="countdown-label">Detik</p></div>
        `;
    };

    updateCountdown(); 
    const x = setInterval(updateCountdown, 1000);

    // 4. LOGIKA COPY REKENING
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const rekeningNumber = this.getAttribute('data-rekening');
            
            navigator.clipboard.writeText(rekeningNumber)
                .then(() => {
                    alert(`Nomor rekening ${rekeningNumber} berhasil disalin!`);
                })
                .catch(err => {
                    console.error('Gagal menyalin: ', err);
                });
        });
    }

    // 5. LOGIKA FORM SUBMISSION (Dummy)
    const commentsForm = document.querySelector('.comments-form');
    if (commentsForm) {
        commentsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Fitur Kirim Ucapan membutuhkan backend. Data dummy dikirim.');
            this.reset();
        });
    }
});