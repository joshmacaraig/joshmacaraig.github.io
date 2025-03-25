// Constants
const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:LjBiqEqa';
const API_ENDPOINTS = {
    getAllEvents: `${API_BASE_URL}/invitation_master_page`,
    getEventDetails: `${API_BASE_URL}/invitation/get_details`
};

// Router initialization
function initRouter() {
    const path = window.location.pathname;
    const currentPage = path.split('/').pop();

    // If on details.html, handle event details
    if (currentPage === 'details.html') {
        handleEventDetails();
    } else {
        // Otherwise show listing page
        renderListingPage();
    }
}

// Handle event details page
async function handleEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event');
    
    if (!eventName) {
        showError('No event specified');
        return;
    }

    try {
        // Changed to GET method and adding event_name as query parameter
        const response = await fetch(`${API_ENDPOINTS.getEventDetails}?event_name=${eventName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch event details');
        
        const data = await response.json();
        renderEventDetails(data);
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load event details');
    }
}

// Format event name for display
function formatEventName(eventName) {
    return eventName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' & ');
}

// Render the main listing page
async function renderListingPage() {
    const app = document.getElementById('app');
    
    try {
        // Show loading state
        app.innerHTML = '<div class="loading">Loading events...</div>';
        
        // Fetch events from API
        const response = await fetch(API_ENDPOINTS.getAllEvents);
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const events = await response.json();
        
        // Render events grid
        app.innerHTML = `
            <header class="header">
                <nav class="nav">
                    <a href="/" class="nav-link">Home</a>
                </nav>
            </header>
            <main class="main">
                <h1 class="title">Wedding E-Invites Gallery</h1>
                <div class="events-grid">
                    ${events.map(event => `
                        <a href="details.html?event=${event.event_name}" class="event-card">
                            <h3 class="event-title">${formatEventName(event.event_name)}</h3>
                            <p class="event-date">Created: ${new Date(event.created_at).toLocaleDateString()}</p>
                        </a>
                    `).join('')}
                </div>
            </main>
        `;
    } catch (error) {
        console.error('Error fetching events:', error);
        showError('Failed to load events');
    }
}

// Render event details page
function renderEventDetails(data) {
    const app = document.getElementById('app');
    const eventName = new URLSearchParams(window.location.search).get('event');
    
    app.innerHTML = `
        <header class="header">
            <nav class="nav">
                <a href="index.html" class="nav-link">← Back to Gallery</a>
            </nav>
        </header>
        <main class="main">
            <div class="event-details">
                <h1 class="title">${formatEventName(eventName)}</h1>
                <div class="event-content">
                    ${renderSections(data)}
                </div>
            </div>
        </main>
    `;
}

// Render event sections
function renderSections(data) {
    // If page_details exists in the response
    if (data.page_details && data.page_details.page_details) {
        return data.page_details.page_details
            .filter(section => section.is_visible)
            .sort((a, b) => a.order - b.order)
            .map(section => `
                <section class="section ${section.section}">
                    ${section.embed_code}
                </section>
            `).join('');
    }
    
    // Fallback if structure is different
    return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Show error message
function showError(message) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="header">
            <nav class="nav">
                <a href="index.html" class="nav-link">← Back to Gallery</a>
            </nav>
        </header>
        <main class="main">
            <div class="error-container">
                <h1 class="title">Error</h1>
                <p class="error-message">${message}</p>
            </div>
        </main>
    `;
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', initRouter);