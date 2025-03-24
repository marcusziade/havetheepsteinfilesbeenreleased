const viewCounter = document.getElementById('viewCounter');

export function incrementViewCount() {
    // Check if already viewed in this session
    if (sessionStorage.getItem('counted')) {
        loadViewCount(); // Just load the count if already viewed
        return;
    }
    
    viewCounter.textContent = 'Registering your visit...';
    fetch('https://api.countapi.xyz/hit/havetheepsteinfilesbeenreleased.xyz/visits')
        .then(response => response.json())
        .then(data => {
            displayCount(data.value);
            sessionStorage.setItem('counted', 'true');
            const visitDate = new Date().toISOString();
            sessionStorage.setItem('visitDate', visitDate);
        })
        .catch(error => {
            console.error('Error updating count:', error);
            viewCounter.textContent = 'Unable to register visit. Many people have visited.';
        });
}

export function loadViewCount() {
    viewCounter.textContent = 'Loading visitor stats...';
    fetch('https://api.countapi.xyz/get/havetheepsteinfilesbeenreleased.xyz/visits')
        .then(response => response.json())
        .then(data => {
            displayCount(data.value);
        })
        .catch(error => {
            console.error('Error fetching count:', error);
            viewCounter.textContent = 'Stats unavailable. Many people have visited.';
        });
}

function displayCount(count) {
    // Format large numbers with commas
    const formattedCount = new Intl.NumberFormat().format(count);
    
    // Show visit date if available
    let visitInfo = `${formattedCount} unique visitors since launch`;
    const visitDate = sessionStorage.getItem('visitDate');
    
    if (visitDate) {
        const date = new Date(visitDate);
        const formattedDate = date.toLocaleString();
        visitInfo += ` | Your visit: ${formattedDate}`;
    }
    
    viewCounter.textContent = visitInfo;
}