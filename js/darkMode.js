const modeToggle = document.getElementById('modeToggle');

export function initDarkMode() {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    } else if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.remove('dark-mode');
    } else {
        // Use system preference if no user preference
        checkSystemDarkMode();
    }
    
    // Set initial tooltip text
    updateModeToggleTooltip();
    
    // Add click listener
    modeToggle.addEventListener('click', toggleDarkMode);
}

export function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    // Update toggle tooltip
    updateModeToggleTooltip();
}

function updateModeToggleTooltip() {
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.title = "Switch to light mode";
    } else {
        modeToggle.title = "Switch to dark mode";
    }
}

function checkSystemDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If user has no saved preference, use system preference
    if (localStorage.getItem('darkMode') === null) {
        if (prefersDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Add listener for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only update if user hasn't set a preference
        if (localStorage.getItem('darkMode') === null) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}