const viewCounter = document.getElementById('viewCounter');
const STORAGE_KEY = 'epstein_file_counter_data';

export function incrementViewCount() {
    // Try to immediately show cached count if available
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (cachedData) {
        const data = JSON.parse(cachedData);
        displayCount(data.count);
    } else {
        viewCounter.textContent = 'Loading visitor count...';
    }
    
    // Check if already viewed in this session
    const shouldIncrement = !sessionStorage.getItem('counted');
    
    // Use the appropriate endpoint based on whether to increment
    const endpoint = shouldIncrement 
        ? 'https://api.countapi.xyz/hit/havetheepsteinfilesbeenreleased.xyz/visits'
        : 'https://api.countapi.xyz/get/havetheepsteinfilesbeenreleased.xyz/visits';
    
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            // Save to localStorage for future page loads
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                count: data.value,
                lastUpdated: new Date().toISOString()
            }));
            
            displayCount(data.value);
            
            if (shouldIncrement) {
                sessionStorage.setItem('counted', 'true');
                const visitDate = new Date().toISOString();
                sessionStorage.setItem('visitDate', visitDate);
            }
        })
        .catch(error => {
            console.error('Error with visit counter:', error);
            if (!cachedData) {
                viewCounter.textContent = 'Visit count unavailable';
            }
        });
}

export function loadViewCount() {
    // This is now handled by incrementViewCount
    incrementViewCount();
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