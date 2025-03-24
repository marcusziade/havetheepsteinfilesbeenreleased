import { incrementViewCount } from './viewCounter.js';
import { initDarkMode } from './darkMode.js';
import { initEffects } from './effects.js';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize view counter
    incrementViewCount();
    
    // Initialize dark mode
    initDarkMode();
    
    // Initialize effects
    initEffects();
});