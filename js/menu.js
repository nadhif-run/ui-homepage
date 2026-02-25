const API_BASE = "https://semioratorical-unbreakably-dacia.ngrok-free.dev/Thorix/authy/logout";

async function storage() {
    // subpath harus di-encode jika mengandung spasi/karakter khusus loadFiles
    const response = await fetch(`${API_BASE}`, {
      method: "GET",
      credentials: "include", 
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Handle Logout
async function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('access_token');
        await storage()
        window.location.href = './login.html';
    }
}

// Modal Functions
function showAddLinkModal() {
    document.getElementById('addLinkModal').classList.add('active');
}

function closeAddLinkModal() {
    document.getElementById('addLinkModal').classList.remove('active');
    document.getElementById('addLinkForm').reset();
}

// Handle Add Link
function handleAddLink(event) {
    event.preventDefault();
    
    const name = document.getElementById('linkName').value;
    const url = document.getElementById('linkUrl').value;
    const desc = document.getElementById('linkDesc').value;
    
    // Get existing links from localStorage
    let customLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    
    // Add new link
    customLinks.push({
        id: Date.now(),
        name: name,
        url: url,
        description: desc
    });
    
    // Save to localStorage
    localStorage.setItem('customLinks', JSON.stringify(customLinks));
    
    // Reload custom links
    loadCustomLinks();
    
    // Close modal
    closeAddLinkModal();
}

// Load Custom Links
function loadCustomLinks() {
    const customLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    const container = document.getElementById('customLinks');
    
    if (customLinks.length === 0) {
        container.innerHTML = '<p class="empty-state">Belum ada link kustom. Klik "Tambah Link" untuk menambahkan.</p>';
        return;
    }
    
    container.innerHTML = customLinks.map(link => `
        <a href="${link.url}" target="_blank" class="custom-link-card">
            <div class="link-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            </div>
            <div class="custom-link-info">
                <h4>${link.name}</h4>
                <p>${link.description || link.url}</p>
            </div>
            <button class="delete-link" onclick="deleteLink(event, ${link.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </a>
    `).join('');
}

// Delete Link
function deleteLink(event, id) {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm('Hapus link ini?')) {
        let customLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
        customLinks = customLinks.filter(link => link.id !== id);
        localStorage.setItem('customLinks', JSON.stringify(customLinks));
        loadCustomLinks();
    }
}

// Load username from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'User';
    document.getElementById('username').textContent = username;
    
    // Load custom links
    loadCustomLinks();
    
    // Close modal when clicking outside
    document.getElementById('addLinkModal').addEventListener('click', (e) => {
        if (e.target.id === 'addLinkModal') {
            closeAddLinkModal();
        }
    });
});