// This file is no longer used - system dark mode is now handled via CSS in styles.css.
// This file is kept only for reference.

function checkSystemDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Add listener for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}