const birthdaySong = document.getElementById('birthdaySong');
const photoDisplay = document.getElementById('photoDisplay');
const birthdayPhoto = document.getElementById('birthdayPhoto');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Birthday website loaded!');
    console.log('🎵 Audio element:', birthdaySong);
    console.log('📁 Audio source:', birthdaySong.src || birthdaySong.querySelector('source').src);
    
    playBirthdaySong();
    initializePhotoInteractions();
    initializeBalloonEffects();
    createConfetti();
    createFloatingHearts();
});

function playBirthdaySong() {
    birthdaySong.volume = 0.5;
    
    // Try to play immediately
    const playMusic = () => {
        birthdaySong.play().then(() => {
            console.log('🎵 Music started successfully!');
        }).catch((error) => {
            console.log('❌ Autoplay blocked:', error);
            // Try again on first user interaction
            document.addEventListener('click', () => {
                birthdaySong.play().then(() => {
                    console.log('🎵 Music started after click!');
                });
            }, { once: true });
        });
    };
    
    // Try multiple times
    playMusic();
    setTimeout(playMusic, 1000);
    setTimeout(playMusic, 3000);
}


// Gift Opening Functions
function openGift(giftNumber) {
    const gift = document.querySelector(`.gift${giftNumber}`);
    const giftBox = gift.querySelector('.gift-box');
    
    // Add opening animation
    gift.classList.add('gift-opened');
    
    // Show surprise message
    setTimeout(() => {
        showSurpriseMessage(giftNumber);
    }, 400);
    
    // Create confetti explosion
    createGiftConfetti(gift);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        gift.classList.remove('gift-opened');
    }, 800);
}

function showSurpriseMessage(giftNumber) {
    const messages = [
        "Semoga tidak makin ceroboh",
        "Semoga omongan nya lebih hati hati",
        "Jangan lupa sholat nya ya brok"
    ];
    
    const message = messages[giftNumber - 1] || messages[0];
    
    // Create floating message
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: messageFloat 3s ease-in-out forwards;
    `;
    
    document.body.appendChild(messageElement);
    
    // Remove message after animation
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Cake Lighting Function
function lightCandles() {
    const candles = document.querySelectorAll('.candle');
    const cake = document.querySelector('.cake');
    
    // Light each candle with delay
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add('lit');
        }, index * 200);
    });
    
    // Add cake glow effect
    setTimeout(() => {
        cake.classList.add('cake-lit');
        
        // Show birthday wish
        setTimeout(() => {
            showBirthdayWish();
        }, 1000);
    }, 600);
    
    // Create more confetti
    createCakeConfetti();
}

function showBirthdayWish() {
    const wishElement = document.createElement('div');
    wishElement.innerHTML = `
        <div style="text-align: center; color: #fff; font-size: 1.5rem; font-weight: 600;">
            Kenapa dinamakan nasi goreng?<br>
            <div style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">
                 Karena lapar, xixixixixixixi
            </div>
        </div>
    `;
    wishElement.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 30px;
        border-radius: 20px;
        z-index: 1000;
        animation: messageFloat 4s ease-in-out forwards;
    `;
    
    document.body.appendChild(wishElement);
    
    setTimeout(() => {
        wishElement.remove();
    }, 4000);
}

// Wish Card Animation
function animateWish(card) {
    card.classList.add('animated');
    
    // Create sparkle effect
    createSparkles(card);
    
    setTimeout(() => {
        card.classList.remove('animated');
    }, 600);
}

// Photo Interaction Functions
function initializePhotoInteractions() {
    photoDisplay.addEventListener('click', handlePhotoClick);
    
    // Add entrance animation when photo loads
    birthdayPhoto.addEventListener('load', () => {
        birthdayPhoto.style.animation = 'photoEntrance 1s ease-in-out';
        createHeartParticles();
    });
}

function handlePhotoClick() {
    // Create heart particles around the photo
    createHeartParticles();
    
    // Show special message
    showPhotoMessage();
    
    // Add photo glow effect
    photoDisplay.style.animation = 'photoGlow 2s ease-in-out';
    
    setTimeout(() => {
        photoDisplay.style.animation = '';
    }, 2000);
}

function showPhotoMessage() {
    const messages = [
        "💖 Beautiful memory! 💖",
        "🌟 Perfect for this special day! 🌟",
        "💕 Such a lovely photo! 💕",
        "✨ This photo brings so much joy! ✨"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageElement = document.createElement('div');
    messageElement.innerHTML = randomMessage;
    messageElement.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: messageFloat 3s ease-in-out forwards;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Balloon Effects
function initializeBalloonEffects() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            popBalloon(balloon);
        });
    });
}

function popBalloon(balloon) {
    // Create pop effect
    balloon.style.animation = 'none';
    balloon.style.transform = 'scale(0)';
    balloon.style.transition = 'transform 0.3s ease';
    
    // Create confetti at balloon position
    createBalloonConfetti(balloon);
    
    // Remove balloon after animation
    setTimeout(() => {
        balloon.remove();
    }, 300);
}

// Confetti Functions
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer, colors);
        }, i * 50);
    }
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function createGiftConfetti(gift) {
    const rect = gift.getBoundingClientRect();
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (rect.left + rect.width / 2) + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)];
        confetti.style.animation = 'giftConfetti 2s ease-out forwards';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2500);
    }
}

function createCakeConfetti() {
    const cake = document.querySelector('.cake');
    const rect = cake.getBoundingClientRect();
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (rect.left + rect.width / 2) + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.backgroundColor = '#ffd700';
        confetti.style.animation = 'cakeConfetti 3s ease-out forwards';
        confetti.style.animationDelay = Math.random() * 0.8 + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

function createBalloonConfetti(balloon) {
    const rect = balloon.getBoundingClientRect();
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (rect.left + rect.width / 2) + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 3)];
        confetti.style.animation = 'balloonConfetti 1.5s ease-out forwards';
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Heart Particles for Photo
function createHeartParticles() {
    const photoFrame = document.querySelector('.photo-frame');
    const rect = photoFrame.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Sparkle Effects
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleFloat 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 50);
    }
}

// Floating Hearts
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: 100vh;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1;
                animation: heartRise 8s linear forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }
    }, 2000);
}

// CSS Animations (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes messageFloat {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes giftConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes cakeConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-300px) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes balloonConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-150px) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
        }
        100% {
            transform: translateY(-60px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes heartRise {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes photoEntrance {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes photoGlow {
        0% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
        }
        50% {
            box-shadow: 0 0 40px rgba(255, 105, 180, 0.8);
        }
        100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
        }
    }
`;
document.head.appendChild(style);
