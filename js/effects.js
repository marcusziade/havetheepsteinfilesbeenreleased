const noText = document.getElementById('noText');
const clickSound = document.getElementById('clickSound');

export function initEffects() {
    // Initialize mousemove handler
    document.addEventListener('mousemove', handleMouseMove);
    
    // Initialize click handler
    noText.addEventListener('click', handleNoTextClick);
    
    // Initialize Konami code
    initKonamiCode();
}

function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rect = noText.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Only move when mouse is close
    if (distance < 200) {
        const moveX = (distanceX / distance) * -10;
        const moveY = (distanceY / distance) * -10;
        
        noText.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
        noText.style.transform = 'translate(0, 0)';
    }
}

function handleNoTextClick() {
    // Play sound effect
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Audio playback error:', e));
    
    // Explode text
    noText.classList.add('explode');
    
    // Create confetti
    createConfetti();
    
    // Show random no text
    setTimeout(() => {
        noText.classList.remove('explode');
        showRandomResponse();
    }, 800);
}

export function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];
    const totalConfetti = 100;
    
    for (let i = 0; i < totalConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Animate
        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${Math.random() * 400 - 200}px, ${Math.random() * 500 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

function showRandomResponse() {
    const responses = ['No.', 'Nope.', 'Nah.', 'Never.', 'Not at all.', 'No way.', 'Absolutely not.'];
    
    // 10% chance to change text
    if (Math.random() < 0.1) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        noText.textContent = randomResponse;
    } else {
        noText.textContent = 'No.';
    }
}

function initKonamiCode() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;
    
    document.addEventListener('keydown', (e) => {
        // Check if the key matches the next key in the sequence
        if (e.key === konamiCode[konamiPosition]) {
            konamiPosition++;
            
            // If the entire sequence is matched
            if (konamiPosition === konamiCode.length) {
                activateEasterEgg();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
}

function activateEasterEgg() {
    // Create a massive explosion of "No." confetti
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 100);
    }
    
    // Make the No text rainbow colored
    noText.classList.add('rainbow-text');
    
    // Reset after 5 seconds
    setTimeout(() => {
        noText.classList.remove('rainbow-text');
    }, 5000);
}